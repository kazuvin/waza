import { APP_NAME } from "@/config";
import Link from "next/link";
import { CommandSearch } from "../command-search";
import { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function PrivateHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <header
      className={cn(
        "bg-background/50 flex h-16 items-center justify-between backdrop-blur-2xl",
        className
      )}
      {...props}
    >
      <Link href="/" className="font-bold">
        {APP_NAME}
      </Link>
      <CommandSearch />
    </header>
  );
}
