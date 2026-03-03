import React from 'react';
import { Logo } from '../shared/HomePrimitives';

interface HomeFooterProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubscribe: () => void;
}

export function HomeFooter({ email, onEmailChange, onSubscribe }: HomeFooterProps) {
  return (
    <footer className="bg-[#1b2237] pb-10 pt-12 text-white">
      <div className="mx-auto w-full max-w-315 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-70 text-sm text-white/70">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Get job notifications</h3>
            <p className="mt-4 text-sm text-white/70">The latest job news, articles, sent to your inbox weekly.</p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                onSubscribe();
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="Email Address"
                className="w-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button className="bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/60">2021 @ QuickHire. All rights reserved.</div>
      </div>
    </footer>
  );
}
