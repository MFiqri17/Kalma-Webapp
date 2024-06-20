'use client'
import { capitalCase, sentenceCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { postSendEmailVerification } from '@/src/modules/endpoints/general'
import GeneralLayout from '@/src/components/authLayout'
import GeneralHeaders from '@/src/components/authHeader'
import SentEmail from '@/src/components/success/sent-email'

export default function SendEmailVerification() {
	const t = useTranslations('GENERAL.EMAILISNOTVERIFIED')
	const sendVerificationMutation = useMutation<DefaultResponse, AxiosError<ErrorResponse>>({
		mutationFn: () => postSendEmailVerification(),
		onError: (error) => {
			if (error.status === 400 && error.response?.data.type === 'default') {
				toast.error(error.response.data.message)
			}
		}
	})

	if (sendVerificationMutation.isSuccess)
		return <SentEmail message={sendVerificationMutation.data.message} />

	return (
		<GeneralLayout>
			<GeneralHeaders
				classname="mb-8"
				subtitle={sentenceCase(t('SUBTITLE'))}
				title={capitalCase(t('TITLE'))}
			/>
			<Button
				isIconOnly={sendVerificationMutation.isLoading}
				isLoading={sendVerificationMutation.isLoading}
				onClick={() => sendVerificationMutation.mutate()}
				className="w-full bg-kalma-blue-500 py-4 text-center text-lg font-semibold text-white"
			>
				{capitalCase(t('BUTTON'))}
			</Button>
		</GeneralLayout>
	)
}
