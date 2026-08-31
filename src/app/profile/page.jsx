import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-blue-400">
          My Profile
        </h1>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || "Profile"}
              className="mb-6 h-24 w-24 rounded-full"
            />
          )}

          <div className="space-y-5">

            <div>
              <p className="text-sm text-slate-400">Name</p>
              <p className="text-lg font-semibold">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="text-lg font-semibold">
                {user.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Email Verified</p>
              <p className="text-lg font-semibold">
                {user.email_verified ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">User ID</p>
              <p className="break-all text-sm text-slate-300">
                {user.sub}
              </p>
            </div>

          </div>

          <div className="mt-8 flex gap-3">
            <Link 
              href="/dashboard"
              className="rounded-lg bg-slate-700 px-5 py-2.5 font-semibold hover:bg-slate-600"
            >
              Home
            </Link >

            <Link
              href="/auth/logout"
              className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold hover:bg-red-700"
            >
              Logout
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}