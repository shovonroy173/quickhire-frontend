import CategoryJobsScreen from "@/screens/CategoryJobsScreen";

interface CategoryJobsPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryJobsPage({ params }: CategoryJobsPageProps) {
  const { category } = await params;
  return <CategoryJobsScreen categorySlug={category} />;
}
