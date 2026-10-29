import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";
import PageTransitionProvider from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import { CONTACT_EMAIL, SITE_AUTHOR, SITE_BRAND, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

// Runs before paint so the saved/system theme is applied without a flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_AUTHOR} (${SITE_BRAND})`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_BRAND,
  keywords: [
    "Azka Zufar Hanif",
    "Azka Hanif",
    "AZH",
    "azuha",
    "Full Stack Developer",
    "Full Stack Developer Indonesia",
    "Frontend Engineer",
    "Backend Engineer",
    "Web Developer Indonesia",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "TypeScript",
    "Vue.js",
    "Node.js",
    "Supabase",
    "REST API",
    "Internal Business Systems",
    "Portfolio",
  ],
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${SITE_AUTHOR} (${SITE_BRAND})`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

// Structured data so search engines can show a rich result for the person and site
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${SITE_AUTHOR} (${SITE_BRAND})`,
      alternateName: SITE_BRAND,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_AUTHOR,
      alternateName: ["Azka Hanif", SITE_BRAND],
      url: SITE_URL,
      image: `${SITE_URL}/images/profile.png`,
      email: `mailto:${CONTACT_EMAIL}`,
      jobTitle: "Full Stack Developer",
      worksFor: { "@type": "Organization", name: "PT Pratama Abadi Industri" },
      nationality: { "@type": "Country", name: "Indonesia" },
      knowsAbout: ["React", "Next.js", "TypeScript", "Laravel", "Vue.js", "Node.js", "SQL", "Supabase", "REST API"],
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Only the Japanese & Korean glyphs used by the preloader greeting */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout, so it loads on every page */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&family=Noto+Sans+KR:wght@700&display=swap&text=%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%ED%99%98%EC%98%81%ED%95%A9%EB%8B%88%EB%8B%A4"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageTransitionProvider>
          <LenisWrapper>
            <CustomCursor />
            {children}
          </LenisWrapper>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
