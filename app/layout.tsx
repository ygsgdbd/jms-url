import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { IntlProviderWrapper } from '@/components/intl-provider';
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Script from "next/script";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export const metadata: Metadata = {
  title: 'JMS URL - JustMySocks 订阅链接微调工具',
  description: '快速微调你的 JustMySocks 订阅链接，轻松排除不需要的节点或协议',
  keywords: ['JustMySocks', 'subscription', 'link', 'tweaker', 'jmsurl', 'jms', 'url'],
  authors: [{ name: 'ygsgdbd', url: 'https://github.com/ygsgdbd' }],
  creator: 'ygsgdbd',
  publisher: 'ygsgdbd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jmsurl.top'),
  openGraph: {
    title: 'JMS URL - JustMySocks 订阅链接微调工具',
    description: '快速微调你的 JustMySocks 订阅链接，轻松排除不需要的节点或协议',
    url: 'https://jmsurl.top',
    siteName: 'JMS URL',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JMS URL - JustMySocks 订阅链接微调工具',
    description: '快速微调你的 JustMySocks 订阅链接，轻松排除不需要的节点或协议',
    images: ['https://jmsurl.top/og-image.png'],
    creator: '@ygsgdbd',
    site: '@jmsurl',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
  },
  alternates: {
    canonical: 'https://jmsurl.top',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',  // SVG favicon
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',  // 也使用 SVG
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="zh" suppressHydrationWarning>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6655068558450325"
              crossOrigin="anonymous"></Script>
      <body className={ibmPlexMono.className}>
      <IntlProviderWrapper>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              <div className="relative flex min-h-screen flex-col">
                  <NavBar/>
                  <main className="flex-1">{children}</main>
                  <Footer/>
              </div>
              <Toaster/>
          </ThemeProvider>
      </IntlProviderWrapper>
      </body>
      </html>
  );
}
