import { capitalCase } from 'text-case'
import { z } from 'zod'

const requiredMessage = capitalCase('THE FIELD IS REQUIRED')

export const LoginSchema = z.object({
	email_username: z.string().min(1, { message: requiredMessage }),
	password: z.string().min(1, { message: requiredMessage })
})

export const RegisterSchema = z.object({
	email: z.string().email().min(1, { message: requiredMessage }),
	password: z.string().min(1, { message: requiredMessage }),
	username: z.string().min(1, { message: requiredMessage }),
	full_name: z.string().min(1, { message: requiredMessage }),
	age: z.number().min(1, { message: requiredMessage })
})

export const ForgotPasswordSchema = z.object({
	email_or_username: z.string().min(1, { message: requiredMessage })
})

export const ResetPasswordSchema = z.object({
	new_password: z.string().min(1, { message: requiredMessage }),
	new_password_confirmation: z.string().min(1, { message: requiredMessage })
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
