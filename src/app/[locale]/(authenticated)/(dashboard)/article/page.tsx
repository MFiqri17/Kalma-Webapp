'use client'
import { useTranslations } from 'next-intl'
import { capitalCase, sentenceCase } from 'text-case'
import {
	Button,
	Card,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip
} from '@nextui-org/react'
import { MdDeleteOutline } from 'react-icons/md'
import { useCallback } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { useQuery } from 'react-query'
import Image from 'next/image'
import { ArticleDataResponse } from '@/src/modules/types/response/self-management'
import { getArticleData } from '@/src/modules/endpoints/self-management'
import useGetDataPayloadState from '@/src/modules/hooks'
import { ArticleFilter, ArticleTableColumn } from '@/src/modules/constant/static-data'
import CustomPagination from '@/src/components/table/customPagination'
import CustomToolbar from '@/src/components/table/customToolbar'
import { useRouter } from '@/src/navigation'

export default function Article() {
	const t = useTranslations('SELF_MANAGEMENT.ARTICLE')
	const router = useRouter()
	const [dataPayload, setDataPayload] = useGetDataPayloadState({
		size: 3,
		page: 1
	})
	const articleData = useQuery(['getArticle', dataPayload], () => getArticleData(dataPayload))

	const renderCell = useCallback((article: ArticleDataResponse, columnKey: React.Key) => {
		const cellValue = article[columnKey as keyof ArticleDataResponse]

		switch (columnKey) {
			case 'title':
				return (
					<div className="block text-left md:flex md:flex-row md:items-center md:justify-start md:space-x-6">
						<Image
							className="hidden md:block"
							src={article.image ?? '/no_image.png'}
							width={100}
							height={50}
							alt={String(cellValue)}
						/>
						<p className="truncate text-left text-kalma-black-600">
							{capitalCase(String(cellValue))}
						</p>
					</div>
				)

			case 'article_type':
				return <p className="text-kalma-black-600">{article.article_type.join(', ')}</p>

			case 'action':
				return (
					<div className="flex justify-end -space-x-6">
						<Tooltip content={sentenceCase(t('ACTION.PREVIEW'))}>
							<Button variant="light">
								<FaRegEye className="text-base" />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content={sentenceCase(t('ACTION.DELETE'))}>
							<Button variant="light">
								<MdDeleteOutline className="text-base text-red-500" />
							</Button>
						</Tooltip>
					</div>
				)
			default:
				return <p className="text-kalma-black-600">{capitalCase(String(cellValue))}</p>
		}
	}, [])

	return (
		<div className="flex flex-col">
			<h1 className="mb-6 ml-4 text-xl font-semibold text-kalma-black-900">
				{capitalCase(t('TITLE'))}
			</h1>
			<Card
				className={
					'flex h-full rounded-xl bg-white p-4 shadow-sm drop-shadow-md md:p-6 xl:rounded-3xl'
				}
			>
				<CustomToolbar
					filterValue={ArticleFilter}
					dataPayload={dataPayload}
					setDataPayload={setDataPayload}
					searchPlaceholder={t('ACTION.SEARCH')}
					createText={t('ACTION.CREATE')}
					onCreate={() => router.push('article/create')}
				/>
				{articleData.isLoading || articleData.isFetching ? (
					<div className="mt-10 flex justify-center">
						<CircularProgress classNames={{ label: 'text-semibold' }} label="Loading..." />
					</div>
				) : (
					<section>
						<Table
							classNames={{
								base: 'my-5',
								wrapper: 'max-h-[360px] '
							}}
							isStriped
							isHeaderSticky
						>
							<TableHeader>
								{ArticleTableColumn.map((column) => (
									<TableColumn
										key={String(column.key)}
										className="bg-kalma-grey-200 text-base font-bold text-kalma-black-900"
									>
										{capitalCase(t(`COLUMN.${column.label_path}`))}
									</TableColumn>
								))}
							</TableHeader>
							<TableBody
								isLoading={articleData.isLoading || articleData.isFetching}
								emptyContent={'No rows to display.'}
								items={articleData.data?.data}
							>
								{(item) => (
									<TableRow key={item.id} className="text-sm md:text-base">
										{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
									</TableRow>
								)}
							</TableBody>
						</Table>
						{articleData.data && articleData?.data?.total_pages > 0 ? (
							<CustomPagination
								totalData={articleData.data.total_items}
								totalPages={articleData?.data?.total_pages}
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
