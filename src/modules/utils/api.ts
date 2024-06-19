import axios, { AxiosError } from 'axios'
import { AxiosResponse } from 'axios'
import { updateRefreshToken } from '../endpoints/general'
import { ErrorResponse } from '../types/response/general'
import {
	getToken,
	isLoggedIn,
	getLocaleCookie,
	setTokenCookie,
	setTokenSession,
	deleteTokenCookie,
	deleteTokenSession,
	isTokenSessionAvailable
} from './storage'

export const isServer = () => {
	return typeof window === 'undefined'
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_KALMA_API_BASE,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': getLocaleCookie()
	},
	withCredentials: false
})

api.interceptors.request.use((config) => {
	if (!isServer() && isLoggedIn()) {
		const token = getToken().access_token

		const auth = token ? `Bearer ${token}` : ''
		config.headers.Authorization = auth
	}
	return config
})

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError<ErrorResponse>) => {
		if (error.config?.url !== '/login' && error.response?.status === 401 && isLoggedIn()) {
			try {
				const response = await updateRefreshToken({ refresh_token: getToken().refresh_token })
				if (!response) {
					return (location.href = '/login')
				}
				const tokenData = {
					access_token: response.access_token,
					refresh_token: response.refresh_token
				}
				if (isTokenSessionAvailable()) setTokenSession(tokenData)
				else setTokenCookie(tokenData)
				const originalRequest = error.config!
				return api(originalRequest)
			} catch (error) {
				if (isTokenSessionAvailable()) deleteTokenSession()
				else deleteTokenCookie()
				return (location.href = '/login')
			}
		}

		const handleErrorResponse = (status: number, message: string | undefined) => {
			location.href = `/exception?status=${status}&message=${message}`
		}

		const status = error.response?.status
		const dataType = error.response?.data?.type

		if (status === 401) {
			if (isTokenSessionAvailable()) {
				deleteTokenSession()
			} else {
				deleteTokenCookie()
			}
			location.href = '/login'
		} else if (status === 400) {
			if (dataType === 'email') {
				location.href = '/send-email-verification'
			} else if (dataType === 'approve') {
				handleErrorResponse(status, error.response?.data.message)
			} else {
				return Promise.reject(error)
			}
		} else {
			const errorStatuses = [403, 404, 500, 502, 503]
			if (errorStatuses.includes(status!)) {
				handleErrorResponse(status!, error.response?.data.message)
			}
		}

		return Promise.reject(error)
	}
)
