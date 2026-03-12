import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie");
    
    console.log("[getSession] Cookie header:", cookieHeader?.substring(0, 200));
    console.log("[getSession] Has better-auth.session_token:", cookieHeader?.includes("better-auth.session_token"));
    
    const session = await auth.api.getSession({
      headers: headersList,
    });
    
    console.log("[getSession] Session result:", {
      exists: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });
    
    return session;
  } catch (error) {
    console.error("[getSession] Error:", error);
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
