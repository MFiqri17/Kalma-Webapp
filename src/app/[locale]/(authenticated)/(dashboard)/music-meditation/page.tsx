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
	Card
} from '@nextui-org/react'
import { FaRegEye } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import { capitalCase, sentenceCase } from 'text-case'
import { useQuery } from 'react-query'
import Image from 'next/image'
import CreateMusic from '@/src/components/music-meditation/createMusic'
import PreviewMusic from '@/src/components/music-meditation/previewMusic'
import { MusicDataResponse } from '@/src/modules/types/response/self-management'
import { getMusicData } from '@/src/modules/endpoints/self-management'
import DeleteMusic from '@/src/components/music-meditation/deleteMusic'
import { MusicFilter, MusicMeditationTableColumn } from '@/src/modules/constant/static-data'
import useGetDataPayloadState from '@/src/modules/hooks'
import CustomPagination from '@/src/components/table/customPagination'
import CustomToolbar from '@/src/components/table/customToolbar'

export default function MusicMeditation() {
	const createModal = useDisclosure()
	const previewModal = useDisclosure()
	const deleteModal = useDisclosure()
	const [dataPayload, setDataPayload] = useGetDataPayloadState({
		size: 3,
		page: 1
	})
	const [musicDataState, setMusicDataState] = useState({
		id: '',
		title: ''
	})
	const t = useTranslations('SELF_MANAGEMENT.MUSIC')
	const musicData = useQuery(['getMusic', dataPayload], () => getMusicData(dataPayload))

	const renderCell = useCallback((music: MusicDataResponse, columnKey: React.Key) => {
		const cellValue = music[columnKey as keyof MusicDataResponse]
		switch (columnKey) {
			case 'title':
				return (
					<div className="block text-left md:flex md:flex-row md:items-center md:justify-start md:space-x-6">
						<Image
							className="hidden md:block"
							src={music.music_image}
							width={100}
							height={50}
							alt={cellValue!}
						/>
						<p className="truncate text-left text-kalma-black-600">{capitalCase(cellValue)}</p>
					</div>
				)
			case 'action':
				return (
					<div className="flex justify-end">
						<Tooltip content={sentenceCase(t('ACTION.PREVIEW'))}>
							<Button
								className="!w-7"
								variant="light"
								size="sm"
								onClick={() => {
									setMusicDataState({ id: music.id, title: music.title })
									previewModal.onOpenChange()
								}}
							>
								<FaRegEye className="text-base" />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content={sentenceCase(t('ACTION.DELETE'))}>
							<Button
								className="!w-7"
								variant="light"
								size="sm"
								onClick={() => {
									setMusicDataState({ id: music.id, title: music.title })
									deleteModal.onOpenChange()
								}}
							>
								<MdDeleteOutline className="text-base text-red-500" />
							</Button>
						</Tooltip>
					</div>
				)
			default:
				return <p className="text-kalma-black-600">{capitalCase(cellValue)}</p>
		}
	}, [])

	return (
		<div>
			<CreateMusic isOpen={createModal.isOpen} onOpenChange={createModal.onOpenChange} />
			{musicDataState.id !== '' && previewModal.isOpen && (
				<PreviewMusic
					id={musicDataState.id}
					isOpen={previewModal.isOpen}
					onOpenChange={previewModal.onOpenChange}
				/>
			)}
			<DeleteMusic
				isOpen={deleteModal.isOpen}
				onOpenChange={deleteModal.onOpenChange}
				data={musicDataState}
			/>

			<h1 className="mb-6 text-xl font-semibold text-kalma-black-900 2xl:ml-4">
				{capitalCase(t('TITLE'))}
			</h1>
			<Card
				className={
					'relative flex h-full w-full overflow-x-auto rounded-xl bg-white p-4 shadow-sm drop-shadow-md md:p-6 xl:rounded-3xl'
				}
			>
				<CustomToolbar
					filterValue={MusicFilter}
					dataPayload={dataPayload}
					setDataPayload={setDataPayload}
					searchPlaceholder={t('ACTION.SEARCH')}
					createText={t('ACTION.CREATE')}
					onCreate={createModal.onOpen}
				/>
				{musicData.isLoading || musicData.isFetching ? (
					<div className="mt-10 flex w-full justify-center">
						<CircularProgress classNames={{ label: 'text-semibold' }} label="Loading..." />
					</div>
				) : (
					<section>
						<Table
							classNames={{
								base: 'my-5'
							}}
							isStriped
							isHeaderSticky
						>
							<TableHeader>
								{MusicMeditationTableColumn.map((column) => (
									<TableColumn
										key={String(column.key)}
										className="bg-kalma-grey-200 text-base font-bold text-kalma-black-900"
									>
										{capitalCase(t(`COLUMN.${column.label_path}`))}
									</TableColumn>
								))}
							</TableHeader>
							<TableBody
								isLoading={musicData.isLoading || musicData.isFetching}
								emptyContent={'No rows to display.'}
								items={musicData.data?.data}
							>
								{(item) => (
									<TableRow key={item.id} className="text-sm md:text-base">
										{(columnKey) => <TableCell> {renderCell(item, columnKey)}</TableCell>}
									</TableRow>
								)}
							</TableBody>
						</Table>
						{musicData.data && musicData?.data?.total_pages > 0 ? (
							<CustomPagination
								totalData={musicData.data.total_items}
								totalPages={musicData?.data?.total_pages}
								dataPayload={dataPayload}
								setDataPayload={setDataPayload}
							/>
						) : null}
					</section>
				)}
			</Card>
		</div>
	)
}
