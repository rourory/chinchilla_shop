import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chinchilla | Product",
  description: "Try it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
