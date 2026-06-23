import { useEffect, useState } from 'react';
import { adminApi } from '../adminApi.js';
import { configs } from '../resourceConfigs.js';
import { FieldForm } from '../form.jsx';
import { SaveButton, StatusText } from './SingletonEditor.jsx';

export default function CollectionManager({ resource }) {
  const config = configs[resource];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // doc being edited/created
  const [status, setStatus] = useState({ state: 'loading', msg: '' });

  const load = () => {
    setStatus({ state: 'loading', msg: '' });
    adminApi
      .list(config.endpoint)
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setStatus({ state: 'idle', msg: '' });
      })
      .catch((e) => setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to load' }));
  };

  useEffect(load, [config.endpoint]);

  const save = async () => {
    setStatus({ state: 'saving', msg: '' });
    try {
      const { _id, ...body } = editing;
      if (_id) await adminApi.update(config.endpoint, _id, body);
      else await adminApi.create(config.endpoint, body);
      setEditing(null);
      load();
      setStatus({ state: 'saved', msg: 'Saved ✓' });
    } catch (e) {
      setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to save' });
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item[config.titleKey] || 'this item'}"?`)) return;
    try {
      await adminApi.remove(config.endpoint, item._id);
      load();
    } catch (e) {
      setStatus({ state: 'error', msg: e.response?.data?.message || 'Failed to delete' });
    }
  };

  // ---- Edit / create form view ----
  if (editing) {
    return (
      <div className="max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">{editing._id ? 'Edit' : 'New'} {config.label}</h1>
          <button onClick={() => setEditing(null)} className="btn-ghost">← Back</button>
        </div>
        <div className="card p-6">
          <FieldForm fields={config.fields} value={editing} onChange={setEditing} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <SaveButton status={status} onClick={save} />
          <StatusText status={status} />
        </div>
      </div>
    );
  }

  // ---- List view ----
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{config.label}</h1>
        <button onClick={() => setEditing({})} className="btn-primary">+ Add new</button>
      </div>

      <StatusText status={status} />

      {status.state === 'loading' ? (
        <p className="mt-4 text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-muted">No items yet. Click “Add new”.</p>
      ) : (
        <div className="mt-2 card divide-y divide-border">
          {items.map((item) => (
            <div key={item._id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium">{item[config.titleKey] || '(untitled)'}</p>
                {config.subKey && item[config.subKey] && (
                  <p className="truncate text-sm text-muted">{item[config.subKey]}</p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(item)} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent hover:text-accent">
                  Edit
                </button>
                <button onClick={() => remove(item)} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-red-400 hover:text-red-400">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
