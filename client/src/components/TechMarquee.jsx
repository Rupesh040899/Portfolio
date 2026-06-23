import { useContent } from '../context/ContentContext.jsx';

/**
 * A continuously scrolling strip of the tech the user works with.
 * Duplicates the list so the loop is seamless.
 */
export default function TechMarquee() {
  const { content } = useContent();
  const names = (content.skills || []).map((s) => s.name);
  if (names.length < 4) return null;

  const items = [...names, ...names]; // duplicate for seamless loop

  return (
    <div className="marquee-mask overflow-hidden border-y border-border py-5">
      <div className="marquee gap-10">
        {items.map((name, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-semibold text-muted">
            {name}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
