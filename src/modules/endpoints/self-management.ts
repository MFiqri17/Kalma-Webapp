import { CreateArticlePayloadData } from '../types/payload/self-management'
import {
	ArticleResponse,
	CreateArticleResponse,
	MusicResponse
} from '../types/response/self-management'
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

export const getArticleData = async (): Promise<ArticleResponse> => {
	const response = await api.get<ArticleResponse>('/article')
	return response.data
}
