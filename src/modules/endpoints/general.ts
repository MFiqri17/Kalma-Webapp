import { LoginPayload, RefreshTokenPayload, RegisterPayload } from '../types/payload/general'
import {
	DefaultResponse,
	GetUserPropertyResponse,
	AuthenticationResponse
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

export const getUserRole = async (): Promise<DefaultResponse> => {
	const response = await api.get<DefaultResponse>('/user/user-role')
	return response.data
}

export const updateRefreshToken = async (
	data: RefreshTokenPayload
): Promise<AuthenticationResponse> => {
	const response = await api.post<AuthenticationResponse>('/user/refresh-token', data)
	return response.data
}
