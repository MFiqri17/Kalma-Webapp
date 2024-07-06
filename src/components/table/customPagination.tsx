import { Pagination, Select, SelectItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { sentenceCase } from 'text-case'
import { GetDataPayload } from '../../modules/types/payload/general'

export default function CustomPagination({
	dataPayload,
	setDataPayload,
	totalPages,
	totalData
}: {
	dataPayload: GetDataPayload
	setDataPayload: (newState: Partial<GetDataPayload>) => void
	totalPages: number
	totalData: number
}) {
	const paginationSizeData = [3, 5, 8]
	const t = useTranslations('GENERAL.TABLE')
	return (
		<div className="flex w-full items-center justify-between text-sm sm:justify-center sm:space-x-3 md:justify-end md:text-base">
			<section className="hidden items-center space-x-2 sm:flex">
				<p className="truncate">{sentenceCase('TOTAL DATA')}:</p>
				<h4>{totalData}</h4>
			</section>
			<Pagination
				isCompact
				showControls
				showShadow
				classNames={{
					cursor: 'bg-kalma-blue-500',
					base: 'md:text-base text-sm'
				}}
				page={dataPayload.page}
				total={totalPages}
				onChange={(page) => setDataPayload({ page: page })}
			/>

			<p className="truncate">{sentenceCase(t('ITEMPERPAGE'))}:</p>
			<Select
				label=""
				labelPlacement="outside-left"
				radius="sm"
				size="lg"
				variant="underlined"
				aria-label="select per page"
				className="max-w-20 text-sm md:text-base"
				selectedKeys={[String(dataPayload.size)]}
				onChange={(e) => setDataPayload({ size: Number(e.target.value), page: 1 })}
				disallowEmptySelection
			>
				{paginationSizeData.map((item) => (
					<SelectItem key={item} textValue={String(item)}>
						{item}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}
