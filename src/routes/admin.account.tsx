import { createFileRoute } from "@tanstack/react-router";
import { AccountPanel } from "@/components/admin/AccountPanel";
import { useAdmin } from "@/components/admin/AdminContext";

export const Route = createFileRoute("/admin/account")({
  component: AccountRoute,
});

function AccountRoute() {
  const { email, signOut } = useAdmin();
  return <AccountPanel email={email} onSignOut={signOut} />;
}
