'server-only'

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { type AbstractIntlMessages } from 'next-intl'

export const locales = ['en', 'id'] as const
export const localePrefix = 'always'
export type Locale = (typeof locales)[number]

const messageImports = {
	en: () => import('../../../public/locales/en.json'),
	id: () => import('../../../public/locales/id.json')
} as const satisfies Record<Locale, () => Promise<{ default: AbstractIntlMessages }>>

export const isValidLocale = (locale: unknown): locale is Locale =>
	locales.some((l) => l === locale)

export default getRequestConfig(async (params) => {
	const baseLocale = new Intl.Locale(params.locale).baseName

	if (!isValidLocale(baseLocale)) notFound()

	const messages = (await messageImports[baseLocale]()).default

	return {
		messages
	}
})
