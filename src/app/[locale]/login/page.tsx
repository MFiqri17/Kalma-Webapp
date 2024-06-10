'use client'
import { capitalCase } from 'text-case'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'
import { LoginSchema, LoginSchemaType } from '@/src/modules/validation/authenticationValidation'
import GeneralHeaders from '@/src/components/authHeader'
import { LoginPayload } from '@/src/modules/payload/auth'
import GeneralLayout from '@/src/components/authLayout'

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email_username: '',
			password: ''
		}
	})

	// eslint-disable-next-line no-console
	const onSubmit = (credentials: LoginPayload) => console.log(credentials)

	return (
		<GeneralLayout>
			<div>
				<GeneralHeaders
					classname="mb-16"
					subtitle={capitalCase('SELAMAT DATANG KEMBALI')}
					title={capitalCase('LOGIN')}
				/>
				<form className="mb-5 flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Email atau Username"
						variant="bordered"
						{...register('email_username')}
					/>
					<p className="text-xs text-red-600">{errors.email_username?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Password"
						variant="bordered"
						{...register('password')}
					/>
					<p className="text-xs text-red-600">{errors.password?.message}</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Checkbox className="text-[#2F9296]" />
							<p className="text-base text-black">{capitalCase('REMEMBER ME')}</p>
						</div>
						<Link className="text-base text-black" href="/">
							{capitalCase('FORGOT PASSWORD')}
						</Link>
					</div>
					<Button
						className="mt-6 rounded-[20px] bg-[#2F9296] py-4 text-lg font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
						type="submit"
					>
						{capitalCase('LOGIN')}
					</Button>
					<p className="mt-6 text-center text-base text-black">
						{capitalCase('BELUM MEMILIKI AKUN') + '? '}
						<Link className="text-base font-semibold text-[#2F9296]" href="/">
							{capitalCase('DAFTAR AKUN')}
						</Link>
					</p>
				</form>
			</div>
		</GeneralLayout>
	)
}

export default Login
