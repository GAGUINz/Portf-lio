import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luciano Friedrich | Desenvolvedor Full Stack",
  description: "Desenvolvedor focado em Node.js, Python, C++, AWS, IoT e sistemas de alta performance.",
  keywords: ["Desenvolvedor Full Stack", "Engenheiro de Software", "Node.js", "Python", "AWS", "IoT", "Sistemas de Alta Performance", "Automação", "Luciano Friedrich"],
  authors: [{ name: "Luciano Friedrich" }],
  openGraph: {
    title: "Luciano Friedrich | Desenvolvedor Full Stack",
    description: "Desenvolvedor focado em Node.js, Python, C++, AWS, IoT e sistemas de alta performance. Transformando lógicas complexas em plataformas escaláveis e seguras.",
    url: "https://lucianofriedrich.com.br", // Ajuste para o domínio real futuro
    siteName: "Luciano Friedrich - Portfólio",
    images: [
      {
        url: "/minha-foto.jpg", 
        width: 1200,
        height: 630,
        alt: "Luciano Friedrich",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luciano Friedrich | Desenvolvedor Full Stack",
    description: "Desenvolvedor focado em Node.js, Python, C++, AWS, IoT e sistemas de alta performance.",
    images: ["/minha-foto.jpg"],
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=5', type: 'image/svg+xml' }
    ],
    shortcut: [
      { url: '/icon.svg?v=5', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg?v=5', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
