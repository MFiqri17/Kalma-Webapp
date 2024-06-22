import { capitalCase } from 'text-case'
import { z } from 'zod'

const requiredMessage = capitalCase('THE FIELD IS REQUIRED')

export const AddMusicSchema = z.object({
	title: z.string().min(1, { message: requiredMessage }),
	genre: z.string().min(1, { message: requiredMessage }),
	author: z.string().min(1, { message: requiredMessage }),
	music_link: z.string().min(1, { message: requiredMessage })
})

export type AddMusicSchemaType = z.infer<typeof AddMusicSchema>
