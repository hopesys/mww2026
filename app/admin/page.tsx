import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/admin/AdminDashboard';

const ADMIN_COOKIE = 'mwwt_admin';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-wellness-text">Admin not configured (ADMIN_SECRET missing).</p>
      </div>
    );
  }

  if (token !== secret) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
