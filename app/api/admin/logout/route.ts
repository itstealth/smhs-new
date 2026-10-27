import { clearAdminCookie } from '@/app/lib/admin-auth';
import { redirect } from 'next/navigation';

export async function POST() {
  await clearAdminCookie();
  redirect('/admin/login');
}
