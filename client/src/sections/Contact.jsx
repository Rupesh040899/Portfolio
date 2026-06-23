import { useState } from 'react';
import { useContent } from '../context/ContentContext.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { api } from '../lib/api.js';

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { content } = useContent();
  const hero = content.hero;
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', msg: '' });
    try {
      const res = await api.submitContact(form);
      setStatus({ state: 'sent', msg: res.message || 'Thanks — your message was sent.' });
      setForm(initial);
    } catch (err) {
      setStatus({ state: 'error', msg: err.response?.data?.message || 'Something went wrong. Try email instead.' });
    }
  };

  const inputClass =
    'w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent';

  return (
    <section id="contact" className="container-pro py-24">
      <SectionHeading
        label="Contact"
        title="Get in touch"
        sub="I'm open to junior full-stack roles. Send a message or reach me directly."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Name" value={form.name} onChange={update('name')} className={inputClass} />
              <input required type="email" placeholder="Email" value={form.email} onChange={update('email')} className={inputClass} />
            </div>
            <input placeholder="Subject" value={form.subject} onChange={update('subject')} className={inputClass} />
            <textarea required rows={5} placeholder="Message" value={form.message} onChange={update('message')} className={`${inputClass} resize-none`} />
            <button disabled={status.state === 'sending'} className="btn-primary disabled:opacity-60">
              {status.state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status.msg && (
              <p className={`text-sm ${status.state === 'error' ? 'text-red-500' : 'text-accent'}`}>{status.msg}</p>
            )}
          </form>
        </Reveal>

        <Reveal delay={100} className="md:col-span-2">
          <div className="card divide-y divide-border">
            {hero?.email && <Row label="Email" value={hero.email} href={`mailto:${hero.email}`} />}
            {hero?.githubUrl && <Row label="GitHub" value="View profile" href={hero.githubUrl} />}
            {hero?.linkedinUrl && <Row label="LinkedIn" value="View profile" href={hero.linkedinUrl} />}
            {hero?.location && (
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-muted">Location</span>
                <span className="text-sm font-medium">{hero.location}</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent-soft">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-accent">{value} ↗</span>
    </a>
  );
}
