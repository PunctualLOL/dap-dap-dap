import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container flex items-center justify-between h-20">
        <a href="#home" className="font-serif text-2xl tracking-wide">
          District <span className="text-primary">45</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="default" size="sm">
            <a href="#book">Reserve</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border/50",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="container py-6 space-y-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Button asChild className="w-full">
              <a href="#book" onClick={() => setOpen(false)}>Reserve a table</a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};
