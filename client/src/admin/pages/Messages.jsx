import { useEffect, useState } from 'react';
import { adminApi } from '../adminApi.js';

const STATUSES = ['unread', 'read', 'replied', 'archived'];

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({ state: 'loading', msg: '' });

  const load = () => {
    setStatus({ state: 'loading', msg: '' });
    adminApi
      .messages()
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setStatus({ state: 'idle', msg: '' });
      })
      .catch((e) => setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to load' }));
  };

  useEffect(load, []);

  const setMsgStatus = async (id, value) => {
    try {
      await adminApi.updateMessage(id, value);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status: value } : m)));
    } catch (e) {
      setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to update' });
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminApi.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (e) {
      setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to delete' });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Messages</h1>
      <p className="mt-1 text-sm text-muted">Contact-form submissions.</p>

      {status.state === 'error' && <p className="mt-4 text-sm text-red-400">{status.msg}</p>}

      {status.state === 'loading' ? (
        <p className="mt-4 text-muted">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="mt-4 text-muted">No messages yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((m) => (
            <div key={m._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {m.name}{' '}
                    <a href={`mailto:${m.email}`} className="text-sm font-normal text-accent">{m.email}</a>
                  </p>
                  {m.subject && <p className="text-sm text-muted">Subject: {m.subject}</p>}
                </div>
                <span className="text-xs text-muted">{new Date(m.createdAt).toLocaleString()}</span>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-text">{m.message}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <select
                  value={m.status}
                  onChange={(e) => setMsgStatus(m._id, e.target.value)}
                  className="rounded-lg border border-border bg-bg px-2 py-1 text-sm outline-none focus:border-accent"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <a href={`mailto:${m.email}`} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent hover:text-accent">Reply</a>
                <button onClick={() => remove(m._id)} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-red-400 hover:text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
