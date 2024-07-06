import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { capitalCase, titleCase } from 'text-case'
import { useGetUserProperty } from '../modules/store'

export default function WelcomingJumbotron() {
	const t = useTranslations('HOME')
	const { data } = useGetUserProperty()

	return (
		<div className="relative h-72">
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
				<h2 className="text-4xl font-bold">{data && titleCase(data.full_name)}</h2>
			</section>
		</div>
	)
}
