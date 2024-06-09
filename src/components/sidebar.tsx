import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
import { capitalCase } from 'text-case'
import Image from 'next/image'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useMediaMatch } from 'rooks'
import { Link } from '../navigation'
import { SidebarMenu } from '../modules/types'
import { useSidebarStore } from '../modules/store'

export default function Sidebar({ menuList }: { menuList: SidebarMenu[] }) {
	const { isOpen, toggleSidebar, setIsOpen } = useSidebarStore()
	const isMobile = useMediaMatch('(max-width: 640px)')

	const t = useTranslations('GENERAL.SIDEBAR')

	useEffect(() => {
		if (isMobile) setIsOpen(false)
	}, [isMobile])

	return (
		<ProSidebar
			breakPoint="sm"
			collapsed={!isOpen}
			rootStyles={{
				[`.${sidebarClasses.container}`]: {
					backgroundColor: '#f6f1f1'
				},
				borderRight: '2px solid #E5E7EB'
			}}
			toggled={isOpen}
			width={isMobile ? '14rem' : '18rem'}
			onBackdropClick={toggleSidebar}
		>
			<div className={clsx(isOpen && 'px-3')}>
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
					<section className={clsx('my-8 flex w-full justify-center', isOpen && '-ml-5')}>
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
	)
}
