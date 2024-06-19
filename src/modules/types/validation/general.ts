import { z } from 'zod'
import REGEX from '../../constant/regex'

const requiredMessage = 'REQUIRED'
const invalidEmailFormatMessage = 'INVALIDEMAILFORMAT'
const numberStringOnly = 'INVALIDNUMBER'
const containsSQLIMessage = 'SQLINJECTION'
const alphabetCharOnlyMessage = 'ALPHABETCHARONLY'

export const validateSQLInjection = (val: string) =>
	!REGEX.CONTAIN_SQL_CHARACTERS.test(val.toUpperCase())

export const validateNumberString = (val: string) =>
	REGEX.NUMBER_STRING_ONLY.test(val) && val !== ''

export const validateAlphabetCharOnly = (val: string) => REGEX.APLPHABET_STRING_ONLY.test(val)

export const LoginSchema = z.object({
	email_or_username: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	password: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage })
})

export const RegisterSchema = z.object({
	email: z
		.string()
		.email({ message: invalidEmailFormatMessage })
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	password: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	username: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	full_name: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage })
		.refine(validateAlphabetCharOnly, { message: alphabetCharOnlyMessage }),
	age: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateNumberString, { message: numberStringOnly })
})

export const ForgotPasswordSchema = z.object({
	email_or_username: z.string().min(1, { message: requiredMessage })
})

export const ResetPasswordSchema = z.object({
	new_password: z.string().min(1, { message: requiredMessage }),
	new_password_confirmation: z.string().min(1, { message: requiredMessage })
})
