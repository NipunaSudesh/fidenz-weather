"use client";
export default function Footer() {
  return (
<footer className="mt-10 border-t border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-100 py-6 text-center transition-colors duration-300 dark:border-slate-800 dark:bg-none dark:bg-slate-950/90">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} Nipuna Sudesh. All rights reserved.
      </p>
    </footer>
  );
}
