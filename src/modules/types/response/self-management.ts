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
