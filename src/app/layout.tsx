import "./globals.scss";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { navMenus } from "@/data/navMenus";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devemtiaz.tech"),
  title: {
    default: "Emtiaz Ahmed | Top Flutter Developer in Bangladesh",
    template: "%s | Emtiaz Ahmed",
  },
  description:
    "Emtiaz Ahmed is a professional Flutter Developer from Bangladesh specializing in high-performance mobile apps, real-time systems, Firebase integration, WebRTC, and scalable architectures.",
  keywords: [
    "Emtiaz Ahmed",
    "Emtiaz Flutter Developer",
    "Top Flutter Developer in Bangladesh",
    "Best Flutter Developer Bangladesh",
    "Flutter Developer Dhaka",
    "Flutter Expert Bangladesh",
    "Mobile App Developer Bangladesh",
    "Firebase Developer",
    "Cross Platform App Developer",
  ],
  authors: [{ name: "Emtiaz Ahmed" }],
  creator: "Emtiaz Ahmed",
  publisher: "Emtiaz Ahmed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://devemtiaz.tech",
  },
  openGraph: {
    title: "Emtiaz Ahmed | Flutter Developer in Bangladesh",
    description:
      "Professional Flutter Developer building scalable, real-time, and high-performance mobile applications.",
    url: "https://devemtiaz.tech",
    siteName: "Emtiaz Ahmed Portfolio",
    images: [
      {
        url: "/og-image.png", // create 1200x630 image
        width: 1200,
        height: 630,
        alt: "Emtiaz Ahmed Flutter Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emtiaz Ahmed | Flutter Developer",
    description:
      "Top Flutter Developer in Bangladesh building scalable mobile applications.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const GoogleAnalytics = dynamic(
  () => import("@/components/common/GoogleAnalytics"),
  { ssr: false }
);
const WebVitals = dynamic(() => import("@/components/common/WebVitals"), {
  ssr: false,
});
const FloatingNavbar = dynamic(
  () => import("@/components/navbar/FloatingNavbar")
);
const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const isDebug = process.env.NODE_ENV === "development";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Emtiaz Ahmed",
              url: "https://devemtiaz.tech",
              jobTitle: "Flutter Developer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dhaka",
                addressCountry: "Bangladesh",
              },
              sameAs: [
                "https://github.com/emtiazahmedanik",
                "https://linkedin.com/in/emtiaz-ahmed-/",
              ],
            }),
          }}
        />
      </head>

      {isDebug ? null : <GoogleAnalytics />}

      <body className={isDebug ? "debug-screens" : ""}>
        {isDebug ? <WebVitals /> : null}
        <FloatingNavbar className="app_nav" navItems={navMenus} />
        <main>{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;