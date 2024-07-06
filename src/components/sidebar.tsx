import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
import { capitalCase } from 'text-case'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { useMediaMatch } from 'rooks'
import clsx from 'clsx'
import { Link } from '../navigation'
import { SidebarMenu } from '../modules/types'
import { useSidebarStore } from '../modules/store'

export default function Sidebar({
	menuList,
	children
}: {
	menuList: SidebarMenu[]
	children: React.ReactNode
}) {
	const { isOpen, toggleSidebar, setIsOpen } = useSidebarStore()
	const isMobile = useMediaMatch('(max-width: 640px)')
	const isCollapsed = useMediaMatch('(max-width: 1024px)')
	const t = useTranslations('GENERAL.SIDEBAR')

	useEffect(() => {
		if (isCollapsed) setIsOpen(false)
	}, [isCollapsed])

	return (
		<div className="flex w-full justify-between">
			<ProSidebar
				breakPoint="xl"
				className="fixed"
				collapsed={!isOpen}
				rootStyles={{
					[`.${sidebarClasses.container}`]: {
						backgroundColor: '#f6f1f1',
						height: '100vh',
						top: 0,
						position: 'sticky'
					},
					borderRight: '2px solid #E5E7EB'
				}}
				toggled={isOpen}
				width={isMobile ? '17rem' : '16rem'}
				onBackdropClick={toggleSidebar}
			>
				<div>
					<Menu
						menuItemStyles={{
							button: {
								[`&:hover`]: {
									background: '#2F9296',
									color: '#F6F1F1',
									borderRadius: '6px'
								}
							}
						}}
					>
						<section className={clsx('my-8 flex w-full justify-center', isOpen && '-ml-3')}>
							<Image
								alt="Kalma Logo"
								height={30}
								hidden={!isOpen}
								src={'/Kalma_Logo_With_Text.svg'}
								width={103}
							/>
							<Image
								alt="Kalma Logo"
								height={30}
								hidden={isOpen}
								src={'/Kalma_Logo.svg'}
								width={40}
							/>
						</section>
						<section>
							{menuList.map((menu) => (
								<MenuItem
									key={menu.id}
									className="text-base font-medium text-gray-800"
									component={<Link href={menu.url_path} />}
									icon={menu.icon}
								>
									{capitalCase(t(menu.label_path))}
								</MenuItem>
							))}
						</section>
					</Menu>
				</div>
			</ProSidebar>
			{children}
		</div>
	)
}
