import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE, RESUME } from "@/lib/content";
import { ResumeGateProvider } from "@/components/ResumeGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.seo.siteUrl.replace(/\/$/, "")),
  title: {
    default: SITE.seo.title,
    template: `%s · ${SITE.name}`
  },
  description: SITE.seo.description,
  openGraph: {
    title: SITE.seo.title,
    description: SITE.seo.description,
    url: SITE.seo.siteUrl,
    siteName: SITE.name,
    images: [{ url: "/og", width: 1200, height: 630, alt: `${SITE.name} — Portfolio` }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seo.title,
    description: SITE.seo.description,
    images: ["/og"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { basics } = RESUME;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: basics.name,
    jobTitle: basics.label,
    email: basics.email,
    url: SITE.seo.siteUrl,
    sameAs: basics.profiles.map((p) => p.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: basics.location.city,
      addressCountry: basics.location.countryCode
    }
  };

  // Applies the stored/OS theme before first paint to avoid a flash of light theme.
  const themeInit = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ResumeGateProvider>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </ResumeGateProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
