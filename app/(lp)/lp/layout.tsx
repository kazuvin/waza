import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Landing page",
};

export default function LPLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
