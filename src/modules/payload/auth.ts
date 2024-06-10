import {
	ForgotPasswordSchemaType,
	LoginSchemaType,
	RegisterSchemaType,
	ResetPasswordSchemaType
} from '../validation/authenticationValidation'

export type LoginPayload = LoginSchemaType

export type RegisterPayload = RegisterSchemaType

export type ForgotPassPayload = ForgotPasswordSchemaType

export type ResetPasswordPayload = ResetPasswordSchemaType
