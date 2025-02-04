import type { Metadata } from "next";
import Header from "@/shared/components/shared/organisms/Header";
import React from "react";
import { Container } from "@/shared/components/shared/atoms/Container";

export const metadata: Metadata = {
  title: "Chinchilla | Checkout",
  description: "Checkout page description",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`min-h-screen bg-secondary`}>
      <Header withoutSearchField className="border-gray-300" />
      <Container className="px-16">{children}</Container>
    </main>
  );
}
