import React from "react";

export const metadata = {
  title: "Chinchilla | Dashboard",
  description: "Customizable clothing shop, the best in the world",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
