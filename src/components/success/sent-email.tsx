import { capitalCase } from 'text-case'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import NotificationLayout from '../notification-layout'

export default function SentEmail({ message }: { message: string }) {
	const t = useTranslations('GENERAL.EMAILISNOTVERIFIED')
	return (
		<NotificationLayout>
			<div className="relative z-10 flex h-screen flex-col items-center justify-center text-center">
				<Image src="/success_variant1.svg" alt="Success Variant 1" width={148} height={148} />
				<section className="w-3/12">
					<section className="mb-10 mt-8 flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white">{capitalCase(t('CONGRATS')) + '!'}</h2>
						<p className="text-lg text-white">{message}</p>
					</section>
				</section>
			</div>
		</NotificationLayout>
	)
}
