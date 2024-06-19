import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Select,
	SelectItem
} from '@nextui-org/react'

import { IoMenuOutline } from 'react-icons/io5'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '../navigation'
import { LanguageData } from '../modules/constant/static-data'
import { useSidebarStore } from '../modules/store'
import { useGetUserProperty } from '../modules/store'

export default function Navbar() {
	const { toggleSidebar } = useSidebarStore()
	const { data } = useGetUserProperty()
	const router = useRouter()
	const pathName = usePathname()
	const locale = useLocale()

	const selectedLocale = LanguageData.find((data) => data.value === locale)

	return (
		<nav className="flex justify-between border-b-2 border-[#E5E7EB] bg-kalma-grey-500 px-5 py-4">
			<div>
				<Button isIconOnly variant="light" onClick={toggleSidebar}>
					<IoMenuOutline className="text-2xl" />
				</Button>
			</div>
			<div className="flex w-full justify-end space-x-10">
				<Select
					disallowEmptySelection
					aria-label="Select Language"
					className="w-24 text-5xl text-black"
					selectedKeys={[locale]}
					startContent={
						<Image
							alt={selectedLocale?.label || 'Indonesia'}
							height={30}
							src={selectedLocale?.icon_path || '/indonesia.png'}
							width={30}
						/>
					}
					variant="underlined"
				>
					{LanguageData.map((language) => (
						<SelectItem
							key={language.value}
							textValue={language.value}
							onPress={() => router.replace(pathName, { locale: String(language.value) })}
						>
							<Image alt={language.label} height={25} src={language.icon_path} width={25} />
						</SelectItem>
					))}
				</Select>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							color="success"
							name="Jason Hughes"
							size="sm"
							src={data?.avatar_link ? data.avatar_link : '/White_Kalma_Logo.svg'}
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">{data?.email}</p>
						</DropdownItem>
						<DropdownItem key="settings">My Settings</DropdownItem>
						<DropdownItem key="logout" color="danger">
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</nav>
	)
}
