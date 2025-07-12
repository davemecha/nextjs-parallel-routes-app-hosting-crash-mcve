import createMiddleware from 'next-intl/middleware';

import { defineRouting } from 'next-intl/routing';

export default createMiddleware(defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',
}));

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|favicon.ico|.*\\..*).*)',
};
