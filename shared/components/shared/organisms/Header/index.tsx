'use client'
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "@/shared/components/shared/atoms/Container";
import SearchBar from "@/shared/components/shared/atoms/SearchInput/";
import CartButton from "../../organisms/CartButton";
import HeaderLink from "../../molecules/HeaderLink";
import ProfileButton from "../../molecules/ProfileButton";
import { AuthModal } from "../AuthModal";

type Props = { className?: string; withoutSearchField?: boolean };

export default function Header({
  className,
  withoutSearchField = false,
}: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <header className={cn(`border-b w-full z-30`, className)}>
      <Container className="flex items-center justify-between py-4 px-20 w-full max-w-full">
        <HeaderLink />
        {!withoutSearchField && <SearchBar />}
        <div className="flex items-center gap-3">
          <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenModal(true)} />
          <CartButton />
        </div>
      </Container>
    </header>
  );
}
