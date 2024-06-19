import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export type TokenProps = {
	access_token: string
	refresh_token: string
}

export type UserProperty = {
	username: string
	full_name: string
	email: string
	age: string
	avatar_link: string | null
	last_logged_in: string
}

export type UserManagamentColumnType = {
	id: string
	name_path: string
}

export type SidebarMenu = {
	id: string
	label_path: string
	url_path: string
	icon: JSX.Element
}

export type SidebarState = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	toggleSidebar: () => void
}

export type GetRoleState = {
	role: string
	setRole: (role: string) => void
}

export type GetUserPropertyState = {
	data: UserProperty | null
	setData: (data: UserProperty) => void
}

export type LanguageType = {
	id: string
	value: string
	label: string
	icon_path: string
}
