'use client'

import Image from 'next/image'

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative h-screen">
			<Image
				fill
				priority
				alt="Jumbotron Background Image"
				className="z-0"
				src="/bg_webapp_kalma.svg"
				style={{
					objectFit: 'cover'
				}}
			/>
			<div className="flex h-screen items-center justify-center">
				<div className="z-10 flex max-h-700 w-500 flex-col justify-center rounded-3xl bg-kalma-grey-500 p-12">
					{children}
				</div>
			</div>
		</div>
	)
}
