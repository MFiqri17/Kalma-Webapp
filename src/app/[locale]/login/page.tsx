'use client'
import { capitalCase, sentenceCase } from 'text-case'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FaCheck, FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useLayoutEffect, useState } from 'react'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { LoginSchema } from '@/src/modules/types/validation/general'
import GeneralHeaders from '@/src/components/authHeader'
import GeneralLayout from '@/src/components/authLayout'
import { Link } from '@/src/navigation'
import { LoginData } from '@/src/modules/constant/static-data'
import InputLabel from '@/src/components/label-name'
import { postAuthenticate } from '@/src/modules/endpoints/general'
import { useRouter } from '@/src/navigation'
import { LoginPayload } from '@/src/modules/types/payload/general'
import { AuthenticationResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { isLoggedIn, setTokenCookie, setTokenSession } from '@/src/modules/utils/storage'

const Login = () => {
	const t = useTranslations('GENERAL')
	const router = useRouter()
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isRemembered, setIsRemembered] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginPayload>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email_or_username: '',
			password: ''
		}
	})

	useLayoutEffect(() => {
		if (isLoggedIn()) return router.replace('/')
	})

	const loginMutation = useMutation<
		AuthenticationResponse,
		AxiosError<ErrorResponse>,
		LoginPayload
	>({
		mutationFn: (loginData) => postAuthenticate(loginData),
		onSuccess: (data) => {
			const tokenData = {
				access_token: data.access_token,
				refresh_token: data.refresh_token
			}
			if (isRemembered) setTokenCookie(tokenData)
			else setTokenSession(tokenData)
			if (!data.is_email_verified) return router.push('/send-email-verification')
			return router.push('/')
		},
		onError: (error) => {
			if (error.response?.status === 400) {
				toast.error(error.response.data.message)
			}
		}
	})

	const onSubmit = (credentials: LoginPayload) => loginMutation.mutate(credentials)

	return (
		<GeneralLayout>
			<div>
				<GeneralHeaders
					classname="mb-16"
					subtitle={capitalCase(t('LOGIN.SUBTITLE'))}
					title={capitalCase(t('LOGIN.TITLE'))}
				/>
				<form className="mb-5 flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
					{LoginData.map((login) => (
						<div key={login.id}>
							<Input
								{...register(login.name as keyof LoginPayload)}
								variant="underlined"
								classNames={{
									inputWrapper: 'after:bg-kalma-blue-500',
									input: '!text-kalma-black-500 text-sm font-medium'
								}}
								label={
									<InputLabel
										className="text-base font-medium text-kalma-blue-500"
										isMandatory={true}
										label={capitalCase(t(`LOGIN.${login.label_path}`))}
									/>
								}
								type={login.name === 'password' ? (isVisible ? 'text' : 'password') : login.type}
								isInvalid={Boolean(errors[login.name as keyof LoginPayload]?.message)}
								errorMessage={
									errors[login.name as keyof LoginPayload]?.message && (
										<p className="mt-1 text-sm text-red-600">
											{sentenceCase(
												t(`VALIDATION.${errors[login.name as keyof LoginPayload]?.message}`)
											)}
										</p>
									)
								}
								endContent={
									login.name === 'password' && (
										<Button
											isIconOnly
											className="flex items-end bg-transparent focus:outline-none"
											onClick={() => setIsVisible(!isVisible)}
										>
											{isVisible ? (
												<FaRegEye className="text-base" />
											) : (
												<FaRegEyeSlash className="text-base" />
											)}
										</Button>
									)
								}
							/>
						</div>
					))}
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Checkbox
								isSelected={isRemembered}
								onValueChange={setIsRemembered}
								color="default"
								icon={<FaCheck />}
							>
								<p className="text-base font-medium text-black">
									{capitalCase(t('LOGIN.REMEMBER'))}
								</p>
							</Checkbox>
						</div>
						<Link className="text-base font-medium text-black" href="/">
							{capitalCase(t('LOGIN.FORGOTPASSWORD')) + ' ?'}
						</Link>
					</div>
					<Button
						className="mt-6 w-full rounded-full bg-kalma-blue-500 py-4 text-lg font-semibold text-white hover:bg-kalma-blue-500 hover:opacity-80 focus:bg-kalma-blue-500"
						type="submit"
						isLoading={loginMutation.isLoading}
						isIconOnly={loginMutation.isLoading}
					>
						{capitalCase(t('LOGIN.TITLE'))}
					</Button>
					<p className="mt-6 text-center text-base font-medium text-black">
						{capitalCase(t('LOGIN.HASNOTACCOUNT')) + '? '}
						<Link className="text-base font-semibold text-kalma-blue-500" href="/register">
							{capitalCase(t('LOGIN.REGISTER'))}
						</Link>
					</p>
				</form>
			</div>
		</GeneralLayout>
	)
}

export default Login
