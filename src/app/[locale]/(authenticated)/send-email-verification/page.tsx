'use client'
import { MdOutlineEmail } from 'react-icons/md'
import { capitalCase, sentenceCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import NotificationLayout from '@/src/components/notification-layout'

export default function SendEmailVerification() {
	const t = useTranslations('GENERAL.EMAILISNOTVERIFIED')
	return (
		<NotificationLayout>
			<div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
				<MdOutlineEmail className="fill-white text-9xl" />
				<section className="w-full px-4 lg:w-3/12 lg:px-0">
					<section className="mb-10 mt-8 flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{capitalCase(t('TITLE'))}</h2>
						<p className="text-lg text-white">{sentenceCase(t('SUBTITLE'))}</p>
					</section>
					<Button className="w-full py-4 text-lg font-semibold text-kalma-blue-500 lg:w-9/12">
						{capitalCase(t('BUTTON'))}
					</Button>
				</section>
			</div>
		</NotificationLayout>
	)
}
