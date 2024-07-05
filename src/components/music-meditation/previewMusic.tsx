import { ModalBody, CircularProgress } from '@nextui-org/react'
import { useQuery } from 'react-query'
import { capitalCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { getMusicDataDetail } from '@/src/modules/endpoints/self-management'
import AudioPlayerComponent from './static/audioPlayer'
import MusicFormModal from './static/musicFormModal'

export default function PreviewMusic({
	isOpen,
	onOpenChange,
	id
}: {
	isOpen: boolean
	onOpenChange: (value: boolean) => void
	id: string
}) {
	const t = useTranslations('SELF_MANAGEMENT.MUSIC')
	const musicDetailData = useQuery(['getMusicDetail', id], () => getMusicDataDetail(id))
	return (
		<MusicFormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			actionText={capitalCase(t('ACTION.PREVIEW'))}
		>
			<ModalBody>
				{musicDetailData.isLoading ? (
					<div className="flex h-full items-center justify-center">
						<CircularProgress classNames={{ label: 'text-semibold' }} label="Loading..." />
					</div>
				) : (
					<>
						<section className="mb-4 flex flex-col space-y-2">
							<h1 className="text-base font-semibold text-kalma-blue-500">
								{`${capitalCase(String(musicDetailData.data?.data.title))} (${capitalCase(String(musicDetailData.data?.data.genre))})`}
							</h1>
							<h2 className="text-base text-kalma-blue-500">{musicDetailData.data?.data.author}</h2>
						</section>
						<AudioPlayerComponent music_link={musicDetailData.data!.data.music_link} />
					</>
				)}
			</ModalBody>
		</MusicFormModal>
	)
}
