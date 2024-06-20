import { capitalCase } from 'text-case'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button, Link } from '@nextui-org/react'
import NotificationLayout from '../notification-layout'

export default function VerifiedEmail({ message }: { message: string }) {
	const t = useTranslations('GENERAL.VERIFYEMAIL')
	return (
		<NotificationLayout>
			<div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
				<Image src="/success_variant1.svg" alt="Success Variant 1" width={148} height={148} />
				<section className="w-full lg:w-3/12">
					<section className="mb-10 mt-8 flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{capitalCase(t('TITLE')) + '!'}</h2>
						<p className="text-lg text-white">{message}</p>
					</section>

					<Link href="/">
						<Button className="w-9/12 rounded-xl bg-white text-lg font-semibold text-kalma-blue-500">
							{capitalCase(t('BUTTON'))}
						</Button>
					</Link>
				</section>
			</div>
		</NotificationLayout>
	)
}
