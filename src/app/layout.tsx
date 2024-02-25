import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/shared/store/ReduxProvider';
import { RemResizeScript } from '@/features/rem-resize';

export const metadata: Metadata = {
  title: 'Next.js Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, et',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function RootLayout({ children, ...rest }: RootLayoutProps) {
  return (
    <html lang="ru">
      <head>
        <RemResizeScript
          defaultFontSize={10}
          startScaleWidth={1440}
          endScaleTopWidth={1920}
          endScaleBottomWidth={1024}
        />
      </head>
      <body>
        <ReduxProvider {...rest}>
          <div id="app">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
