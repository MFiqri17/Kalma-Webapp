import { z } from 'zod'
import { CreateArticleSchema } from '../validation/self-management'

export type CreateArticleSchemaType = z.infer<typeof CreateArticleSchema>

export type CreateArticlePayloadData = {
	title: string
	article_type: string[]
	content: string[]
	image?: File | null | undefined
}

export type CreateMusicPayload = {
	title: string
	author: string
	genre: string
	music_link: string
	music_file?: File | null | undefined
}
