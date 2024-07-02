import { CreateArticlePayloadData } from '../types/payload/self-management'
import { CreateArticleResponse, MusicResponse } from '../types/response/self-management'
import { api } from '../utils/api'

export const postCreateArticle = async (
	data: CreateArticlePayloadData
): Promise<CreateArticleResponse> => {
	const response = await api.post<CreateArticleResponse>('/article', data, {
		headers: {
			'Content-Type': 'mulitpart/form-data'
		}
	})
	return response.data
}

export const getMusicData = async (size: number, page: number): Promise<MusicResponse> => {
	const response = await api.get<MusicResponse>('/self-management/music-meditation', {
		params: {
			size: size,
			page: page
		}
	})
	return response.data
}
