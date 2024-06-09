import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
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

export type LanguageType = {
	id: string
	value: string
	label: string
	icon_path: string
}
