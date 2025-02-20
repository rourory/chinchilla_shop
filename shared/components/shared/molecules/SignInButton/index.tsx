import { Button } from "@/shared/components/ui/button";
import { User } from "lucide-react";
import React from "react";

interface SignInButtonProps {
  onClick?: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-1"
      onClick={onClick}
    >
      <User size={16} />
      Sign In
    </Button>
  );
};

export default SignInButton;
