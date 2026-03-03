'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useMeQuery } from '@/features/user/userApi';
import { clearCredentials } from '@/features/user/userSlice';
import { pushToast } from '@/features/ui/uiSlice';
import { Logo, navLinks } from '../shared/HomePrimitives';

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { data: me } = useMeQuery(undefined, { skip: !token || Boolean(currentUser) });
  const loggedInUser = currentUser ?? me ?? null;
  const currentPath = pathname || '/';
  const loginHref = `/auth?mode=login&redirect=${encodeURIComponent(currentPath)}`;
  const signupHref = `/auth?mode=signup&redirect=${encodeURIComponent(currentPath)}`;

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(pushToast({ type: 'info', title: 'Logged out successfully' }));
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="mx-auto w-full max-w-315 px-4 pt-4 sm:px-6 md:pt-5 lg:px-8 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden items-center md:flex">
            <nav className="flex items-center gap-6 text-sm text-[#4f5568]">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-[#4f46e5]">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8dbef] text-[#667085] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <div className="hidden items-center gap-10 md:flex">
          <div className="flex items-center gap-5">
            {loggedInUser ? (
              <>
                <span className="text-sm font-semibold text-[#1f2a44]">Hi, {loggedInUser.name}</span>
                <Link href="/profile" className="text-sm font-semibold text-[#4f46e5]">
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={loginHref} className="text-sm font-semibold text-[#4f46e5]">
                  Login
                </Link>
                <Link
                  href={signupHref}
                  className="bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="mt-3 rounded-lg border border-[#e4e5ef] bg-white p-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-[#4f5568]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-[#4f46e5]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex gap-2">
            {loggedInUser ? (
              <>
                <Link
                  href="/profile"
                  className="flex-1 rounded border border-[#4f46e5] px-3 py-2 text-center text-sm font-semibold text-[#4f46e5]"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="flex-1 rounded bg-[#4f46e5] px-3 py-2 text-center text-sm font-semibold text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={loginHref}
                  className="flex-1 rounded border border-[#4f46e5] px-3 py-2 text-center text-sm font-semibold text-[#4f46e5]"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href={signupHref}
                  className="flex-1 rounded bg-[#4f46e5] px-3 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
