// app/api/leads/route.ts
//
// Receives a copy of enquiry forms that otherwise post straight from the
// browser to a Google Sheet, and queues it for the CMS (lib/cms-leads.ts).
// The Google Sheet submission is unchanged and happens independently; this
// route can fail without the visitor ever noticing.
import { after } from 'next/server';
import { attributionFrom, flushOutbox, pageFrom, queueForCms } from '@/lib/cms-leads';

const FORM_TYPES = new Set(['enquiry', 'contact', 'admission-enquiry']);

// A light per-IP brake so this cannot be used to flood the CMS. Real parents
// submit once or twice.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function str(value: unknown, max: number): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined;
}

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ ok: false }, { status: 429 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') return Response.json({ ok: false }, { status: 400 });

  const phone = str(body.phone, 20)?.replace(/[^\d+]/g, '');
  const email = str(body.email, 254);
  const formType = str(body.formType, 40) ?? 'enquiry';
  if ((!phone || phone.replace(/\D/g, '').length < 10) && !email) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const details: Record<string, string> = {};
  if (body.details && typeof body.details === 'object' && !Array.isArray(body.details)) {
    for (const [k, v] of Object.entries(body.details as Record<string, unknown>).slice(0, 20)) {
      const val = str(v, 500);
      if (val) details[k.slice(0, 60)] = val;
    }
  }

  const { site, pageUrl } = pageFrom(request);
  await queueForCms('lead', {
    formType: FORM_TYPES.has(formType) ? formType : 'enquiry',
    formName: str(body.formName, 120),
    site,
    pageUrl,
    name: str(body.name, 120),
    phone,
    email,
    studentName: str(body.studentName, 120),
    className: str(body.className, 80),
    message: str(body.message, 4000),
    details,
    attribution: attributionFrom(request),
  });
  after(() => flushOutbox());

  return Response.json({ ok: true });
}
