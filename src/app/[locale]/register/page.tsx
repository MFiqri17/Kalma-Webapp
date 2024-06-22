'use client'
import { capitalCase, sentenceCase } from 'text-case'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import GeneralHeaders from '@/src/components/authHeader'
import { RegisterSchema } from '@/src/modules/types/validation/general'
import GeneralLayout from '@/src/components/authLayout'
import { Link } from '@/src/navigation'
import { RegisterPayload } from '@/src/modules/types/payload/general'
import { RegisterData } from '@/src/modules/constant/static-data'
import InputLabel from '@/src/components/label-name'
import { postRegister } from '@/src/modules/endpoints/general'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import RegisterSuccess from '@/src/components/success/register-success'

const Register = () => {
	const t = useTranslations('GENERAL')
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterPayload>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
			full_name: '',
			age: ''
		}
	})

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isAggreed, setIsAggreed] = useState<boolean>(false)

	const registerMutation = useMutation<DefaultResponse, AxiosError<ErrorResponse>, RegisterPayload>(
		{
			mutationFn: (registerData) => postRegister(registerData),
			onError: (error) => {
				if (error.response?.status === 400) {
					toast.error(error.response.data.message)
				}
			}
		}
	)

	const onSubmit = (data: RegisterPayload) => {
		if (isAggreed) return registerMutation.mutate(data)
		toast.error(sentenceCase(t('SHOULDAGGREE')) + '!')
	}

	if (registerMutation.isSuccess) return <RegisterSuccess message={registerMutation.data.message} />

	return (
		<GeneralLayout>
			<div>
				<GeneralHeaders
					classname="mb-5"
					subtitle={capitalCase(t('REGISTER.SUBTITLE'))}
					title={capitalCase(t('REGISTER.TITLE'))}
				/>
				<form className="mb-5 flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
					{RegisterData.map((data) => (
						<div key={data.id}>
							<Input
								{...register(data.name as keyof RegisterPayload)}
								variant="underlined"
								classNames={{
									inputWrapper: 'after:bg-kalma-blue-500',
									input: '!text-kalma-black-500 text-sm font-medium'
								}}
								label={
									<InputLabel
										className="text-base font-medium text-kalma-blue-500"
										isMandatory={true}
										label={capitalCase(t(`REGISTER.${data.label_path}`))}
									/>
								}
								type={data.name === 'password' ? (isVisible ? 'text' : 'password') : data.type}
								isInvalid={Boolean(errors[data.name as keyof RegisterPayload]?.message)}
								errorMessage={
									errors[data.name as keyof RegisterPayload]?.message && (
										<p className="mt-1 text-sm text-red-600">
											{sentenceCase(
												t(`VALIDATION.${errors[data.name as keyof RegisterPayload]?.message}`)
											)}
										</p>
									)
								}
								endContent={
									data.name === 'password' && (
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
								color="default"
								isSelected={isAggreed}
								onValueChange={setIsAggreed}
								classNames={{
									base: 'text-teal-600'
								}}
							/>
							<p className="text-base text-black">{capitalCase(t('REGISTER.AGGREE'))}</p>
						</div>
					</div>
					<Button
						className="mt-6 w-full rounded-full bg-kalma-blue-500 py-4 text-lg font-semibold text-white hover:bg-kalma-blue-500 hover:opacity-80 focus:bg-kalma-blue-500"
						type="submit"
						isLoading={registerMutation.isLoading}
						isIconOnly={registerMutation.isLoading}
					>
						{capitalCase(t('REGISTER.TITLE'))}
					</Button>
					<p className="mt-6 text-center text-base text-black">
						{capitalCase(t('REGISTER.HASACCOUNT')) + '? '}
						<Link className="text-base font-semibold text-[#2F9296]" href="/login">
							{capitalCase(t('REGISTER.LOGIN'))}
						</Link>
					</p>
				</form>
			</div>
		</GeneralLayout>
	)
}

export default Register
