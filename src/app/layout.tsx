import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SatinBackground from "@/components/SatinBackground";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://cold-maison.com"),
  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s – ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body id="top">
        <SatinBackground />
        <div className="sidelight" aria-hidden="true" />
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
