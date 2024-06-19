import { UserProperty } from '..'

export type DefaultResponse = {
	is_success: boolean
	message: string
}

export type AuthenticationResponse = DefaultResponse & {
	access_token: string
	refresh_token: string
	is_email_verified: boolean
}

export type GetUserPropertyResponse = DefaultResponse & {
	data: UserProperty
}

export type ErrorResponse<T = never> = DefaultResponse & {
	type: 'default' | 'email' | 'approve'
	error_details?: T
}