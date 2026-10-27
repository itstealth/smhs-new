import { sql } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/admin-auth';

// ─── POST: public admissions enquiry submission ────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { candidateName, className, parentName, email, phone, school, message } = body as Record<string, string>;

    if (!candidateName?.trim() || !className?.trim() || !parentName?.trim() || !phone?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO admission_enquiries (candidate_name, class_name, parent_name, email, phone, school, message)
      VALUES (${candidateName.trim()}, ${className.trim()}, ${parentName.trim()}, ${email?.trim() || null}, ${phone.trim()}, ${school?.trim() || null}, ${message?.trim() || null})
    `;

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('POST /api/admissions error:', err);
    return Response.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

// ─── GET: list all admission enquiries (admin only) ────────────────────────
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const items = await sql`SELECT * FROM admission_enquiries ORDER BY created_at DESC`;
    return Response.json(items);
  } catch (err) {
    console.error('GET /api/admissions error:', err);
    return Response.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
