import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";
import PageTransitionProvider from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

// Runs before paint so the saved/system theme is applied without a flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azka Zufar Hanif | Creative Full Stack Developer & Designer",
  keywords: [
    "Azka Zufar Hanif",
    "Full Stack Developer",
    "Designer",
    "Portfolio",
    "Web Developer",
    "UI/UX Designer",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "TypeScript",
    "Software Engineer",
    "Web Design",
    "Web Development",
    "GSAP Animation"
  ],
  authors: [{ name: "Azka Zufar Hanif", url: "https://azka.dev" }],
  creator: "Azka Zufar Hanif",
  openGraph: {
    title: "Azka Zufar Hanif | Creative Full Stack Developer & Designer",
    description: "Azka Zufar Hanif is a Full Stack Developer and Designer specializing in creating modern web applications.",
    url: "https://azka.dev",
    siteName: "Azka Zufar Hanif | Creative Full Stack Developer & Designer",
  },
  description: "Azka Zufar Hanif is a Full Stack Developer and Designer specializing in creating modern web applications.",
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
