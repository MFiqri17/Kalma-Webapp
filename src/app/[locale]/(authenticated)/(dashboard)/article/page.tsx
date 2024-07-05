'use client'
import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip
} from '@nextui-org/react'
import { MdDelete } from 'react-icons/md'
import { useCallback } from 'react'
import { FaEye, FaPlus } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { ArticleDataResponse, ArticleResponse } from '@/src/modules/types/response/self-management'
import { api } from '@/src/modules/utils/api'
import { Link } from '@/src/navigation'
import { getArticleData } from '@/src/modules/endpoints/self-management'
import { ErrorResponse } from '@/src/modules/types/response/general'

type ArticleTableData = {
	id: string
	title: string
	created_by: string
	created_date: string
}

export default function Article() {
	const t = useTranslations('SELF_MANAGEMENT.ARTICLE')
	const u = useTranslations('SELF_MANAGEMENT')

	const headCell = [
		{
			key: 'title',
			label: 'Title'
		},
		{
			key: 'created_by',
			label: 'Created By'
		},
		{
			key: 'created_date',
			label: 'Created Date'
		},
		{
			key: 'action',
			label: ''
		}
	]

	const articleData = useQuery<ArticleResponse, AxiosError<ErrorResponse>>({
		queryKey: ['getUser'],
		queryFn: getArticleData
	})

	const deleteArticle = async (id: string) => {
		try {
			const response = await api.delete(`/article/${id}`)
			// eslint-disable-next-line no-console
			console.log(response.data)
			toast.success(t('WARNING.SUCCESS_DELETE'))
			getArticleData()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error delete article data:', error)
		}
	}

	const renderCell = useCallback((article: ArticleDataResponse, columnKey: React.Key) => {
		const cellValue = article[columnKey as keyof ArticleTableData]

		switch (columnKey) {
			case 'title':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'created_by':
				return <p className="text-sm text-kalma-black-600">{cellValue}</p>

			case 'created_date':
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
						<Tooltip color="danger" content="Delete">
							<Button
								isIconOnly
								className="cursor-pointer text-lg text-danger active:opacity-50"
								onClick={() => deleteArticle(article.id)}
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

	const articleItems = Array.isArray(articleData.data?.data) ? articleData.data.data : []

	return (
		<div className="flex flex-col p-6">
			<div className="flex items-center justify-between pb-6">
				<h1 className="mb-6 text-2xl text-kalma-black-600">{capitalCase(t('TITLE'))}</h1>
				<Button
					className="rounded-xl bg-[#2F9296] py-4 text-lg font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
					startContent={<FaPlus />}
				>
					<Link href="/article/add">{capitalCase(u('BUTTON_ACTION.ADD_ARTICLE'))}</Link>
				</Button>
			</div>
			<Table
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
				<TableBody emptyContent={'No rows to display.'} items={articleItems}>
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
