import '../../styles/globals.css'
import { Metadata, Viewport } from 'next'
import { getMessages } from 'next-intl/server'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { siteConfig } from '@/src/modules/config/site'
import { fontGilroy } from '@/src/modules/config/fonts'
import { Locale } from '@/src/modules/config/i18n'
import { Providers } from '../providers'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: {
		icon: '/White_Kalma_Logo.svg'
	}
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	]
}

export default async function LocaleLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { locale: Locale }
}) {
	const locale = params.locale
	const messages = await getMessages()

	return (
		<html suppressHydrationWarning lang={locale}>
			<head />
			<body
				className={clsx('min-h-screen bg-background font-sans antialiased', fontGilroy.className)}
			>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
					<div className="relative flex h-screen flex-col">
						<main className="mx-auto w-full flex-grow">
							<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
