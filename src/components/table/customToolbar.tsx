import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { capitalCase, sentenceCase } from 'text-case'
import { IoFilter } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'
import { useMediaMatch } from 'rooks'
import { FilterValue } from '@/src/modules/types'
import { GetDataPayload } from '@/src/modules/types/payload/general'

export default function CustomToolbar({
	filterValue,
	dataPayload,
	setDataPayload,
	searchPlaceholder,
	createText,
	onCreate
}: {
	filterValue: FilterValue[]
	dataPayload: GetDataPayload
	setDataPayload: (newState: Partial<GetDataPayload>, selectedFilter?: string) => void
	searchPlaceholder: string
	createText: string
	onCreate: () => void
}) {
	const [selectedFilter, setSelectedFilter] = useState<string>('all')
	const isMobile = useMediaMatch('(max-width: 640px)')
	useEffect(() => {
		if (selectedFilter !== '' && selectedFilter !== 'all') {
			const filterMap = filterValue.find((item) => item.value === selectedFilter)
			setDataPayload({ filter_column: filterMap?.column, filter_value: filterMap?.value, page: 1 })
		} else if (selectedFilter === 'all') {
			setDataPayload({ page: 1 }, 'all')
		}
	}, [selectedFilter])

	const MobileComponent = () => (
		<section className="flex flex-col space-y-5">
			<div className="flex w-full justify-between">
				<Select
					label=""
					labelPlacement="outside-left"
					radius="sm"
					size="lg"
					aria-label="select per page"
					startContent={<IoFilter className="text-lg" />}
					classNames={{
						value: 'text-sm font-medium',
						base: 'max-w-32 drop-shadow-xl ',
						trigger: 'bg-white hover:bg-white group-data-[focus=true]:bg-white'
					}}
					selectedKeys={[selectedFilter]}
					onChange={(e) => setSelectedFilter(e.target.value)}
					disallowEmptySelection
				>
					{filterValue.map((item) => (
						<SelectItem key={item.value} textValue={item.name}>
							{item.name}
						</SelectItem>
					))}
				</Select>
				<Button
					className="w-full max-w-32 rounded-xl bg-[#2F9296] text-sm font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
					startContent={<FaPlus className="text-base" />}
					size="lg"
					onPress={onCreate}
				>
					{capitalCase(createText.split(' ')[0])}
				</Button>
			</div>
			<Input
				classNames={{
					base: 'w-full drop-shadow-xl ',
					inputWrapper: 'bg-white hover:bg-white group-data-[focus=true]:bg-white',
					input: 'text-sm font-medium'
				}}
				size="lg"
				radius="sm"
				placeholder={sentenceCase(searchPlaceholder)}
				startContent={<IoIosSearch className="mr-2 text-lg" />}
				value={dataPayload.search_value}
				onValueChange={(data) => setDataPayload({ search_value: data })}
			/>
		</section>
	)

	return (
		<>
			{isMobile ? (
				<MobileComponent />
			) : (
				<section className="flex w-full justify-between">
					<div className="flex w-full space-x-4">
						<Select
							label=""
							labelPlacement="outside-left"
							radius="sm"
							size="lg"
							aria-label="select per page"
							startContent={<IoFilter className="mr-2 text-2xl" />}
							classNames={{
								value: 'text-base font-medium',
								base: 'max-w-52 drop-shadow-xl ',
								trigger: 'bg-white hover:bg-white group-data-[focus=true]:bg-white'
							}}
							selectedKeys={[selectedFilter]}
							onChange={(e) => setSelectedFilter(e.target.value)}
							disallowEmptySelection
						>
							{filterValue.map((item) => (
								<SelectItem key={item.value} textValue={item.name}>
									{item.name}
								</SelectItem>
							))}
						</Select>
						<Input
							classNames={{
								base: 'max-w-md w-full drop-shadow-xl ',
								inputWrapper: 'bg-white hover:bg-white group-data-[focus=true]:bg-white',
								input: 'text-base font-medium'
							}}
							size="lg"
							radius="sm"
							placeholder={sentenceCase(searchPlaceholder)}
							startContent={<IoIosSearch className="mr-2 text-2xl" />}
							value={dataPayload.search_value}
							onValueChange={(data) => setDataPayload({ search_value: data })}
						/>
					</div>
					<Button
						className="w-full max-w-48 rounded-xl bg-[#2F9296] text-base font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
						startContent={<FaPlus className="text-lg" />}
						size="lg"
						onPress={onCreate}
					>
						{capitalCase(createText)}
					</Button>
				</section>
			)}
		</>
	)
}
