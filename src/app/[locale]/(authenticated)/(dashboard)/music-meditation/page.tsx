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
import { useCallback, useMemo, useState } from 'react'
import Add from '@/src/components/music-meditation/add'

type MusicData = {
	id: string
	title: string
	author: string
	genre: string
}

export default function MusicMeditation() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
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

	const dataExample = [
		{
			id: '1',
			title: 'Piano Quartet Piazzo',
			genre: 'Instrumental',
			author: 'Mozart'
		},
		{
			id: '2',
			title: 'Nature Voice - Rain Forest Calming Sound',
			genre: 'Nature',
			author: 'Nature Amazing Sound'
		},
		{
			id: '3',
			title: 'Nature Sound of Thunder Rain at Night',
			genre: 'Nature',
			author: 'Nature Amazing Sound'
		},
		{
			id: '4',
			title: 'Chopin Nocturne Op. 9 No. 2',
			genre: 'Instrumental',
			author: 'Francisco Tárrega'
		},
		{
			id: '5',
			title: 'ONE',
			genre: 'Instrumental',
			author: 'DEPAPEPE'
		},
		{
			id: '6',
			title: 'Wedding Bell',
			genre: 'Instrumental',
			author: 'DEPAPEPE'
		},
		{
			id: '7',
			title: 'Bird Sound in the Morning',
			genre: 'Nature',
			author: 'Nature Amazing Sound'
		}
	]

	const [page, setPage] = useState(1)
	const rowsPerPage = 10
	const pages = Math.ceil(dataExample.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return dataExample.slice(start, end)
	}, [page, dataExample])

	const renderCell = useCallback((music: MusicData, columnKey: React.Key) => {
		const cellValue = music[columnKey as keyof MusicData]

		switch (columnKey) {
			case 'id':
				return <p className="text-xs text-kalma-black-600">{cellValue}</p>

			case 'title':
				return <p className="text-xs text-kalma-black-600">{cellValue}</p>

			case 'genre':
				return <p className="text-xs text-kalma-black-600">{cellValue}</p>

			case 'author':
				return <p className="text-xs text-kalma-black-600">{cellValue}</p>

			case 'action':
				return (
					<div className="relative flex items-center gap-x-4">
						<Tooltip content="Details">
							<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
								<FaEye />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
								<MdEdit />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="cursor-pointer text-lg text-danger active:opacity-50">
								<MdDelete />
							</span>
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
					Add Music
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
				<TableBody emptyContent={'No rows to display.'} items={items}>
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
