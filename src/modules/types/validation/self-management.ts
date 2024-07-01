import { capitalCase } from 'text-case'
import { z } from 'zod'

const requiredMessage = capitalCase('THE FIELD IS REQUIRED')

export const CreateArticleSchema = z.object({
	title: z.string().min(1, { message: requiredMessage }),
	image: z
		.unknown()
		.transform((value) => value as FileList | null | undefined)
		.transform((value) => value?.item(0))
		.refine(
			(file) => {
				if (!file) return true
				return file?.size <= 1024 * 1024
			},
			{ message: 'Above maximum size of page' }
		)
		.refine(
			(file) => {
				if (!file) return true
				return ['image/jpeg', 'image/png'].includes(file?.type)
			},
			{
				message: 'Invalid Image Format'
			}
		),
	article_type: z.array(z.string()),
	content: z.array(z.string())
})

export const AddMusicSchema = z.object({
	title: z.string().min(1, { message: requiredMessage }),
	genre: z.string().min(1, { message: requiredMessage }),
	author: z.string().min(1, { message: requiredMessage }),
	music_image: z.string().min(1, { message: requiredMessage }),
	music_link: z.string().optional(),
	music_file: z.instanceof(FileList).optional()
})

export type AddMusicSchemaType = z.infer<typeof AddMusicSchema>
