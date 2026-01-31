import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://btraffic.com'),
    title: "Btraffic | Fábrica de Activos Digitales",
    description: "Transformamos negocios en activos financieros mediante IA profunda y automatización. Sin dato no hay relato.",
    keywords: ["IA", "Automatización", "n8n", "Ecosistemas Digitales", "ROI", "B-OS"],
    authors: [{ name: "Btraffic" }],
    openGraph: {
        title: "Btraffic | Digital Asset Factory",
        description: "Transformamos negocios en activos financieros.",
        url: "https://btraffic.com",
        siteName: "Btraffic",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "es_ES",
        type: "website",
    },
};

import NavbarWrapper from "@/components/layout/NavbarWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
                {/* Protocolo B-OS: Tracking Forense n8n */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(n,8,n){
                window.n8n_tracker = {
                  webhook: 'https://n8n.btraffic.com/webhook/analytics-web',
                  project: 'Btraffic-Agency-V2'
                };
              })();
            `}}
                />
            </head>
            <body className="bg-btraffic-dark overflow-x-hidden antialiased">
                <NavbarWrapper />
                {children}
            </body>
        </html>
    );
}
