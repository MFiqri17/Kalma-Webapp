'use client'
import { useLayoutEffect } from 'react'
import { useRouter } from '@/src/navigation'
import { isLoggedIn } from '@/src/modules/utils/storage'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	useLayoutEffect(() => {
		if (!isLoggedIn()) return router.replace('/login')
	}, [])

	return <div>{children}</div>
}
