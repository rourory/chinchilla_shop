"use client";
import { useSession } from "next-auth/react";
import React from "react";
import SignInButton from "../SignInButton";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { CircleUser } from "lucide-react";

interface ProfileButtonProps {
  onClickSignIn?: () => void;
  className?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className={cn("", className)}>
      {!session ? (
        <SignInButton onClick={onClickSignIn} />
      ) : (
        <Link href={"/profile"}>
          <Button variant={"secondary"} className="flex items-center gap-2">
            <CircleUser size={18} /> Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
