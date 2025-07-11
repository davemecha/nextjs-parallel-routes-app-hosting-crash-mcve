import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Next.js Parallel Route Crash MCVE',
  description: 'A minimal example to demonstrate a bug with Next.js parallel routes on Firebase App Hosting.',
};

export default function RootLayout({
  children,
  parallel,
}: Readonly<{
  children: React.ReactNode;
  parallel: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
          <main className="container mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-8 p-4 md:p-8">
            {children}
            {parallel}
          </main>
          <footer className="w-full p-4 text-center text-sm text-muted-foreground">
            <p>
              MCVE for Next.js bug{' '}
              <a
                href="https://github.com/vercel/next.js/issues/71626"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                #71626
              </a>
            </p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
