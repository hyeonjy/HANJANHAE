import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Script from 'next/script';

import BottomNavBar from '@/components/common/BottomNavBar';
import KakaoInit from '@/components/common/KakaoInit';
import ScrollTop from '@/components/common/ScrollTop';
import Header from '@/components/layout/Header';
import '@/styles/globals.css';

import { Providers } from './providers';
import { RegisterServiceWorker } from './RegisterServiceWorker';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true,
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hanjanhae-sepia.vercel.app'),
  title: '한잔해',
  description: 'AI 추천 기반 전통주를 만나보세요!',
  icons: {
    icon: '/assets/icons/favicon.svg',
  },
  openGraph: {
    title: '한잔해',
    description: 'AI 추천 기반 전통주를 만나보세요!',
    images: [
      {
        url: '/assets/og_image.png',
        width: 1200,
        height: 630,
        alt: '한잔해 썸네일',
      },
    ],
  },
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    title: '한잔해',
    statusBarStyle: 'default',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="lazyOnload"
        />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${pretendard.variable} font-sans text-grayscale-900 antialiased xl:flex xl:h-screen xl:flex-col`}
      >
        <Providers>
          <KakaoInit />
          <Header />
          <main className="m-auto mb-32 w-full max-w-[600px] xl:mt-[102px] xl:max-w-none xl:flex-1">
            {children}
          </main>
          <RegisterServiceWorker />
          <Footer />
          <ScrollTop />
          <BottomNavBar />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
