import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'

const MusicCard = ({
	category,
	author,
	title
}: {
	category: string
	author: string
	title: string
}) => {
	return (
		<Card isBlurred shadow="sm">
			<CardBody>
				<div className="flex flex-row space-x-7">
					<Image
						alt="gambar album lagu"
						height={80}
						src="/testing-music-album.jpg"
						style={{
							objectFit: 'cover'
						}}
						width={80}
					/>
					<div className="flex flex-col gap-0">
						<h3 className="font-semibold text-foreground/90">{category}</h3>
						<p className="text-small text-foreground/80">{author}</p>
						<h1 className="mt-2 text-large font-medium">{title}</h1>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default MusicCard
