import JobDetailScreen from '@/screens/JobDetailScreen';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  return <JobDetailScreen jobId={id} />;
}
