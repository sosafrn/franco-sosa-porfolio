import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FRESS — Franco Sosa | Desarrollador Full Stack & Sistemas Web",
  description:
    "Portafolio técnico de Franco Sosa (FRESS). Desarrollo de aplicaciones web, sistemas de gestión y optimización de procesos para empresas y organismos.",
  keywords: [
    "Franco Sosa",
    "Franco Emiliano Sosa",
    "FRESS",
    "Desarrollador Full Stack",
    "Sistemas de Gestión",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Python",
    "MySQL",
    "n8n",
    "UTN",
    "Universidad Tecnológica Nacional",
    "Ingeniería en Sistemas UTN",
  ],
  authors: [{ name: "Franco Emiliano Sosa" }],
  creator: "Franco Emiliano Sosa",
};

export const viewport: Viewport = {
  themeColor: "#0A0C10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-background">
        {children}
      </body>
    </html>
  );
}
