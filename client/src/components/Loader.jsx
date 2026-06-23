/** Full-screen loader shown while the initial content is fetching. */
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-aurora text-xl font-extrabold tracking-tight">Rupesh Mali</p>
        <p className="font-mono text-xs text-muted">loading…</p>
      </div>
    </div>
  );
}
