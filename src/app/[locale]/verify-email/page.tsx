'use client'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { useQuery } from 'react-query'
import { CircularProgress } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { getVerifyEmail } from '@/src/modules/endpoints/general'
import InvalidLink from '@/src/components/exception/invalid-link'
import VerifiedEmail from '@/src/components/success/verified-email'
import { useRouter } from '@/src/navigation'

export default function VerifyEmail({ searchParams }: { searchParams: { token: string } }) {
	const token = searchParams.token
	const router = useRouter()
	const verifyEmailQuery = useQuery<DefaultResponse, AxiosError<ErrorResponse>>({
		queryKey: ['verifyEmail'],
		queryFn: () => getVerifyEmail(String(token)),
		onError: (error) => {
			if (error.response?.status === 400 && error.response.data.type === 'default') {
				toast.error(error.response.data.message)
				router.replace('/')
			}
		}
	})
	if (!token) return notFound()
	if (verifyEmailQuery.isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<CircularProgress classNames={{ label: 'text-semibold' }} label="Loading..." />
			</div>
		)
	if (
		verifyEmailQuery.isError &&
		verifyEmailQuery.error.response?.status === 400 &&
		verifyEmailQuery.error.response?.data.type === 'link'
	)
		return (
			<InvalidLink type="email" message={String(verifyEmailQuery.error.response?.data.message)} />
		)
	return <div>{<VerifiedEmail message={String(verifyEmailQuery.data?.message)} />}</div>
}
