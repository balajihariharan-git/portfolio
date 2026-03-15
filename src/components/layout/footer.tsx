import { Github, Mail, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/shackleai",
    icon: Github,
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/package/@shackleai/memory-mcp",
    icon: ExternalLink,
  },
  {
    label: "Email",
    href: "mailto:contact@balajihariharan.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Built by Balaji Hariharan &copy; {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
