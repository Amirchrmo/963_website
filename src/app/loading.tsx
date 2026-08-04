export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" aria-label="Loading">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            963
          </span>
          <span
            className="absolute inset-0 animate-spin rounded-full border border-ink-900/15 dark:border-white/15"
            style={{ borderTopColor: 'currentColor' }}
          />
        </div>
        <div className="h-px w-40 overflow-hidden rounded-full bg-ink-900/10 dark:bg-white/10">
          <div className="h-full w-1/2 animate-[shimmer_1.2s_ease-in-out_infinite] bg-ink-900 dark:bg-white" />
        </div>
      </div>
    </div>
  );
}
