import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/experiences', label: 'Experience' },
  { to: '/admin/education', label: 'Education' },
  { to: '/admin/certifications', label: 'Certifications' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-surface hover:text-text'
    }`;

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Top bar (mobile) */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3 md:hidden">
        <span className="font-extrabold text-aurora">Admin</span>
        <button onClick={() => setOpen((o) => !o)} className="text-xl">{open ? '✕' : '☰'}</button>
      </div>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside
          className={`${open ? 'block' : 'hidden'} w-full border-b border-border p-4 md:sticky md:top-0 md:block md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r`}
        >
          <div className="mb-6 hidden md:block">
            <span className="text-lg font-extrabold text-aurora">RUPESH OS</span>
            <p className="text-xs text-muted">Admin panel</p>
          </div>

          <nav className="space-y-1" onClick={() => setOpen(false)}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 border-t border-border pt-4">
            <p className="truncate px-3 text-xs text-muted">{admin?.email}</p>
            <a href="/" className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-accent">↗ View site</a>
            <button onClick={doLogout} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted hover:text-red-400">
              Log out
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 p-5 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
