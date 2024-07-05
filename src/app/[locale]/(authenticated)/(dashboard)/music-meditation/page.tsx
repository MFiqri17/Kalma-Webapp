'use client'
import {
	Button,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
	Tooltip,
	Pagination
} from '@nextui-org/react'
import { FaRegEye, FaPlus } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { useCallback, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { capitalCase, sentenceCase } from 'text-case'
import { useQuery } from 'react-query'
import Image from 'next/image'
import CreateMusic from '@/src/components/music-meditation/createMusic'
import PreviewMusic from '@/src/components/music-meditation/previewMusic'
import { MusicDataResponse } from '@/src/modules/types/response/self-management'
import { getMusicData } from '@/src/modules/endpoints/self-management'
import DeleteMusic from '@/src/components/music-meditation/deleteMusic'
import { MusicMeditationTableColumn } from '@/src/modules/constant/static-data'
import useGetDataPayloadState from '@/src/modules/hooks'

type MusicData = {
	id: string
	title: string
	author: string
	genre: string
	music_link: string
	music_image: string
}

export default function MusicMeditation() {
	const createModal = useDisclosure()
	const previewModal = useDisclosure()
	const deleteModal = useDisclosure()
	const [dataPayload, setDataPayload] = useGetDataPayloadState({
		size: 1,
		page: 1,
		sort_value: 'asc',
		sort_column: 'name',
		search_value: '',
		search_column: '',
		filter_value: '',
		filter_column: ''
	})
	const [musicDataState, setMusicDataState] = useState({
		id: '',
		title: ''
	})
	const t = useTranslations('SELF_MANAGEMENT')
	const musicData = useQuery(['getMusicData', dataPayload], () => getMusicData(dataPayload))
	const currentSize = dataPayload.size ? dataPayload.size : 1

	const pages = useMemo(() => {
		return musicData.data?.size ? Math.ceil(musicData.data?.size / currentSize) : 0
	}, [dataPayload, musicData.data?.size, dataPayload.size])

	const renderCell = useCallback((music: MusicDataResponse, columnKey: React.Key) => {
		const cellValue = music[columnKey as keyof MusicData]
		switch (columnKey) {
			case 'title':
				return (
					<div className="flex items-center justify-start space-x-6">
						<Image src={music.music_image} width={100} height={50} alt={cellValue!} />
						<p className="text-kalma-black-600">{capitalCase(cellValue)}</p>
					</div>
				)
			case 'action':
				return (
					<div className="flex justify-end -space-x-6">
						<Tooltip content={sentenceCase(t('MUSIC.ACTION.PREVIEW'))}>
							<Button
								variant="light"
								onClick={() => {
									setMusicDataState({ id: music.id, title: music.title })
									previewModal.onOpenChange()
								}}
							>
								<FaRegEye className="text-lg" />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content={sentenceCase(t('MUSIC.ACTION.DELETE'))}>
							<Button
								variant="light"
								onClick={() => {
									setMusicDataState({ id: music.id, title: music.title })
									deleteModal.onOpenChange()
								}}
							>
								<MdDeleteOutline className="text-lg text-red-500" />
							</Button>
						</Tooltip>
					</div>
				)
			default:
				return <p className="text-kalma-black-600">{capitalCase(cellValue)}</p>
		}
	}, [])

	if (musicData.isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<CircularProgress classNames={{ label: 'text-semibold' }} label="Loading..." />
			</div>
		)

	return (
		<div className="mt-6 flex w-full flex-col">
			<CreateMusic isOpen={createModal.isOpen} onOpenChange={createModal.onOpenChange} />
			<PreviewMusic
				id={musicDataState.id}
				isOpen={previewModal.isOpen}
				onOpenChange={previewModal.onOpenChange}
			/>
			<DeleteMusic
				isOpen={deleteModal.isOpen}
				onOpenChange={deleteModal.onOpenChange}
				data={musicDataState}
			/>
			<div className="flex items-center justify-between px-4 pb-6">
				<h1 className="text-xl font-semibold text-kalma-black-900">
					{capitalCase(t('MUSIC.TITLE'))}
				</h1>
				<Button
					className="rounded-xl bg-[#2F9296] py-4 text-base font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
					startContent={<FaPlus />}
					onPress={createModal.onOpen}
				>
					{capitalCase(t('MUSIC.ACTION.CREATE'))}
				</Button>
			</div>
			<Table
				classNames={{
					wrapper: 'bg-white w-full max-h-[520px] overflow-y-scroll'
				}}
				bottomContent={
					pages > 0 ? (
						<div className="flex w-full justify-center">
							<Pagination
								isCompact
								showControls
								showShadow
								color="primary"
								page={dataPayload.page}
								total={pages}
								onChange={(page) => setDataPayload({ page: page })}
							/>
						</div>
					) : null
				}
				isStriped
				isHeaderSticky
			>
				<TableHeader>
					{MusicMeditationTableColumn.map((column) => (
						<TableColumn
							key={String(column.key)}
							className="bg-kalma-grey-200 text-base font-bold text-kalma-black-900"
						>
							{capitalCase(t(`MUSIC.COLUMN.${column.label_path}`))}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody emptyContent={'No rows to display.'} items={musicData.data?.data}>
					{(item) => (
						<TableRow key={item.id} className="text-base">
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
