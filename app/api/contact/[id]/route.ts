import { sql } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/admin-auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    await sql`DELETE FROM contact_messages WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/contact/[id] error:', err);
    return Response.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
