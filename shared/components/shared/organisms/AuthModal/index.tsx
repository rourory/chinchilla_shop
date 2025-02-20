/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

interface AuthModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  className,
  open,
  onClose,
}) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  const onClickSignIn = (provider: "github" | "yandex") => {
    signIn(provider, { callbackUrl: "/", redirect: true });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "p-10 w-[35vw] max-w-[1000px] min-w-[400px] min-h-[900px] max-h-[1200px] bg-white overflow-hidden border-none",
          className,
        )}
      >
        <div className="flex flex-col justify-between">
          <div>
            {type === "login" ? (
              <LoginForm onClose={handleClose} />
            ) : (
              <RegisterForm onClose={handleClose} />
            )}
          </div>
          <hr />
          <div className="h-[120px] flex flex-col gap-4">
            <div className="flex gap-6">
              <Button
                variant={"secondary"}
                onClick={() => onClickSignIn("github")}
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                <img
                  className="h-6 w-6"
                  src="https://github.githubassets.com/favicons/favicon.svg"
                  alt="GitHub"
                />
                GitHub
              </Button>

              <Button
                variant={"secondary"}
                onClick={() => onClickSignIn("yandex")}
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                <img
                  className="h-6 w-6"
                  src="https://yastatic.net/s3/home-static/_/nova/Bbcs5LWW.png"
                  alt="Yandex"
                />
                Yandex
              </Button>
            </div>

            <Button
              variant={"outline"}
              onClick={onSwitchType}
              type="button"
              className="h-12"
            >
              {type !== "login" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
