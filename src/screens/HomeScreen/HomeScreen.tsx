"use client";

import React, { useMemo, useState } from "react";
import { MOCK_COMPANIES } from "@/assets/data/mock/companies";
import { Category } from "@/types/category.types";
import {
  useGetFeaturedJobsQuery,
  useGetJobsQuery,
} from "@/features/job/jobApi";
import {
  CategoriesSection,
  CompaniesSection,
  CtaSection,
  FeaturedJobsSection,
  HomeFooter,
  HomeHeader,
  HomeHeroSection,
  LatestJobsSection,
} from "./components/HomeSections";

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Florence, Italy");
  const [email, setEmail] = useState("");
  const { data: featuredData, isLoading: isFeaturedLoading } =
    useGetFeaturedJobsQuery();
  const { data: latestData, isLoading: isLatestLoading } = useGetJobsQuery({
    page: 1,
    limit: 6,
  });

  const featured = useMemo(() => {
    if (!featuredData?.length) {
      return [];
    }

    return featuredData.slice(0, 8);
  }, [featuredData]);

  const latest = useMemo(() => {
    if (!latestData?.items?.length) {
      return [];
    }

    return latestData.items.slice(0, 6);
  }, [latestData]);

  const categories = useMemo<Category[]>(() => {
    const jobs = latestData?.items ?? [];

    if (!jobs.length) {
      return [];
    }

    const counts = jobs.reduce<Record<string, number>>((acc, job) => {
      const key = job.category.trim();
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, leftCount], [, rightCount]) => rightCount - leftCount)
      .map(([name, jobCount], index) => ({
        id: `category-${name.toLowerCase().replace(/\s+/g, "-")}-${index}`,
        name,
        icon: "",
        jobCount,
      }));
  }, [latestData]);

  const handleCategoryClick = () => undefined;
  const handleSubscribe = () => undefined;

  return (
    <div className="bg-white text-[#1f2a44]">
      <div className="bg-[#f7f7fb]">
        <HomeHeader />
      </div>
      {/* Hero Scetion */}
      <div className="relative bg-[#f7f7fb]  [clip-path:none] md:[clip-path:polygon(0%_0%,100%_0%,100%_calc(100%-260px),calc(100%-260px)_100%,0%_100%)]">
        <HomeHeroSection
          query={query}
          location={location}
          onQueryChange={setQuery}
          onLocationChange={setLocation}
        />
      </div>
      <CompaniesSection companies={MOCK_COMPANIES} />
      <CategoriesSection
        categories={categories}
        loading={isLatestLoading}
        onCategoryClick={handleCategoryClick}
      />
      <CtaSection />
      <FeaturedJobsSection jobs={featured} loading={isFeaturedLoading} />
      <LatestJobsSection jobs={latest} loading={isLatestLoading} />
      <HomeFooter
        email={email}
        onEmailChange={setEmail}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default HomeScreen;
