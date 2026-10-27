import { sql } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

// ─── POST: public career application submission ───────────────────────────
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get('name') as string)?.trim();
    const qualification = (formData.get('qualification') as string)?.trim() || null;
    const email = (formData.get('email') as string)?.trim() || null;
    const mobile = (formData.get('mobile') as string)?.trim();
    const experience = (formData.get('experience') as string)?.trim() || null;
    const subject = (formData.get('subject') as string)?.trim() || null;
    const board = (formData.get('board') as string)?.trim() || null;
    const jobType = (formData.get('jobType') as string)?.trim() || null;
    const classes = (formData.get('classes') as string)?.trim() || null;
    const roleApplied = (formData.get('role') as string)?.trim() || null;
    const cvFile = formData.get('cv') as File | null;

    if (!name) return Response.json({ error: 'Name is required' }, { status: 400 });
    if (!mobile) return Response.json({ error: 'Mobile number is required' }, { status: 400 });

    // The form advertises "PDF, DOC, DOCX" and "Max 5MB" but nothing enforced
    // either, on the client or here -- so a crafted multipart request could drop
    // a file of any type and any size into the public web root. Checked here
    // rather than only in the browser because this is the boundary that holds.
    if (cvFile && cvFile.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'CV must be under 5MB' }, { status: 400 });
    }
    if (cvFile && cvFile.size > 0) {
      const ext = cvFile.name.split('.').pop()?.toLowerCase() ?? '';
      if (!['pdf', 'doc', 'docx'].includes(ext)) {
        return Response.json({ error: 'CV must be a PDF, DOC or DOCX file' }, { status: 400 });
      }
    }

    let cvFilename: string | null = null;
    let cvPath: string | null = null;
    if (cvFile && cvFile.size > 0) {
      cvFilename = cvFile.name;
      cvPath = await saveFile(cvFile);
    }

    await sql`
      INSERT INTO career_applications
        (name, qualification, email, mobile, experience, subject, board, classes, job_type, role_applied, cv_filename, cv_path)
      VALUES
        (${name}, ${qualification}, ${email}, ${mobile}, ${experience}, ${subject}, ${board}, ${classes}, ${jobType}, ${roleApplied}, ${cvFilename}, ${cvPath})
    `;

    // Mirror into the CMS so a school can triage applications in one place
    // alongside every other institution. Deliberately best-effort and after
    // the local insert: the row above is this site's own record, and an
    // applicant must never see a failure because the CMS was unreachable.
    if (process.env.CMS_URL && process.env.CMS_INGEST_TOKEN) {
      try {
        await fetch(`${process.env.CMS_URL}/api/ingest/v1/career`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CMS_INGEST_TOKEN}`,
          },
          body: JSON.stringify({
            name, qualification, email, mobile, experience, subject, board,
            classes, jobType, roleApplied, cvFilename, cvPath,
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (err) {
        console.error('CMS career ingest failed (application saved locally):', err);
      }
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('POST /api/career error:', err);
    return Response.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// ─── GET: list all career applications (admin only) ───────────────────────
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const items = await sql`SELECT * FROM career_applications ORDER BY created_at DESC`;
    return Response.json(items);
  } catch (err) {
    console.error('GET /api/career error:', err);
    return Response.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// ─── Helper: save uploaded CV to /public/uploads/career/ ──────────────────
async function saveFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
  const filename = `cv-${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads', 'career');
  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), buffer);
  return `/uploads/career/${filename}`;
}
