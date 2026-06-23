import { useEffect, useState } from 'react';
import { adminApi } from '../adminApi.js';
import { configs } from '../resourceConfigs.js';
import { FieldForm } from '../form.jsx';

export default function SingletonEditor({ resource }) {
  const config = configs[resource];
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState({ state: 'loading', msg: '' });

  useEffect(() => {
    setStatus({ state: 'loading', msg: '' });
    adminApi
      .getSingleton(config.endpoint)
      .then((doc) => {
        setValue(doc || {});
        setStatus({ state: 'idle', msg: '' });
      })
      .catch((e) => setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to load' }));
  }, [config.endpoint]);

  const save = async () => {
    setStatus({ state: 'saving', msg: '' });
    try {
      const saved = await adminApi.saveSingleton(config.endpoint, value);
      setValue(saved);
      setStatus({ state: 'saved', msg: 'Saved ✓' });
    } catch (e) {
      setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to save' });
    }
  };

  if (status.state === 'loading' || !value) {
    return <p className="text-muted">Loading…</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{config.label}</h1>
        <SaveButton status={status} onClick={save} />
      </div>

      <div className="card p-6">
        <FieldForm fields={config.fields} value={value} onChange={setValue} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <SaveButton status={status} onClick={save} />
        <StatusText status={status} />
      </div>
    </div>
  );
}

export function SaveButton({ status, onClick, label = 'Save changes' }) {
  return (
    <button onClick={onClick} disabled={status.state === 'saving'} className="btn-primary disabled:opacity-60">
      {status.state === 'saving' ? 'Saving…' : label}
    </button>
  );
}

export function StatusText({ status }) {
  if (!status.msg) return null;
  return <span className={`text-sm ${status.state === 'error' ? 'text-red-400' : 'text-accent'}`}>{status.msg}</span>;
}
