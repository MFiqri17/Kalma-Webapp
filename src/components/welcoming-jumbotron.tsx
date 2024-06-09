import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'

export default function WelcomingJumbotron({ userName }: { userName: string }) {
	const t = useTranslations('HOME')

	return (
		<div className="relative mt-5 h-72">
			<Image
				fill
				priority
				alt="Jumbotron Background Image"
				className="z-0 rounded-md"
				src="/Welcoming_Jumbotron.svg"
				style={{
					objectFit: 'cover'
				}}
			/>
			<section className="relative z-10 flex flex-col space-y-2 pl-8 pt-16 text-kalma-grey-100">
				<h4 className="text-base font-medium">{`${capitalCase(t('WELCOME'))},`}</h4>
				<h2 className="text-4xl font-bold">{userName}</h2>
			</section>
		</div>
	)
}
