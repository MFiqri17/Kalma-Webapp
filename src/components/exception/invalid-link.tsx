'use client'
import { MdNoAccounts } from 'react-icons/md'
import { capitalCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import { Link } from '@/src/navigation'
import NotificationLayout from '../notification-layout'

export default function InvalidLink({
	message,
	type
}: {
	message: string
	type: 'email' | 'password'
}) {
	const t = useTranslations('GENERAL.INVALIDLINK')
	return (
		<NotificationLayout>
			<div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
				<MdNoAccounts className="fill-white text-9xl" />
				<section className="w-full lg:w-4/12">
					<section className="mb-10 mt-8 flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{capitalCase(t('TITLE'))}</h2>
						<p className="text-lg text-white">{message}</p>
					</section>
					<Link href={type === 'email' ? '/send-email-verification' : '/forgot-password'}>
						<Button className="w-9/12 py-4 text-lg font-semibold text-kalma-blue-500">
							{type === 'email' ? capitalCase(t('BUTTON1')) : capitalCase(t('BUTTON2'))}
						</Button>
					</Link>
				</section>
			</div>
		</NotificationLayout>
	)
}
