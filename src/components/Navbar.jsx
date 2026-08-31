
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import {
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useStateContext } from "@/Context";
import Image from "next/image";



export default function Navbar() {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { weather, place, setPlace } = useStateContext();
  const { dark, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  // const { place, setPlace } = useStateContext();

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Search city
  const submitCity = () => {
    if (input.trim() !== "") {
      setPlace(input.trim());
      setInput("");
    }
  };

  return (
  <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/90 shadow-stone-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

<Link href="/" className="flex items-center">
  <Image
    src={dark ? "/logo-dark.png" : "/logo.png"}
    alt="Nexa Weather"
    width={150}
    height={45}
    priority
  />
</Link>

        {/* Search */}
        <div className="hidden w-80 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex dark:bg-slate-800">
          <CiSearch
            size={24}
            className="cursor-pointer text-slate-500 dark:text-slate-300"
            onClick={submitCity}
          />

          <input
            type="text"
            placeholder="Search city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitCity();
              }
            }}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Dark mode placeholder */}
  <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded-full bg-white p-3 text-gray-700 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          {dark ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>
          {/* Profile */}
          <div
            className="relative"
            ref={menuRef}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1.5 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              {/* Avatar */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                U
              </span>

              {/* Username */}
              <span className="hidden sm:inline text-slate-700  dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                User
              </span>

              <ChevronDown
                size={15}
                className={`text-slate-500 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:bg-slate-900 dark:border-slate-700">

                {/* User information */}
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    User
                  </p>

                  {place && (
                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">

                      Current city: {place}
                    </p>
                  )}
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100  dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User size={15} />
                  Profile
                </Link>

                {/* Logout */}
                <Link
                  href="/auth/logout"
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <LogOut size={15} />
                  Log out
                </Link>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:hidden dark:bg-slate-800">
        <CiSearch
          size={24}
          className="cursor-pointer text-slate-500"
          onClick={submitCity}
        />

        <input
          type="text"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitCity();
            }
          }}
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
    </nav>
  );
}
