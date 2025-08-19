import { FaGithub, FaLinkedin, FaGlobe, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between py-6 max-w-6xl mx-auto bg-background border-t border-border">
      <div className="text-sm text-muted-foreground mb-2 sm:mb-0 text-center sm:text-left">
        <a href="https://dev-manar.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="hover:text-primary">
          Made with <FaHeart className="inline h-4 w-4 text-destructive mx-1" /> by DEVMANAR
        </a>
      </div>
      <div className="flex space-x-6 justify-center sm:justify-end">
        <a href="https://dev-manar.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-muted-foreground hover:text-primary">
          <FaGlobe className="w-6 h-6" />
        </a>
        <a href="https://github.com/muham-2002" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
          <FaGithub className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/arham-amir-a1m/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}