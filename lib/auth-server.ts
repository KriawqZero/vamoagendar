import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  try {
    const headersList = await headers();
    const cookies = headersList.get("cookie");
    
    console.log("getSession - Cookies:", cookies?.substring(0, 100));
    
    const session = await auth.api.getSession({
      headers: headersList,
    });
    
    console.log("getSession - Result:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
    });
    
    return session;
  } catch (error) {
    console.error("getSession - Error:", error);
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
