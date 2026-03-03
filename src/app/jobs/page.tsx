import JobsScreen from '@/screens/JobsScreen';

interface JobsPageProps {
  searchParams?: Promise<{
    q?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = searchParams ? await searchParams : undefined;
  return <JobsScreen initialQuery={params?.q ?? ''} />;
}
