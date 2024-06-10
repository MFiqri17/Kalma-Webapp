'use client'
import { capitalCase } from 'text-case'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input } from '@nextui-org/react'
import GeneralHeaders from '@/src/components/authHeader'
import {
	RegisterSchema,
	RegisterSchemaType
} from '@/src/modules/validation/authenticationValidation'
import GeneralLayout from '@/src/components/authLayout'
import { Link } from '@/src/navigation'

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
		const credentials: RegisterSchemaType = {
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
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Nama Lengkap"
						variant="bordered"
						{...register('full_name')}
					/>
					<p className="text-xs text-red-600">{errors.full_name?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Username"
						variant="bordered"
						{...register('username')}
					/>
					<p className="text-xs text-red-600">{errors.username?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Alamat Email"
						variant="bordered"
						{...register('email')}
					/>
					<p className="text-xs text-red-600">{errors.email?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Umur"
						type="number"
						variant="bordered"
						{...register('age')}
					/>
					<p className="text-xs text-red-600">{errors.age?.message}</p>
					<Input
						classNames={{
							inputWrapper: 'border-2 border-teal-600',
							input: 'text-teal-600',
							label: 'text-teal-600'
						}}
						label="Kata Sandi"
						variant="bordered"
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
							<p className="text-base text-black">
								{capitalCase('SAYA SETUJU DENGAN SYARAT DAN KETENTUAN')}
							</p>
						</div>
					</div>
					<Button
						className="mt-6 rounded-[20px] bg-[#2F9296] py-4 text-lg font-semibold text-white hover:bg-[#2F9296] hover:opacity-80 focus:bg-[#2F9296]"
						type="submit"
					>
						{capitalCase('REGISTER')}
					</Button>
					<p className="mt-6 text-center text-base text-black">
						{capitalCase('SUDAH MEMILIKI AKUN') + '? '}
						<Link className="text-base font-semibold text-[#2F9296]" href="/login">
							{capitalCase('LOGIN')}
						</Link>
					</p>
				</form>
			</div>
		</GeneralLayout>
	)
}

export default Register
