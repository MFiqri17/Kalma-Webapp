'use client'
import {
	Button,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure
} from '@nextui-org/react'
import { FaEye, FaPlus } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'
import toast from 'react-hot-toast'
import Add from '@/src/components/music-meditation/add'
import { MusicDataResponse } from '@/src/modules/types/response/self-management'
import { api } from '@/src/modules/utils/api'

type MusicData = {
	id: string
	title: string
	author: string
	genre: string
}

export default function MusicMeditation() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const t = useTranslations('SELF_MANAGEMENT')
	const headCell = [
		{
			key: 'id',
			label: 'Id'
		},
		{
			key: 'title',
			label: 'Title'
		},
		{
			key: 'genre',
			label: 'Genre'
		},
		{
			key: 'author',
			label: 'Author'
		},
		{
			key: 'action',
			label: ''
		}
	]

	const [data, setData] = useState<MusicDataResponse[]>([])
	const [total, setTotal] = useState(0)
	const [page, setPage] = useState(1)
	const [rowsPerPage] = useState(6)

	const getMusicData = async () => {
		try {
			const response = await api.get('/self-management/music-meditation', {
				params: {
					size: rowsPerPage,
					page: page
				}
			})
			setData(response.data.data)
			setTotal(data.length)
			// eslint-disable-next-line no-console
			console.log(response.data)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching music data:', error)
		}
	}

	const deleteMusic = async (id: string) => {
		try {
			const response = await api.delete(`/article/${id}`)
			// eslint-disable-next-line no-console
			console.log(response.data)
			toast.success(t('WARNING.SUCCESS_DELETE'))
			getMusicData()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error delete article data:', error)
		}
	}

	useEffect(() => {
		getMusicData()
	}, [page])

	const pages = Math.ceil(total / rowsPerPage)

	const renderCell = useCallback((music: MusicDataResponse, columnKey: React.Key) => {
		const cellValue = music[columnKey as keyof MusicData]

		switch (columnKey) {
			case 'id':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'title':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'genre':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'author':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'action':
				return (
					<div className="relative flex items-center gap-x-4">
						<Tooltip content="Details">
							<Button
								isIconOnly
								className="cursor-pointer text-lg text-default-400 active:opacity-50"
							>
								<FaEye />
							</Button>
						</Tooltip>
						<Tooltip content="Edit user">
							<Button
								isIconOnly
								className="cursor-pointer text-lg text-default-400 active:opacity-50"
							>
								<MdEdit />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<Button
								isIconOnly
								className="cursor-pointer text-lg text-danger active:opacity-50"
								onClick={() => deleteMusic(music.id)}
							>
								<MdDelete />
							</Button>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<div className="mt-6 flex w-full flex-col pl-10">
			<Add isOpen={isOpen} onOpenChange={onOpenChange} />
			<div className="flex items-center justify-between pb-6">
				<h1 className="text-4xl text-kalma-black-900">Music List</h1>
				<Button
					className="rounded-xl bg-[#2F9296] py-4 text-lg font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
					startContent={<FaPlus />}
					onPress={onOpen}
				>
					{capitalCase(t('BUTTON_ACTION.ADD_MUSIC'))}
				</Button>
			</div>
			<Table
				bottomContent={
					<div className="mt-6 flex w-full justify-end">
						<Pagination
							showControls
							classNames={{
								wrapper: 'text-kalma-blue-600',
								item: '!bg-kalma-blue-600'
							}}
							page={page}
							total={pages}
							variant="light"
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
				classNames={{
					wrapper: 'bg-white',
					table: 'text-kalma-black-900 text-base bg-white'
				}}
			>
				<TableHeader>
					{headCell.map((column) => (
						<TableColumn
							key={String(column.key)}
							className="bg-kalma-grey-200 text-base font-bold text-kalma-black-900"
						>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody emptyContent={'No rows to display.'} items={data}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
