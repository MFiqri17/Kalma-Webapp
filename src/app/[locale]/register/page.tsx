'use client'
import { capitalCase } from 'text-case'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input } from '@nextui-org/react'
import GeneralHeaders from '@/src/components/authHeader'
import { RegisterPayload } from '@/src/modules/payload/auth'
import {
	RegisterSchema,
	RegisterSchemaType
} from '@/src/modules/validation/authenticationValidation'
import GeneralLayout from '@/src/components/authLayout'

const Register = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
			full_name: '',
			age: 0
		}
	})

	const onSubmit = () => {
		const credentials: RegisterPayload = {
			email: getValues('email'),
			password: getValues('password'),
			username: getValues('username'),
			full_name: getValues('full_name'),
			age: getValues('age')
		}
		// eslint-disable-next-line no-console
		console.log(credentials)
	}

	return (
		<GeneralLayout>
			<div className="h-fit">
				<GeneralHeaders
					classname="mb-5"
					subtitle={capitalCase('SELAMAT DATANG KEMBALI')}
					title={capitalCase('DAFTAR')}
				/>
				<form className="mb-5 flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
					<Input
						classNames={{
							inputWrapper: 'border-b-2 border-teal-600',
							input: 'text-green-800'
						}}
						label="Nama Lengkap"
						variant="underlined"
						{...register('full_name')}
					/>
					<p className="text-xs text-red-600">{errors.full_name?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-b-2 border-teal-600',
							input: 'text-kalma-600'
						}}
						label="Username"
						variant="underlined"
						{...register('username')}
					/>
					<p className="text-xs text-red-600">{errors.username?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-b-2 border-teal-600',
							input: 'text-kalma-600'
						}}
						label="Alamat Email"
						variant="underlined"
						{...register('email')}
					/>
					<p className="text-xs text-red-600">{errors.email?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-b-2 border-teal-600',
							input: 'text-kalma-600'
						}}
						label="Umur"
						type="number"
						variant="underlined"
						{...register('age')}
					/>
					<p className="text-xs text-red-600">{errors.age?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-b-2 border-teal-600',
							input: 'text-kalma-600'
						}}
						label="Kata Sandi"
						variant="underlined"
						{...register('password')}
					/>
					<p className="text-xs text-red-600">{errors.password?.message}</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Checkbox
								classNames={{
									base: 'text-teal-600'
								}}
							/>
							<p className="text-base text-black">{capitalCase('I ACCEPT TERMS AND CONDITION')}</p>
						</div>
					</div>
					<Button
						className="mt-6 rounded-[20px] bg-[#2F9296] py-4 text-lg font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
						type="submit"
					>
						{capitalCase('REGISTER')}
					</Button>
					<p className="mt-6 text-center text-base text-black">
						{capitalCase('ALREADY HAVE ACCOUNT') + '? '}
						<a className="text-base font-semibold text-[#2F9296]" href="/login">
							{capitalCase('LOGIN')}
						</a>
					</p>
				</form>
			</div>
		</GeneralLayout>
	)
}

export default Register
