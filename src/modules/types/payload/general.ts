import { z } from 'zod'
import {
	ForgotPasswordSchema,
	LoginSchema,
	RegisterSchema,
	ResetPasswordSchema,
	UpdateUserSchema
} from '../validation/general'

export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>

export type RefreshTokenPayload = {
	refresh_token: string
}

export type GetDataPayload = {
	size?: number
	page?: number
	sort_value?: string
	sort_column?: string
	search_value?: string
	search_column?: string
	filter_value?: string
	filter_column?: string
}
