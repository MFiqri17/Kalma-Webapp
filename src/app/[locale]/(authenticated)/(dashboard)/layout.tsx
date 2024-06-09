'use client'

import dynamic from 'next/dynamic'
const DynamicSidebar = dynamic(() => import('@/src/components/sidebar'), { ssr: false })
import Navbar from '@/src/components/navbar'
import { SidebarData } from '@/src/modules/constant/static-data'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen justify-between bg-gray-50">
			<DynamicSidebar menuList={SidebarData.AdminMenu} />
			<section className="w-full">
				<Navbar />
				<div className="px-5">{children}</div>
			</section>
		</div>
	)
}
