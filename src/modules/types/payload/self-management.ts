import { z } from 'zod'
import { CreateMusicSchema, CreateArticleSchema } from '../validation/self-management'

export type CreateArticlePayload = z.infer<typeof CreateArticleSchema>
export type CreateMusicPayload = z.infer<typeof CreateMusicSchema>
