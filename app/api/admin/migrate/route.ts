// app/api/admin/migrate/route.ts
// One-time migration endpoint — creates the leads tables
import { sql } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/admin-auth';

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        phone      TEXT NOT NULL,
        school     TEXT,
        message    TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS admission_enquiries (
        id             SERIAL PRIMARY KEY,
        candidate_name TEXT NOT NULL,
        class_name     TEXT NOT NULL,
        parent_name    TEXT NOT NULL,
        email          TEXT,
        phone          TEXT NOT NULL,
        school         TEXT,
        message        TEXT,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS career_applications (
        id             SERIAL PRIMARY KEY,
        name           TEXT NOT NULL,
        qualification  TEXT,
        email          TEXT,
        mobile         TEXT NOT NULL,
        experience     TEXT,
        subject        TEXT,
        board          TEXT,
        classes        TEXT,
        role_applied   TEXT,
        cv_filename    TEXT,
        cv_path        TEXT,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return Response.json({ ok: true, message: 'Tables created successfully' });
  } catch (err) {
    console.error('Migration error:', err);
    return Response.json({ error: 'Migration failed' }, { status: 500 });
  }
}
