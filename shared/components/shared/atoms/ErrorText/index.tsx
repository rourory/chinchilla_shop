import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  text: string;
  className?: string;
}

const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};

export default ErrorText;
