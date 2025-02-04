import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "@/shared/components/shared/atoms/Container";
import SearchBar from "@/shared/components/shared/atoms/SearchInput/";
import CartButton from "../../organisms/CartButton";
import SignInButton from "../../molecules/SignInButton";
import HeaderLink from "../../molecules/HeaderLink";

type Props = { className?: string; withoutSearchField?: boolean };

export default function Header({
  className,
  withoutSearchField = false,
}: Props) {
  return (
    <header className={cn(`border-b w-full z-30`, className)}>
      <Container className="flex items-center justify-between py-4 px-20 w-full max-w-full">
        <HeaderLink />
        {!withoutSearchField && <SearchBar />}
        <div className="flex items-center gap-3">
          <SignInButton />
          <CartButton />
        </div>
      </Container>
    </header>
  );
}
