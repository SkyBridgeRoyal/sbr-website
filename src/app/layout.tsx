import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyBridge Royal Passage",
  description: "Connecting Africa. Connecting You.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header
          style={{
            backgroundColor: 'var(--color-navy)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href="/"
            style={{
              color: 'var(--color-white)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              textDecoration: 'none',
            }}
          >
            SkyBridge Royal Passage
          </Link>
          <nav>
            <Link
              href="/services"
              style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}
            >
              Services
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

