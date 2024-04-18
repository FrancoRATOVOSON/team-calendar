import { UserPage } from "@/app/user";
import CONFIG from "@/lib/config";
import { Navigate } from "@/router";

export default function Page() {
  const hasToken = localStorage.getItem(CONFIG.token_key);

  if (!hasToken) return <Navigate to={"/"} />;

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="font-semibold text-4xl mb-4">Admin Page</h1>
      <UserPage />
    </div>
  );
}
