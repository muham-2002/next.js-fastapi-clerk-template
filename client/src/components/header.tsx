import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  return (
    <header className="w-full max-w-6xl flex flex-row justify-between items-center p-4 bg-background border-b border-border mx-auto">
      <a
        href="https://github.com/ysskrishna/fastapi-nextjs-clerk"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold text-foreground hover:underline hover:text-primary"
      >
        FastAPI + NextJS + Clerk Integration
      </a>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}