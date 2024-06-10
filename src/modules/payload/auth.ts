export type LoginPayload = {
	email_username: string
	password: string
}

export type RegisterPayload = {
	email: string
	password: string
	username: string
	full_name: string
	age: number
}

export type ForgotPassPayload = {
	email_or_username: string
}

export type ResesPasswordPayload = {
	new_password: string
	new_password_confirmation: string
}
