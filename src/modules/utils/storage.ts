import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next'
import { TokenProps } from '../types'

export const isTokenSessionAvailable = () =>
	typeof window !== 'undefined' &&
	typeof sessionStorage !== 'undefined' &&
	sessionStorage.hasOwnProperty('token')

export const isTokenCookieAvailable = () => hasCookie('token')

export const deleteTokenCookie = () => deleteCookie('token')
export const deleteTokenSession = () => sessionStorage.removeItem('token')

export const setTokenCookie = (token: TokenProps) => {
	if (isTokenSessionAvailable()) deleteTokenSession()
	setCookie('token', token)
}

export const setTokenSession = (token: TokenProps) => {
	if (isTokenCookieAvailable()) deleteTokenCookie()
	sessionStorage.setItem('token', JSON.stringify(token))
}

export const getLocaleCookie = () => getCookie('NEXT_LOCALE')

export const getToken = (): TokenProps => {
	if (isTokenSessionAvailable()) return JSON.parse(sessionStorage.getItem('token')!)
	return JSON.parse(decodeURIComponent(getCookie('token')!))
}

export const isLoggedIn = () => {
	const credentials = isTokenCookieAvailable() || isTokenSessionAvailable()
	return credentials
}
