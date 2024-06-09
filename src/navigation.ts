import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales, localePrefix } from './modules/config/i18n'

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
	locales,
	localePrefix
})
