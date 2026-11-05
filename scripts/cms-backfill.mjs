// scripts/cms-backfill.mjs
//
// One-off: copies submissions this site already stored in its own database
// into the CMS outbox, so the CMS inbox also holds the history from before the
// integration. Reads only; it never changes or deletes a row here.
//
//   node --env-file=.env scripts/cms-backfill.mjs sps|smhs
//
// Each row gets a fixed id ("backfill-<site>-<table>-<row id>"), so running it
// twice cannot create duplicates in the CMS, and the original submission time
// is kept. Delivery then happens through the normal outbox (lib/cms-leads.ts).
import postgres from 'postgres';
import { mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

const site = process.argv[2];
const HOST = { sps: 'sps.seedlingschools.com', smhs: 'smhs.seedlingschools.com' }[site];
if (!HOST) throw new Error('usage: cms-backfill.mjs sps|smhs');

const outbox = process.env.CMS_OUTBOX_DIR || path.join(process.cwd(), '.cms-outbox');
const pending = path.join(outbox, 'pending');
await mkdir(pending, { recursive: true });

const url = (process.env.DATABASE_URL || '').replace(/^"|"$/g, '');
const sql = postgres(url, { ssl: url.includes('localhost') ? false : 'require', max: 1 });

const s = (v) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
let n = 0;

async function queue(kind, table, row, payload) {
  const externalId = `backfill-${site}-${table}-${row.id}`;
  const envelope = {
    kind,
    tokenEnv: 'CMS_INGEST_TOKEN',
    payload: { ...payload, externalId, submittedAt: new Date(row.created_at).toISOString() },
    queuedAt: new Date().toISOString(),
  };
  // Prefixed "0-" so backfill sorts ahead of live submissions.
  const file = path.join(pending, `0-${Date.parse(row.created_at)}-${kind}-${externalId}.json`);
  await writeFile(`${file}.tmp`, JSON.stringify(envelope), 'utf8');
  await rename(`${file}.tmp`, file);
  n++;
}

async function exists(table) {
  const [{ ok }] = await sql`SELECT to_regclass(${'public.' + table}) IS NOT NULL AS ok`;
  return ok;
}

if (await exists('enquiries')) {
  for (const r of await sql`SELECT * FROM enquiries ORDER BY id`) {
    const p = s(r.source) ?? '';
    await queue('lead', 'enquiries', r, {
      formType: p.startsWith('/admissions') ? 'admission-enquiry' : p.startsWith('/contact') ? 'contact' : 'enquiry',
      formName: p ? (p === '/' ? 'Home page' : `${p.split('/').filter(Boolean)[0]?.replace(/-/g, ' ')} page`) : undefined,
      site: HOST,
      name: s(r.parent_name), phone: s(r.phone), studentName: s(r.candidate_name), className: s(r.class_name),
      message: s(r.message), details: s(r.gender) ? { gender: s(r.gender) } : {},
    });
  }
}
if (await exists('contact_messages')) {
  for (const r of await sql`SELECT * FROM contact_messages ORDER BY id`) {
    await queue('lead', 'contact_messages', r, {
      formType: 'contact', formName: 'Contact us page', site: HOST,
      name: s(r.name), phone: s(r.phone), email: s(r.email), message: s(r.message),
      details: s(r.school) ? { school: s(r.school) } : {},
    });
  }
}
if (await exists('admission_enquiries')) {
  for (const r of await sql`SELECT * FROM admission_enquiries ORDER BY id`) {
    await queue('lead', 'admission_enquiries', r, {
      formType: 'admission-enquiry', formName: 'Admissions page', site: HOST,
      name: s(r.parent_name), phone: s(r.phone), email: s(r.email), studentName: s(r.candidate_name),
      className: s(r.class_name), message: s(r.message), details: s(r.school) ? { school: s(r.school) } : {},
    });
  }
}
if (await exists('career_applications')) {
  for (const r of await sql`SELECT * FROM career_applications ORDER BY id`) {
    if (!s(r.name) || !s(r.mobile)) continue;
    await queue('career', 'career_applications', r, {
      name: s(r.name), qualification: s(r.qualification), email: s(r.email), mobile: s(r.mobile),
      experience: s(r.experience), subject: s(r.subject), board: s(r.board), classes: s(r.classes),
      jobType: s(r.job_type), roleApplied: s(r.role_applied), cvFilename: s(r.cv_filename), cvPath: s(r.cv_path),
      site: HOST,
    });
  }
}

await sql.end();
console.log(`queued ${n} historical submissions from ${site} into ${pending}`);
