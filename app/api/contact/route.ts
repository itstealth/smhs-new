import { sql } from '@/app/lib/db';
import { after } from 'next/server';
import { attributionFrom, flushOutbox, pageFrom, queueForCms } from '@/lib/cms-leads';
import { requireAdmin } from '@/app/lib/admin-auth';

// ─── POST: public contact form submission ─────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, school, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Copy for the CMS (lib/cms-leads.ts): never throws, changes nothing here.
    const { site, pageUrl } = pageFrom(request);
    await queueForCms('lead', {
      formType: 'contact',
      formName: 'Contact us page',
      site,
      pageUrl,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      details: school?.trim() ? { school: school.trim() } : {},
      attribution: attributionFrom(request),
    });
    after(() => flushOutbox());

    await sql`
      INSERT INTO contact_messages (name, email, phone, school, message)
      VALUES (${name.trim()}, ${email.trim()}, ${phone.trim()}, ${school?.trim() || null}, ${message.trim()})
    `;

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return Response.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}

// ─── GET: list all contact messages (admin only) ───────────────────────────
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const items = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    return Response.json(items);
  } catch (err) {
    console.error('GET /api/contact error:', err);
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
