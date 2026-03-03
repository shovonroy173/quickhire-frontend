import AuthScreen from "@/screens/AuthScreen";

type SearchParams = Promise<{
  mode?: string;
  redirect?: string;
}>;

interface AuthPageProps {
  searchParams: SearchParams;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const mode = params?.mode === "signup" ? "signup" : "login";
  const redirectTo = params?.redirect;

  return <AuthScreen initialMode={mode} redirectTo={redirectTo} />;
}
