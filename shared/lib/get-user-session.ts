import { authOpitons } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  const session =  await getServerSession(authOpitons);

  return session?.user ?? null
}
