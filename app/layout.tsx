import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    email: SITE.email,
    url: SITE.seo.siteUrl,
    sameAs: [SITE.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK"
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
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
