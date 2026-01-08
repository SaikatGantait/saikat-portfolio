import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Home, User, Briefcase, Code, BookOpen, MessageSquare, Mail } from "lucide-react";

const commands = [
  { label: "Home", href: "#", icon: Home, group: "Navigation" },
  { label: "About", href: "#about", icon: User, group: "Navigation" },
  { label: "Projects", href: "#projects", icon: Briefcase, group: "Navigation" },
  { label: "Skills", href: "#skills", icon: Code, group: "Navigation" },
  { label: "Blog", href: "#blog", icon: BookOpen, group: "Navigation" },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquare, group: "Navigation" },
  { label: "Contact", href: "#contact", icon: Mail, group: "Navigation" },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Keyboard shortcut hint */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
      >
        <span className="text-sm">Quick nav</span>
        <kbd className="px-2 py-0.5 text-xs rounded bg-white/10 border border-white/20">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {commands.map((command) => (
              <CommandItem
                key={command.label}
                onSelect={() => handleSelect(command.href)}
                className="cursor-pointer"
              >
                <command.icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
