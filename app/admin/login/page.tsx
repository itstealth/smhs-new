import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (session?.value === 'authenticated') {
    redirect('/admin/contact');
  }

  return <LoginForm />;
}
