import { z } from 'zod'
import { validateSQLInjection } from './general'

const requiredMessage = 'REQUIRED'
const containsSQLIMessage = 'SQLINJECTION'
const maximumImageSizeImage = 'MAXIMUMIMAGESIZE'
const invalidImageFormatMessage = 'INVALIDIMAGEFORMAT'
const invalidMusicFormatMessage = 'INVALIDMUSICFORMAT'
const supportedMusicFormat = ['mp3', 'mpeg']

const getFileFormatUsingSplit = (url: string): string => {
	const parts = url.split('.')
	return parts[parts.length - 1]
}

export const CreateArticleSchema = z.object({
	title: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	image: z
		.unknown()
		.transform((value) => value as FileList | null | undefined)
		.refine(
			(file) => {
				if (!file) return true
				if (!file[0]) return true
				return file[0]?.size <= 1024 * 1024
			},
			{ message: maximumImageSizeImage }
		)
		.refine(
			(file) => {
				if (!file) return true
				if (!file[0]) return true
				return file[0]?.type.startsWith('image/')
			},
			{
				message: invalidImageFormatMessage
			}
		)
		.optional(),
	article_type: z.array(
		z
			.string()
			.min(1, { message: requiredMessage })
			.trim()
			.refine(validateSQLInjection, { message: containsSQLIMessage })
	),
	content: z.array(
		z
			.string()
			.min(1, { message: requiredMessage })
			.trim()
			.refine(validateSQLInjection, { message: containsSQLIMessage })
	)
})

export const CreateMusicSchema = z.object({
	title: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	genre: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	author: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	music_image: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage }),
	music_link: z
		.string()
		.min(1, { message: requiredMessage })
		.trim()
		.refine(validateSQLInjection, { message: containsSQLIMessage })
		.refine(
			(value) => value && supportedMusicFormat.includes(getFileFormatUsingSplit(value)),
			invalidMusicFormatMessage
		)
		.optional(),
	music_file: z
		.unknown()
		.transform((value) => value as FileList | null | undefined)
		.refine(
			(file) => {
				if (!file) return true
				if (!file[0]) return true
				return file[0]?.type.startsWith('audio/')
			},
			{
				message: invalidMusicFormatMessage
			}
		)
		.optional()
})
