import React from 'react'
import { capitalCase } from 'text-case'
import { Input } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { AddMusicSchema, AddMusicSchemaType } from '@/src/modules/types/validation/self-management'
import { api } from '@/src/modules/utils/api'
import MusicFormModal from './static/musicFormModal'

export default function Add({
	isOpen,
	onOpenChange
}: {
	isOpen: boolean
	onOpenChange: (value: boolean) => void
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<AddMusicSchemaType>({
		resolver: zodResolver(AddMusicSchema),
		defaultValues: {
			title: '',
			genre: '',
			author: '',
			music_image: '',
			music_link: ''
		}
	})
	const t = useTranslations('SELF_MANAGEMENT.MUSIC')

	const submitHandler: SubmitHandler<AddMusicSchemaType> = async (data) => {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('author', data.author)
		formData.append('genre', data.genre)
		formData.append('music_image', data.music_image)
		if (data.music_link) formData.append('music_link', data.music_link)
		if (data.music_file && data.music_file.length > 0) {
			formData.append('music_file', data.music_file[0])
		}

		try {
			const response = await api.post('/self-management/music-meditation/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			// eslint-disable-next-line no-console
			console.log('Success:', response.data)
			toast.success(capitalCase(t('WARNING.SUCCESS_POST')))
			reset()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error:', error)
			toast.error(capitalCase(t('WARNING.FAILED_POST')))
		}
	}

	const handleModalChange = (value: boolean) => {
		onOpenChange(value)
		if (!value) {
			reset(
				{
					title: '',
					genre: '',
					author: '',
					music_image: '',
					music_link: ''
				},
				{
					keepErrors: false
				}
			)
		}
	}

	return (
		<MusicFormModal actionText="TAMBAHKAN" isOpen={isOpen} onOpenChange={handleModalChange}>
			<form id="submit-hook-form" onSubmit={handleSubmit(submitHandler)}>
				<div className="flex flex-col space-y-14">
					<Input
						{...register('title')}
						classNames={{
							input: '!text-black',
							label: '!text-black'
						}}
						errorMessage={errors.title?.message}
						isInvalid={Boolean(errors.title?.message)}
						label={capitalCase(t('FIELD.TITLE'))}
						labelPlacement="outside"
						placeholder={capitalCase(t('FIELD.TITLE'))}
						radius="sm"
						variant="bordered"
					/>
					<Input
						{...register('genre')}
						classNames={{
							input: '!text-black',
							label: '!text-black'
						}}
						errorMessage={errors.genre?.message}
						isInvalid={Boolean(errors.genre?.message)}
						label={capitalCase(t('FIELD.GENRE'))}
						labelPlacement="outside"
						placeholder={capitalCase(t('FIELD.GENRE'))}
						radius="sm"
						variant="bordered"
					/>
					<Input
						{...register('author')}
						classNames={{
							input: '!text-black',
							label: '!text-black'
						}}
						errorMessage={errors.author?.message}
						isInvalid={Boolean(errors.author?.message)}
						label={capitalCase(t('FIELD.AUTHOR'))}
						labelPlacement="outside"
						placeholder={capitalCase(t('FIELD.AUTHOR'))}
						radius="sm"
						variant="bordered"
					/>
					<Input
						{...register('music_image')}
						classNames={{
							input: '!text-black',
							label: '!text-black'
						}}
						errorMessage={errors.music_image?.message}
						isInvalid={Boolean(errors.music_image?.message)}
						label={capitalCase(t('FIELD.IMAGE'))}
						labelPlacement="outside"
						placeholder={capitalCase(t('FIELD.IMAGE'))}
						radius="sm"
						variant="bordered"
					/>
					<Input
						{...register('music_link')}
						classNames={{
							input: '!text-black',
							label: '!text-black'
						}}
						errorMessage={errors.music_link?.message}
						isInvalid={Boolean(errors.music_link?.message)}
						label={capitalCase(t('FIELD.MUSIC_LINK'))}
						labelPlacement="outside"
						placeholder={capitalCase(t('FIELD.MUSIC_LINK'))}
						radius="sm"
						variant="bordered"
					/>
					<div className="mt-6">
						<p className="text-sm text-black">{capitalCase(t('FIELD.MUSIC_FILE'))}</p>
						<input className="my-4" type="file" {...register('music_file')} />
						{errors.music_file && <span>{errors.music_file.message}</span>}
					</div>
				</div>
			</form>
		</MusicFormModal>
	)
}
