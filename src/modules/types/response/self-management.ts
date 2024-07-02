import { DefaultResponse } from './general'

export type CreateArticleResponse = DefaultResponse & {
	data: ArticleResponseData
}

export type ArticleResponseData = {
	id: string
	title: string
	image: string | null
	content: string[]
	article_type: string[]
	created_date: string
	updated_date: string
}

export type MusicResponse = {
	is_success: boolean
	message: string
	data: MusicDataResponse[]
}

export type MusicDataResponse = {
	id: string
	title: string
	author: string
	genre: string
	music_link: string
	music_image?: string
	created_by: string
	created_date: string
	updated_by: string
	updated_date: string
}

export type ArticleDataResponse = {
	id: string
	title: string
	image: string
	content: string[]
	article_type: string[]
	created_by: string
	created_date: string
	updated_by: string
	updated_date: string
}
