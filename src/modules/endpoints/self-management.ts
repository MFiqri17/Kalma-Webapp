import { CreateArticlePayloadData } from '../types/payload/self-management'
import { CreateArticleResponse } from '../types/response/self-management'
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
