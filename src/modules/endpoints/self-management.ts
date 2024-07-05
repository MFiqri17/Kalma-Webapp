import { GetDataPayload } from '../types/payload/general'
import { DefaultResponse } from '../types/response/general'
import {
	CreateArticleResponse,
	MusicDetailResponse,
	MusicResponse
} from '../types/response/self-management'
import { api } from '../utils/api'

export const postCreateArticle = async (data: FormData): Promise<CreateArticleResponse> => {
	const response = await api.post<CreateArticleResponse>('/article', data, {
		headers: {
			'Content-Type': 'mulitpart/form-data'
		}
	})
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
	const response = await api.post<MusicResponse>('/self-management/music-meditation', data)
	return response.data
}

export const getMusicDataDetail = async (id: string): Promise<MusicDetailResponse> => {
	const response = await api.get<MusicDetailResponse>(`/self-management/music-meditation/get/${id}`)
	return response.data
}

export const deleteMusicById = async (id: string): Promise<DefaultResponse> => {
	const response = await api.delete<DefaultResponse>(`/self-management/music-meditation/${id}`)
	return response.data
}
