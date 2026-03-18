import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { NavigationProgress } from "@/components/nprogress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteName = "VamoAgendar";
const siteTitle = "VamoAgendar | Agendamento online";
const siteDescription =
  "Sistema de agendamento online para profissionais, clínicas e empresas. Simples, rápido e profissional.";
const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.vamoagendar.com.br";

const domainVerificationMeta: Record<string, string> = {};
if (process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION) {
  domainVerificationMeta["facebook-domain-verification"] =
    process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_TIKTOK_DOMAIN_VERIFICATION) {
  domainVerificationMeta["tiktok-domain-verification"] =
    process.env.NEXT_PUBLIC_TIKTOK_DOMAIN_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_TABOOLA_VERIFICATION) {
  domainVerificationMeta["taboola-site-verification"] =
    process.env.NEXT_PUBLIC_TABOOLA_VERIFICATION;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "agendamento online",
    "sistema de agendamento",
    "agenda para clínicas",
    "agenda para profissionais",
    "software para empresas",
    "marcação de consultas",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "VamoAgendar - Agendamento online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpeg"],
  },
  other: domainVerificationMeta,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
