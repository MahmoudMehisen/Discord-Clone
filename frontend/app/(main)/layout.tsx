import React, { ReactNode } from "react";
import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";
import UserProfileCircle from "@/components/user-button";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserProfileCircle firstName={"John"} lastName={"Doe"} />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
