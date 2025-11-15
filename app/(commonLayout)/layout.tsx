import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/config";
import { AppHeader } from "../components/shared";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader className="fixed top-0 z-20 w-full px-12" />
      <main className="flex-1">{children}</main>
    </>
  );
}
