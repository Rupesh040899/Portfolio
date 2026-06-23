import { useState } from 'react';

/* ---- nested-path helpers (support "caseStudy.problemStatement") ---- */
export function pathGet(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
export function pathSet(obj, path, value) {
  const keys = path.split('.');
  const next = structuredClone(obj ?? {});
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = cur[keys[i]] ?? {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return next;
}

const inputClass =
  'w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none transition-colors focus:border-accent';

/** Editor for a JSON object/array (keeps its own text buffer + shows parse errors). */
function JsonField({ value, onChange }) {
  const [text, setText] = useState(JSON.stringify(value ?? null, null, 2));
  const [err, setErr] = useState('');
  return (
    <div>
      <textarea
        rows={6}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(e.target.value.trim() === '' ? null : JSON.parse(e.target.value));
            setErr('');
          } catch {
            setErr('Invalid JSON — fix to save');
          }
        }}
        className={`${inputClass} font-mono`}
      />
      {err && <p className="mt-1 text-xs text-red-400">{err}</p>}
    </div>
  );
}

/** Renders one configured field bound to (value, onChange). */
export function FieldRenderer({ field, value, onChange }) {
  const { type = 'text', options = [], placeholder = '' } = field;

  if (type === 'textarea') {
    return (
      <textarea rows={4} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    );
  }
  if (type === 'number') {
    return (
      <input type="number" value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))} className={inputClass} />
    );
  }
  if (type === 'boolean') {
    return (
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--c-accent))]" />
        <span className="text-muted">{value ? 'Yes' : 'No'}</span>
      </label>
    );
  }
  if (type === 'select') {
    return (
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">— select —</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }
  if (type === 'list') {
    // array of strings, one per line
    return (
      <textarea
        rows={4}
        value={Array.isArray(value) ? value.join('\n') : ''}
        placeholder={placeholder || 'One item per line'}
        onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
        className={inputClass}
      />
    );
  }
  if (type === 'json') {
    return <JsonField value={value} onChange={onChange} />;
  }
  // default: text
  return (
    <input type="text" value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
  );
}

/** Renders a full form from a fields config. */
export function FieldForm({ fields, value, onChange }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
          <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
          <FieldRenderer
            field={field}
            value={pathGet(value, field.key)}
            onChange={(v) => onChange(pathSet(value, field.key, v))}
          />
          {field.help && <p className="mt-1 text-xs text-muted">{field.help}</p>}
        </div>
      ))}
    </div>
  );
}
