import createMiddleware from 'next-intl/middleware'
import { type NextRequest, type NextResponse } from 'next/server'
import { type Locale, locales, localePrefix } from './modules/config/i18n'

const nextIntlMiddleware = createMiddleware({
	locales,
	defaultLocale: 'id' satisfies Locale,
	localePrefix: localePrefix
})

export default function middleware(req: NextRequest): NextResponse {
	return nextIntlMiddleware(req)
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
