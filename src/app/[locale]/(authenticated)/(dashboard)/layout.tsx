'use client'

import dynamic from 'next/dynamic'
const DynamicSidebar = dynamic(() => import('@/src/components/sidebar'), { ssr: false })
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { CircularProgress } from '@nextui-org/react'
import Navbar from '@/src/components/navbar'
import { SidebarData } from '@/src/modules/constant/static-data'
import { useGetUserProperty } from '@/src/modules/store'
import {
	DefaultResponse,
	ErrorResponse,
	GetUserPropertyResponse
} from '@/src/modules/types/response/general'
import { getUserProperty, getUserRole } from '@/src/modules/endpoints/general'
import { useRouter } from '@/src/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { setData } = useGetUserProperty()
	const router = useRouter()
	const userData = useQuery<GetUserPropertyResponse, AxiosError<ErrorResponse>>({
		queryKey: ['getUser'],
		queryFn: getUserProperty,
		onSuccess: (data) => {
			setData(data.data)
		}
	})
	const userRole = useQuery<DefaultResponse, AxiosError<ErrorResponse>>({
		queryKey: ['getRole'],
		queryFn: getUserRole,
		onSuccess: (data) => {
			if (data.message === 'User') return router.replace('/login')
		}
	})
	if (userData.isLoading || userRole.isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<CircularProgress label="Loading..." />
			</div>
		)
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
