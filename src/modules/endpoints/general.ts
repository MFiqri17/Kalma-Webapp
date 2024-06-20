import {
	LoginPayload,
	RefreshTokenPayload,
	RegisterPayload,
	UpdateUserPayload
} from '../types/payload/general'
import {
	DefaultResponse,
	GetUserPropertyResponse,
	AuthenticationResponse,
	UpdateUserPropertyResponse
} from '../types/response/general'
import { api } from '../utils/api'

export const postAuthenticate = async (data: LoginPayload): Promise<AuthenticationResponse> => {
	const response = await api.post<AuthenticationResponse>('/user/authenticate', data)
	return response.data
}

export const postRegister = async (data: RegisterPayload): Promise<DefaultResponse> => {
	const response = await api.post<DefaultResponse>('/user/register', data)
	return response.data
}

export const getUserProperty = async (): Promise<GetUserPropertyResponse> => {
	const response = await api.get<GetUserPropertyResponse>('/user/user-property')
	return response.data
}

export const putUpdateUserProperty = async (
	data: UpdateUserPayload
): Promise<UpdateUserPropertyResponse> => {
	const response = await api.put<UpdateUserPropertyResponse>('/user/user-property/update', data)
	return response.data
}

export const getUserRole = async (): Promise<DefaultResponse> => {
	const response = await api.get<DefaultResponse>('/user/user-role')
	return response.data
}

export const postUpdateRefreshToken = async (
	data: RefreshTokenPayload
): Promise<AuthenticationResponse> => {
	const response = await api.post<AuthenticationResponse>('/user/refresh-token', data)
	return response.data
}

export const postSendEmailVerification = async (): Promise<DefaultResponse> => {
	const response = await api.post<DefaultResponse>('/user/send-email-verification')
	return response.data
}

export const getVerifyEmail = async (token: string): Promise<DefaultResponse> => {
	const response = await api.get<DefaultResponse>(`/user/verify-email/${token}`)
	return response.data
}
