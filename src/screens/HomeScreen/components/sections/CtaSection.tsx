import Image from 'next/image';
import React from 'react';
import ctaImage from '@/assets/images/cta-image.png';
import { ADMIN_APP_URL } from '../shared/HomePrimitives';

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-315 px-4 pb-14 sm:px-6 lg:px-8">
      <div className="relative">
        <div
          className="relative overflow-hidden bg-[#4f46e5] px-12 py-16 lg:flex lg:items-center lg:justify-between lg:[clip-path:polygon(60px_0%,100%_0%,100%_calc(100%-80px),calc(100%-80px)_100%,0%_100%,0%_60px)]"
          style={{ minHeight: '360px' }}
        >
          <div className="z-10 max-w-85 text-white">
            <h2 className="text-[52px] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="mt-5 text-[15px] text-white/80">Start posting jobs for only $10.</p>
            <a
              href={ADMIN_APP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block border-2 border-white bg-transparent px-8 py-3 text-[15px] font-bold text-white transition hover:bg-white hover:text-[#4f46e5]"
            >
              Sign Up For Free
            </a>
          </div>
        </div>

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
