import type { Metadata } from "next";
import Header from "@/shared/components/shared/organisms/Header";
import React from "react";

export const metadata: Metadata = {
  title: "Chinchilla | Each detail is for you",
  description: "Customizable clothing shop, the best in the world",
};

export default function HomeLayout({
  children,
  productModal,
}: Readonly<{
  children: React.ReactNode;
  productModal: React.ReactNode;
}>) {
  return (
    <main className={`min-w-[900px]`}>
      <Header />
      {children}
      {productModal}
    </main>
  );
}
