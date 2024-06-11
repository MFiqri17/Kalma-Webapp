'use client'
import {
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import { useMemo, useState } from 'react'

interface HeadCell<T> {
	key: keyof T
	label: string
}

interface TableInterface<T> {
	data: T[]
	columns: HeadCell<T>[]
}

export default function TableList<T>({ data, columns }: TableInterface<T>) {
	const [page, setPage] = useState(1)
	const rowsPerPage = 10
	const pages = Math.ceil(data.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return data.slice(start, end)
	}, [page, data])

	return (
		<Table
			bottomContent={
				<div className="mt-6 flex w-full justify-end">
					<Pagination
						showControls
						classNames={{
							wrapper: 'bg-kalma-green-600',
							item: 'bg-kalma-green-600'
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
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={String(column.key)}
						className="bg-kalma-grey-200 text-base font-bold text-kalma-black-900"
					>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'No rows to display.'}>
				{items.map((item, index) => (
					<TableRow key={index}>
						{columns.map((column) => (
							<TableCell key={String(column.key)}>{String(item[column.key])}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
