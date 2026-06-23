import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../adminApi.js';

const CARDS = [
  { key: 'projects', label: 'Projects', to: '/admin/projects' },
  { key: 'skills', label: 'Skills', to: '/admin/skills' },
  { key: 'experiences', label: 'Experience', to: '/admin/experiences' },
  { key: 'education', label: 'Education', to: '/admin/education' },
  { key: 'certifications', label: 'Certifications', to: '/admin/certifications' },
  { key: 'testimonials', label: 'Testimonials', to: '/admin/testimonials' },
  { key: 'unreadMessages', label: 'Unread messages', to: '/admin/messages' },
  { key: 'totalMessages', label: 'Total messages', to: '/admin/messages' },
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    adminApi
      .dashboard()
      .then((res) => setData(res.data))
      .catch((e) => setErr(e.response?.data?.message || 'Failed to load dashboard'));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your portfolio content.</p>

      {err && <p className="mt-4 text-sm text-red-400">{err}</p>}

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CARDS.map((c) => (
          <Link key={c.key} to={c.to} className="card card-hover p-5">
            <div className="text-3xl font-extrabold text-aurora">
              {data ? data.counts?.[c.key] ?? 0 : '—'}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{c.label}</div>
          </Link>
        ))}
      </div>

      {!!data?.recentMessages?.length && (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-bold">Recent messages</h2>
          <div className="card divide-y divide-border">
            {data.recentMessages.map((m) => (
              <div key={m._id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{m.name} <span className="text-muted">· {m.email}</span></p>
                  <p className="truncate text-sm text-muted">{m.subject || m.message}</p>
                </div>
                {m.status === 'unread' && <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs text-accent">new</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
