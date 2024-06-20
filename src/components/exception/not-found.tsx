'use client'
import { capitalCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import { Link } from '@/src/navigation'
import NotificationLayout from '../notification-layout'

export default function NotFound({ message }: { message?: string }) {
	const t = useTranslations('GENERAL.NOTFOUND')
	return (
		<NotificationLayout>
			<div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
				<section className="w-full lg:w-4/12">
					<section className="mb-10 mt-8 flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{'404 ' + capitalCase(t('TITLE'))}</h2>
						<p className={`text-lg text-white ${message ? 'block' : 'hidden'}`}>{message}</p>
					</section>
					<Link href="/">
						<Button className="w-9/12 py-4 text-lg font-semibold text-kalma-blue-500">
							{capitalCase(t('BUTTON'))}
						</Button>
					</Link>
				</section>
			</div>
		</NotificationLayout>
	)
}
