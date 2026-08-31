
"use client";

export default function SignIn() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/clear.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <main className="relative z-10 flex w-full max-w-md flex-col rounded-2xl bg-slate-950/85 px-8 py-10 shadow-2xl backdrop-blur-md">
        
        <div className="flex w-full flex-col text-center">
          <h1 className="text-3xl font-bold text-blue-400">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-slate-300">
            Sign in to continue
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">

          <p className="text-center text-sm text-slate-300">
            You will be securely redirected to Auth0 to sign in.
          </p>

          <a
            href="/auth/login?returnTo=/dashboard"
            // href="/auth/login"
            className="w-full rounded-lg bg-blue-800 px-4 py-2.5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Sign In with Auth0
          </a>

          {/* <p className="text-center text-sm text-slate-300">
            Haven&apos;t signed up yet?{" "}
            <a
              href="/auth/login?screen_hint=signup"
              className="font-medium text-blue-300 hover:underline"
            >
              Sign up here
            </a>
          </p>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full rounded-lg border border-slate-600 bg-transparent px-4 py-2.5 font-semibold text-slate-300 transition-colors hover:bg-slate-800"
          >
            Cancel
          </button> */}

        </div>
      </main>
    </div>
  );
}
