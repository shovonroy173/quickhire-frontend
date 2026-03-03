import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Company } from '@/types/company.types';
import { Job } from '@/types/job.types';

export const navLinks = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Browse Companies', href: '/jobs' },
];

export const ADMIN_APP_URL =
  process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? 'https://quickhire-admin.vercel.app';

const tagClassByName: Record<string, string> = {
  Marketing: 'bg-orange-50 text-orange-600 border-orange-200',
  Design: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  Technology: 'bg-rose-50 text-rose-600 border-rose-200',
  'Human Resource': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  'Full-time': 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

export const categoryIconMap: Record<string, React.ReactNode> = {
  Design: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20l5-5m-2-9l10 10m-2-12l3 3-9 9H6v-3l9-9z" />
    </svg>
  ),
  Sales: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19h16M7 16V8m5 8V5m5 11v-4" />
    </svg>
  ),
  Marketing: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11v2m0-1l12-6v12L3 12zm12 0h4l2 2v-4l-2 2h-4z" />
    </svg>
  ),
  Finance: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3" />
    </svg>
  ),
  Technology: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M8 19h8" />
    </svg>
  ),
  Engineering: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 8l-4 4 4 4m8-8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
  Business: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 7V5h8v2m-9 13h10a2 2 0 002-2V9H5v9a2 2 0 002 2z" />
    </svg>
  ),
  'Human Resource': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
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
      <span className="text-lg font-semibold tracking-tight text-[#1f2a44]">QuickHire</span>
    </div>
  );
}

export function Tag({ label }: { label: string }) {
  const className = tagClassByName[label] ?? 'bg-slate-50 text-slate-600 border-slate-200';
  return <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${className}`}>{label}</span>;
}

export function SectionHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <h2 className="text-4xl font-bold leading-none text-[#1f2a44] sm:text-5xl">
      {title} <span className="text-[#2e9dfb]">{accent}</span>
    </h2>
  );
}

interface HomeSectionShellProps {
  title: string;
  accent: string;
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName: string;
  showAllHref?: string;
}

export function HomeSectionShell({
  title,
  accent,
  children,
  sectionClassName = '',
  containerClassName,
  showAllHref = '/jobs',
}: HomeSectionShellProps) {
  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading title={title} accent={accent} />
          <Link href={showAllHref} className="hidden items-center gap-2 text-sm font-semibold text-[#4f46e5] sm:inline-flex">
            Show all jobs <span>{'->'}</span>
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}

interface LoadableCollectionProps<T> {
  items: T[];
  loading: boolean;
  skeletonCount: number;
  renderItem: (item: T) => React.ReactNode;
  renderSkeleton: (index: number) => React.ReactNode;
}

export function LoadableCollection<T>({
  items,
  loading,
  skeletonCount,
  renderItem,
  renderSkeleton,
}: LoadableCollectionProps<T>) {
  if (loading) {
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, index) => renderSkeleton(index))}
      </>
    );
  }

  return <>{items.map((item) => renderItem(item))}</>;
}

export function HomeJobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <article className="cursor-pointer border border-[#e4e5ef] bg-white p-4 transition-shadow hover:shadow-md">
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
        <p className="mt-3 max-h-8 overflow-hidden text-xs text-[#8a8ea0]">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag label={job.category} />
          <Tag label={job.type} />
        </div>
      </article>
    </Link>
  );
}

export function LatestJobRow({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <article className="cursor-pointer border border-[#ececf5] bg-white px-4 py-3 transition-shadow hover:shadow-md">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-sm font-semibold text-slate-700">
            {job.company.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#1f2a44]">{job.title}</h3>
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

export function LatestJobRowSkeleton() {
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

export function CategoryCardSkeleton() {
  return (
    <div className="border border-[#e4e5ef] bg-white p-5">
      <div className="mb-5 h-8 w-8 animate-pulse rounded bg-slate-200" />
      <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
    </div>
  );
}

export function CompaniesLogos({ companies }: { companies: Company[] }) {
  return (
    <div className="flex flex-wrap gap-20 sm:flex-nowrap">
      {companies.map((company) => (
        <Image
          key={company.id}
          src={company.logo}
          alt={company.name}
          className="h-10 w-auto cursor-pointer object-contain grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100"
          width={120}
          height={40}
        />
      ))}
    </div>
  );
}
