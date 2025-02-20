import { prisma } from "@/prisma/prisma-clent";
import ProfileForm from "@/shared/components/shared/organisms/ProfileForm";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";
import React from "react";

export const ProfilePage = async () => {
  const session = await getUserSession();

  if (!session) return redirect("/not-auth");

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });

  if (!user) return redirect("/not-auth");

  return <ProfileForm user={user} />;
};

export default ProfilePage;
