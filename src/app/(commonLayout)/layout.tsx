"use client";

import React from "react";
import { Navbar1 } from "@/components/layout/navbar1";
import { Footer2 } from "@/components/layout/footer2";
import { usePathname } from "next/navigation";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where navbar & footer should be hidden
  const hideLayoutPages = ["/login", "/signup"];
  const hideLayout = hideLayoutPages.includes(pathname);

  return (
    <div>
      {!hideLayout && <Navbar1 />}
      {children}
      {!hideLayout && <Footer2 />}
    </div>
  );
}
