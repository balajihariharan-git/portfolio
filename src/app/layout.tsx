import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { GALoader } from "@/components/analytics/ga-loader";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Balaji Hariharan — AI Solutions Architect",
    template: "%s | Balaji Hariharan",
  },
  description:
    "AI Solutions Architect, LLM Infrastructure Engineer, and Founder of ShackleAI. I design and build production multi-agent systems, LLM gateways, and governance frameworks. Available for enterprise consulting, freelance AI projects, and technical training.",
  metadataBase: new URL("https://balajihariharan.com"),
  openGraph: {
    type: "website",
    siteName: "Balaji Hariharan",
    title: "Balaji Hariharan — AI Solutions Architect",
    description:
      "AI Solutions Architect building production multi-agent systems. Founder of ShackleAI. Open-source MCP tools with 1,440+ weekly downloads. Hire for AI consulting, freelance projects, or full-time roles.",
    url: "https://balajihariharan.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Hariharan — AI Solutions Architect",
    description: "AI Solutions Architect building production agent systems, LLM gateways, and governance frameworks.",
  },
  keywords: [
    "AI Solutions Architect",
    "AI Agent Architect",
    "LLM Infrastructure Engineer",
    "Agentic AI Consultant",
    "MCP Protocol Expert",
    "AI Freelancer",
    "AI Training Workshops",
    "Multi-Agent Systems",
    "LLM Gateway",
    "AI Agent Governance",
    "Hire AI Engineer",
    "AI Startup CTO",
    "ShackleAI",
    "Balaji Hariharan",
  ],
  authors: [{ name: "Balaji Hariharan", url: "https://balajihariharan.com" }],
  creator: "Balaji Hariharan",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="pt-[73px]">{children}</main>
          <Footer />
          <JsonLd />
        </ThemeProvider>
        <GALoader />
      </body>
    </html>
  );
}
