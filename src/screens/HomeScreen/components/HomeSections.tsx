import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import heroImage from "@/assets/images/hero-image.png";
import ctaImage from "@/assets/images/cta-image.png";
import heroUnderline from "@/assets/images/hero-underline.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useMeQuery } from "@/features/user/userApi";
import { clearCredentials } from "@/features/user/userSlice";
import { pushToast } from "@/features/ui/uiSlice";
import { Category } from "@/types/category.types";
import { Company } from "@/types/company.types";
import { Job } from "@/types/job.types";
import { toCategorySlug } from "@/utils/jobRouting";
import { JobCardSkeleton } from "@/components/skeletons";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Browse Companies", href: "/jobs" },
];

const tagClassByName: Record<string, string> = {
  Marketing: "bg-orange-50 text-orange-600 border-orange-200",
  Design: "bg-cyan-50 text-cyan-600 border-cyan-200",
  Technology: "bg-rose-50 text-rose-600 border-rose-200",
  "Human Resource": "bg-indigo-50 text-indigo-600 border-indigo-200",
  "Full-time": "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const categoryIconMap: Record<string, React.ReactNode> = {
  Design: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 20l5-5m-2-9l10 10m-2-12l3 3-9 9H6v-3l9-9z" />
    </svg>
  ),
  Sales: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19h16M7 16V8m5 8V5m5 11v-4" />
    </svg>
  ),
  Marketing: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 11v2m0-1l12-6v12L3 12zm12 0h4l2 2v-4l-2 2h-4z" />
    </svg>
  ),
  Finance: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3" />
    </svg>
  ),
  Technology: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M8 19h8" />
    </svg>
  ),
  Engineering: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 8l-4 4 4 4m8-8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
  Business: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 7V5h8v2m-9 13h10a2 2 0 002-2V9H5v9a2 2 0 002 2z" />
    </svg>
  ),
  "Human Resource": (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="12" cy="13" r="2" />
      <path d="M5 18c0-2 2-3 3-3m8 3c0-2-2-3-3-3m-5 3c0-2 2-3 4-3s4 1 4 3" />
    </svg>
  ),
};

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4f46e5] text-white">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#1f2a44]">
        QuickHire
      </span>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  const className =
    tagClassByName[label] ?? "bg-slate-50 text-slate-600 border-slate-200";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${className}`}
    >
      {label}
    </span>
  );
}

function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <h2 className="text-4xl font-bold leading-none text-[#1f2a44] sm:text-5xl">
      {title} <span className="text-[#2e9dfb]">{accent}</span>
    </h2>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <article className="border border-[#e4e5ef] bg-white p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            {job.company.slice(0, 1)}
          </span>
          <Tag label="Full-time" />
        </div>
        <h3 className="text-base font-semibold text-[#1f2a44]">{job.title}</h3>
        <p className="mt-1 text-xs text-[#6f7485]">
          {job.company} - {job.location}
        </p>
        <p className="mt-3 max-h-8 overflow-hidden text-xs text-[#8a8ea0]">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag label={job.category} />
          <Tag label={job.type} />
        </div>
      </article>
    </Link>
  );
}

function LatestJobRow({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <article className="border border-[#ececf5] bg-white px-4 py-3 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-sm font-semibold text-slate-700">
            {job.company.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#1f2a44]">
              {job.title}
            </h3>
            <p className="truncate text-xs text-[#6f7485]">
              {job.company} - {job.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag label="Full-time" />
              <Tag label={job.category} />
              <Tag label="Design" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function LatestJobRowSkeleton() {
  return (
    <article className="border border-[#ececf5] bg-white px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 animate-pulse rounded bg-slate-200" />
        <div className="min-w-0 flex-1">
          <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-14 animate-pulse rounded-full bg-slate-200" />
            <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { data: me } = useMeQuery(undefined, { skip: !token || Boolean(currentUser) });
  const loggedInUser = currentUser ?? me ?? null;
  const currentPath = pathname || "/";
  const loginHref = `/auth?mode=login&redirect=${encodeURIComponent(currentPath || "/")}`;
  const signupHref = `/auth?mode=signup&redirect=${encodeURIComponent(currentPath || "/")}`;

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(pushToast({ type: "info", title: "Logged out successfully" }));
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="mx-auto w-full max-w-315 px-4 pt-4 sm:px-6 md:pt-5 lg:px-8 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">

        <Logo />
        <nav className="flex items-center gap-6 text-sm text-[#4f5568]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-[#4f46e5]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* hamburger */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8dbef] text-[#667085] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
        <div className="hidden items-center gap-10 md:flex">
          {/* <nav className="flex items-center gap-6 text-sm text-[#4f5568]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-[#4f46e5]"
              >
                {item.label}
              </Link>
            ))}
          </nav> */}
          <div className="flex items-center gap-5">
            {loggedInUser ? (
              <>
                <span className="text-sm font-semibold text-[#1f2a44]">
                  Hi, {loggedInUser.name}
                </span>
                <Link
                  href="/profile"
                  className="text-sm font-semibold text-[#4f46e5]"
                >
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

interface HeroSectionProps {
  query: string;
  location: string;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export function HomeHeroSection({
  query,
  location,
  onQueryChange,
  onLocationChange,
}: HeroSectionProps) {
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
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search bar — extends beyond left column into hero image */}
          <div className="relative z-20 mt-7 border border-[#eceef5] bg-white p-3 shadow-md md:mt-9 md:flex md:items-center md:gap-2 md:p-2 md:-mr-55">
            <div className="flex items-center gap-3 border-b border-[#d9deea] px-3 py-3 md:flex-1 md:border-b-0 md:border-r md:py-4">
              <span className="text-[#25324b]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>

            <button className="mt-2 w-full bg-[#4f46e5] px-6 py-3 text-[16px] font-semibold text-white md:mt-0 md:w-auto md:min-w-52.5 md:py-4">
              Search my job
            </button>
          </div>

          <p className="mt-4 text-[14px] text-[#4f5568] md:mt-5">
            Popular : UI Designer, UX Researcher, Android, Admin
          </p>
        </div>

        {/* RIGHT — hero image behind search bar */}
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

export function CompaniesSection({ companies }: { companies: Company[] }) {
  return (
    <section className="mx-auto w-full max-w-315 px-4 py-10 sm:px-6 lg:px-8 gap-8 flex flex-col ">
      <p className="text-sm md:text-xl lg:text-2xl text-[#8f94a8]">
        Companies we helped grow
      </p>
      <div className="flex flex-wrap gap-20 sm:flex-nowrap ">
        {companies.map((company) => (
          <Image
            key={company.id}
            src={company.logo}
            alt={company.name}
            className="h-10 w-auto object-contain grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100 cursor-pointer"
            width={120}
            height={40}
          />
        ))}
      </div>
    </section>
  );
}

interface CategoriesSectionProps {
  categories: Category[];
  loading?: boolean;
  onCategoryClick?: (category: Category) => void;
}

function CategoryCardSkeleton() {
  return (
    <div className="border border-[#e4e5ef] bg-white p-5">
      <div className="mb-5 h-8 w-8 animate-pulse rounded bg-slate-200" />
      <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
    </div>
  );
}

export function CategoriesSection({
  categories,
  loading = false,
  onCategoryClick,
}: CategoriesSectionProps) {
  return (
    <section className="mx-auto w-full max-w-315 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeading title="Explore by" accent="category" />
        <Link
          href="/jobs"
          className="hidden text-sm font-semibold gap-2 text-[#4f46e5] sm:inline-flex"
        >
          Show all jobs <span>→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <CategoryCardSkeleton key={`category-skeleton-${index}`} />
            ))
          : categories.slice(0, 8).map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/jobs/category/${toCategorySlug(category.name)}`}
                  onClick={() => onCategoryClick?.(category)}
                  className="group block border border-[#e4e5ef] bg-white p-5 text-left text-[#1f2a44] transition hover:border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white"
                >
                  <div className="mb-5 inline-flex h-8 w-8 items-center justify-center text-[#4f46e5] group-hover:text-white">
                    {categoryIconMap[category.name]}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-[#7a7f92] group-hover:text-white/80">
                      {category.jobCount} jobs available
                    </p>
                    <span className="text-sm text-[#4f46e5] group-hover:text-white">
                      {"->"}
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>
    </section>
  );
}



export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-315 px-4 pb-14 sm:px-6 lg:px-8">
      <div className="relative">
        {/* Blue background panel */}
        <div
          className="relative overflow-hidden bg-[#4f46e5] px-12 py-16 lg:flex lg:items-center lg:justify-between lg:[clip-path:polygon(60px_0%,100%_0%,100%_calc(100%-80px),calc(100%-80px)_100%,0%_100%,0%_60px)]"
          style={{
            minHeight: "360px",
          }}
        >
          {/* Left text content */}
          <div className="z-10 max-w-85 text-white">
            <h2 className="text-[52px] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="mt-5 text-[15px] text-white/80">
              Start posting jobs for only $10.
            </p>
            <button className="mt-8 border-2 border-white bg-transparent px-8 py-3 text-[15px] font-bold text-white transition hover:bg-white hover:text-[#4f46e5]">
              Sign Up For Free
            </button>
          </div>
        </div>

        {/* Dashboard image — floats over right side, elevated above panel */}
        <div className="absolute right-8 top-10 hidden lg:block">
          <Image
            src={ctaImage}
            alt="CTA Dashboard"
            className="h-auto w-145 max-w-none rounded "
            width={580}
            height={380}
            priority
          />
        </div>
      </div>
    </section>
  );
}

interface FeaturedJobsSectionProps {
  jobs: Job[];
  loading?: boolean;
}

export function FeaturedJobsSection({ jobs, loading = false }: FeaturedJobsSectionProps) {
  console.log('LINE AT 587', loading);
  
  return (
    <section className="mx-auto w-full max-w-315 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeading title="Featured" accent="jobs" />
        <Link
          href="/jobs"
          className="hidden text-sm font-semibold gap-2 text-[#4f46e5] sm:inline-flex"
        >
          Show all jobs <span>→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <JobCardSkeleton key={`featured-skeleton-${index}`} />
            ))
          : jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </section>
  );
}



interface LatestJobsSectionProps {
  jobs: Job[];
  loading?: boolean;
}

export function LatestJobsSection({ jobs, loading = false }: LatestJobsSectionProps) {
  return (
    <section className="relative bg-[#f0f2fb] py-12 lg:[clip-path:polygon(80px_0%,100%_0%,100%_100%,0%_100%,0%_80px)]">
      {/* Decorative diagonal rectangles — background */}
      <div className="pointer-events-none absolute right-25 top-15 h-37.5 w-85 -rotate-26 border border-[#c5c8e8] opacity-70 z-0" />
      <div className="pointer-events-none absolute -right-22.5 top-37.5 h-42.5 w-135 -rotate-26 border border-[#c5c8e8] opacity-70 z-0" />
      <div className="pointer-events-none absolute -right-12.5 top-67.5 h-52.5 w-145 -rotate-26 border border-[#c5c8e8] opacity-70 z-0" />
      <div className="pointer-events-none absolute -right-10 top-115 h-52.5 w-140 -rotate-26 border border-[#c5c8e8] opacity-70 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-315 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading title="Latest" accent="jobs open" />
          <Link
            href="/jobs"
            className="hidden items-center gap-2 text-sm font-semibold text-[#4f46e5] sm:inline-flex"
          >
            Show all jobs <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <LatestJobRowSkeleton key={`latest-skeleton-${index}`} />
              ))
            : jobs.map((job) => <LatestJobRow key={job.id} job={job} />)}
        </div>
      </div>
    </section>
  );
}

interface HomeFooterProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubscribe: () => void;
}

export function HomeFooter({
  email,
  onEmailChange,
  onSubscribe,
}: HomeFooterProps) {
  return (
    <footer className="bg-[#1b2237] pb-10 pt-12 text-white">
      <div className="mx-auto w-full max-w-315 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-70 text-sm text-white/70">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
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
            <p className="mt-4 text-sm text-white/70">
              The latest job news, articles, sent to your inbox weekly.
            </p>
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
              <button className="bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/60">
          2021 @ QuickHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
