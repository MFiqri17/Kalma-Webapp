import Image from 'next/image'

export default function NotificationLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative h-screen">
			<Image
				fill
				priority
				alt="Notification Background Image"
				className="z-0"
				src="/notification_bg.svg"
				style={{
					objectFit: 'cover'
				}}
			/>
			{children}
		</div>
	)
}
