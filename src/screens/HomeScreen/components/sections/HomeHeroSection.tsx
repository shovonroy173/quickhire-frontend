'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import heroImage from '@/assets/images/hero-image.png';
import heroUnderline from '@/assets/images/hero-underline.png';

interface HeroSectionProps {
  query: string;
  location: string;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export function HomeHeroSection({ query, location, onQueryChange, onLocationChange }: HeroSectionProps) {
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set('q', trimmedQuery);
    }

    const suffix = params.toString();
    router.push(`/jobs${suffix ? `?${suffix}` : ''}`);
  };

  return (
    <section className="relative mx-auto w-full max-w-315 overflow-hidden bg-[#f7f7fb] px-4 pb-8  sm:px-6 md:pb-0 lg:px-8 ">
      <div className="pointer-events-none absolute -right-20 top-40 h-35 w-85 rotate-[-28deg] border-2 border-[#d9dcf6] md:hidden" />
      <div className="pointer-events-none absolute -right-28 top-105 h-35 w-85 rotate-[-28deg] border-2 border-[#d9dcf6] md:hidden" />

      <div className="relative z-10 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="max-w-155 pt-3 md:pb-16 md:pt-14">
          <h1 className="text-[64px] font-extrabold leading-[0.98] tracking-[-0.02em] text-[#25324b] max-[420px]:text-[52px] md:text-[80px]">
            Discover
            <br />
            more than
            <br />
            <span className="text-[#2f9cf5]">5000+ Jobs</span>
          </h1>

          <Image
            src={heroUnderline}
            alt="Underline"
            className="mt-3 h-auto w-[320px] max-w-full md:mt-2 md:w-117.5"
            priority
          />

          <p className="mt-6 max-w-130 text-[16px] leading-[1.6] text-[#7c8493] md:mt-10 md:text-[17px]">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          <div className="relative z-20 mt-7 border border-[#eceef5] bg-white p-3 shadow-md md:mt-9 md:flex md:items-center md:gap-2 md:p-2 md:-mr-55">
            <div className="flex items-center gap-3 border-b border-[#d9deea] px-3 py-3 md:flex-1 md:border-b-0 md:border-r md:py-4">
              <span className="text-[#25324b]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
              </span>
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                className="w-full bg-transparent text-[16px] text-[#25324b] outline-none placeholder:text-[#b3b7c5]"
                placeholder="Job title or keyword"
              />
            </div>

            <div className="flex items-center gap-3 px-3 py-3 md:flex-1 md:py-4">
              <span className="text-[#25324b]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <input
                value={location}
                onChange={(event) => onLocationChange(event.target.value)}
                className="w-full bg-transparent text-[16px] text-[#25324b] outline-none"
              />
              <span className="text-[#7c8493]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-2 w-full bg-[#4f46e5] px-6 py-3 text-[16px] font-semibold text-white md:mt-0 md:w-auto md:min-w-52.5 md:py-4"
            >
              Search my job
            </button>
          </div>

          <p className="mt-4 text-[14px] text-[#4f5568] md:mt-5">Popular : UI Designer, UX Researcher, Android, Admin</p>
        </div>

        <div className="relative h-170 w-full overflow-hidden max-md:hidden">
          <div className="pointer-events-none absolute right-25 top-15 h-37.5 w-85 -rotate-26 border border-[#c5c8e8] opacity-70" />
          <div className="pointer-events-none absolute -right-22.5 top-37.5 h-42.5 w-135 -rotate-26 border border-[#c5c8e8] opacity-70" />
          <div className="pointer-events-none absolute -right-12.5 top-67.5 h-52.5 w-145 -rotate-26 border border-[#c5c8e8] opacity-70" />
          <div className="pointer-events-none absolute -right-10 top-115 h-52.5 w-140 -rotate-26 border border-[#c5c8e8] opacity-70" />

          <Image
            src={heroImage}
            alt="Professional person"
            className="absolute bottom-0 -right-10 h-[95%] w-auto max-w-none object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
