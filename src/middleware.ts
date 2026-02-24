import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ['en', 'id'];

// Create the standard internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/en/login'
    }
  }
);

export default function middleware(req: NextRequest) {
  // Check if the route is a dashboard route (e.g. /en/dashboard, /id/dashboard, or just /dashboard)
  const isDashboardRoute = new RegExp(`^(/(${locales.join('|')}))?/dashboard`).test(req.nextUrl.pathname);

  if (isDashboardRoute) {
    return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
