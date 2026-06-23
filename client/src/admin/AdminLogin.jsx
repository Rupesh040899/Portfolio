import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

export default function AdminLogin() {
  const { login, isAuthed } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  useEffect(() => {
    if (isAuthed) navigate('/admin', { replace: true });
  }, [isAuthed, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      await login(form.email, form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setStatus({ state: 'error', msg: err.response?.data?.message || 'Login failed' });
    }
  };

  const input =
    'w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent';

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <h1 className="text-2xl font-extrabold">
          <span className="text-aurora">Admin</span> Login
        </h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage your portfolio.</p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={input}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className={input}
          />
        </div>

        <button disabled={status.state === 'loading'} className="btn-primary mt-5 w-full disabled:opacity-60">
          {status.state === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>

        {status.msg && <p className="mt-3 text-sm text-red-400">{status.msg}</p>}

        <a href="/" className="mt-5 block text-center text-xs text-muted hover:text-accent">← Back to site</a>
      </form>
    </div>
  );
}
