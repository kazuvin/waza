import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/config";
import { PublicHeader } from "../components/shared";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader className="fixed top-0 z-20 w-full px-12" />
      <main className="flex-1">{children}</main>
    </>
  );
}
