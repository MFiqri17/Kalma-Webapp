import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { sentenceCase } from 'text-case'
import { Button } from '@nextui-org/react'

export default function ComingSoon() {
	const t = useTranslations('GENERAL.NOTFOUND')
	return (
		<div className="relative !h-[570px]">
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
			<section className="jusify-center relative z-10 flex flex-col items-center space-y-8 pt-52 text-kalma-grey-100">
				<h4 className="text-5xl font-bold">Coming Soon</h4>
				<Link href="/">
					<Button className="bg-white text-lg text-kalma-blue-500">
						{sentenceCase(t('BUTTON'))}
					</Button>
				</Link>
			</section>
		</div>
	)
}
