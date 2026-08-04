import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 pt-28">
      <div className="flex flex-col items-center text-center">
        <div className="font-[family-name:var(--font-display)] text-[8rem] font-black leading-none tracking-tighter text-ink-900/10 dark:text-white/10 md:text-[14rem]">
          404
        </div>
        <h1 className="-mt-6 text-3xl font-black tracking-tight md:text-5xl">
          Off course
        </h1>
        <p className="mt-4 max-w-md text-pretty text-ink-500 dark:text-ink-400">
          This page took a wrong turn. Let us get you back on the right path.
        </p>
        <Link
          href="/"
          className="btn-solid mt-8 rounded-full px-8 py-4 text-sm font-semibold"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
