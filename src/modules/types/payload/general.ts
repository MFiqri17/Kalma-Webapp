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
