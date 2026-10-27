import { memo } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const MemoHeader = memo(Header);
const MemoFooter = memo(Footer);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MemoHeader />
      <main className="pt-0">{children}</main>
      <MemoFooter />
    </div>
  );
}