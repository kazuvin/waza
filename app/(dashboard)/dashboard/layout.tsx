import type { Metadata } from "next";
import { APP_NAME } from "@/config";
import { PrivateHeader } from "@/app/components/shared";

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: "dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateHeader className="fixed top-0 z-20 w-full px-12" />
      <main className="mt-16 flex-1">{children}</main>
    </>
  );
}
