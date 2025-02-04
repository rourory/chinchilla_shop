import { Button } from "@/shared/components/ui/button";
import { User } from "lucide-react";
import React from "react";

const SignInButton = () => {
  return (
    <Button variant={"outline"} className="flex items-center gap-1">
      <User size={16} />
      Sign In
    </Button>
  );
};

export default SignInButton;
