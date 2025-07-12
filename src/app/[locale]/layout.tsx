import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Parallel Route Crash MCVE',
  description: 'A minimal example to demonstrate a bug with Next.js parallel routes on Firebase App Hosting.',
};

export function generateStaticParams() {
  return ['en', 'de'].map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
  parallel,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  parallel: React.ReactNode;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={{}}>
          <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
            <main className="container mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-8 p-4 md:p-8">
              {children}
              {parallel}
            </main>
            <footer className="w-full p-4 text-center text-sm text-muted-foreground">
              <p>
                MCVE for next-intl bug{' '}
                <a href="https://github.com/amannn/next-intl/issues/255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  amannn/next-intl#255

                </a>
              </p>
              <p>
                Code for repo on <a href="https://github.com/davemecha/nextjs-parallel-routes-crash-mcve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >GitHub</a>
              </p>
            </footer>
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
