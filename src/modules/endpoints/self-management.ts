import { GetDataPayload } from '../types/payload/general'
import { DefaultResponse } from '../types/response/general'
import {
	ArticleDetailResponse,
	ArticleResponse,
	MusicDetailResponse,
	MusicResponse
} from '../types/response/self-management'
import { api } from '../utils/api'

export const postArticleData = async (data: FormData): Promise<DefaultResponse> => {
	const response = await api.post<DefaultResponse>('/article/create', data, {
		headers: {
			'Content-Type': 'mulitpart/form-data'
		}
	})
	return response.data
}

export const getArticleData = async (data?: GetDataPayload): Promise<ArticleResponse> => {
	const response = await api.post<ArticleResponse>('/article/get', data)
	return response.data
}

export const getArticleDataDetail = async (id: string): Promise<ArticleDetailResponse> => {
	const response = await api.get<ArticleDetailResponse>(`/article/get/${id}`)
	return response.data
}

export const deleteArticleById = async (id: string): Promise<DefaultResponse> => {
	const response = await api.delete<DefaultResponse>(`/article/delete/${id}`)
	return response.data
}

export const postMusicData = async (data: FormData): Promise<DefaultResponse> => {
	const response = await api.post<DefaultResponse>(
		'/self-management/music-meditation/create',
		data,
		{
			headers: {
				'Content-Type': 'mulitpart/form-data'
			}
		}
	)
	return response.data
}

export const getMusicData = async (data?: GetDataPayload): Promise<MusicResponse> => {
	const response = await api.post<MusicResponse>('/self-management/music-meditation/get', data)
	return response.data
}

export const getMusicDataDetail = async (id: string): Promise<MusicDetailResponse> => {
	const response = await api.get<MusicDetailResponse>(`/self-management/music-meditation/get/${id}`)
	return response.data
}

export const deleteMusicById = async (id: string): Promise<DefaultResponse> => {
	const response = await api.delete<DefaultResponse>(
		`/self-management/music-meditation/delete/${id}`
	)
	return response.data
}
