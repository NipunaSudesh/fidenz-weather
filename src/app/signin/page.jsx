"use client";
import Image from "next/image";
import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/clear.jpg')" }}
    >
      {/* darken the photo a touch so the card always reads clearly */}
      <div className="absolute inset-0 bg-black/30" />

      <main className="relative z-10 flex w-full max-w-md flex-col rounded-2xl bg-slate-950/85 px-8 py-10 shadow-2xl backdrop-blur-md transition-colors duration-300">
        <div className="flex w-full flex-col text-center">
              {/* <Image
    src= "/logo-dark.png"
    alt="Nexa Weather"
    width={150}
    height={45}
    priority
  /> */}
          <h1 className="text-3xl font-bold text-blue-400 dark:text-blue-300">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-slate-300 dark:text-slate-400">
            Sign in to continue
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300 dark:text-slate-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <p className="text-center text-sm text-slate-300 dark:text-slate-400">
            Haven&apos;t signed up yet?{" "}
            <a href="/signup" className="font-medium text-blue-300 hover:underline dark:text-blue-400">
              Sign up here
            </a>
          </p>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              className="w-1/2 rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 font-semibold text-slate-300 transition-colors hover:bg-slate-500 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-lg bg-blue-800 px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
