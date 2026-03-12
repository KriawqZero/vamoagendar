import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { userRepository } from "@/lib/repositories/user.repository";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UpgradeBanner } from "@/components/upsell/upgrade-banner";
import { CompleteProfileBanner } from "@/components/dashboard/complete-profile-banner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[DashboardLayout] Starting...");
  
  const session = await getSession();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  let user = await userRepository.findById(session.user.id);
  
  // Fallback: Generate bookingCode if missing (for OAuth users created before the fix)
  if (user && !user.bookingCode) {
    const { generateBookingCode } = await import("@/lib/utils/slug");
    await userRepository.update(user.id, {
      bookingCode: generateBookingCode(),
    });
    user = await userRepository.findById(session.user.id);
  }
  
  const isFree = user?.plan === "FREE";
  const needsProfileCompletion = !user?.businessName;

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar businessName={user?.businessName} plan={user?.plan} logoUrl={user?.logoUrl} />
      <main className="flex-1 pt-14 lg:pt-0">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
          {needsProfileCompletion && (
            <div className="mb-6">
              <CompleteProfileBanner />
            </div>
          )}
          {isFree && (
            <div className="mb-6">
              <UpgradeBanner />
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
