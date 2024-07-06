import React, { useEffect, useState } from 'react'
import { capitalCase, sentenceCase } from 'text-case'
import { Input, Select, SelectItem, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { postMusicData } from '@/src/modules/endpoints/self-management'
import { CreateMusicPayload } from '@/src/modules/types/payload/self-management'
import { CreateMusicSchema } from '@/src/modules/types/validation/self-management'
import { ListMusicGenre, ListMusicImages } from '@/src/modules/constant/static-data'
import InputLabel from '../label-name'
import MusicFormModal from './static/musicFormModal'
import AudioPlayerComponent from './static/audioPlayer'

export default function CreateMusic({
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
		watch,
		formState: { errors }
	} = useForm<CreateMusicPayload>({
		resolver: zodResolver(CreateMusicSchema),
		defaultValues: {
			title: '',
			genre: '',
			author: '',
			music_image: ''
		}
	})
	const t = useTranslations()
	const queryQlient = useQueryClient()
	const [musicFilePreview, setMusicFilePreview] = useState<string | null>(null)
	const [isMusicFile, setIsMusicFile] = useState<boolean>(true)
	const watchMusicFile = watch('music_file')
	const watchMusicLink = watch('music_link')
	const watchImageLink = watch('music_image')

	useEffect(() => {
		if (watchMusicFile && watchMusicFile.length > 0) {
			const file = watchMusicFile
			const reader = new FileReader()
			reader.onloadend = () => {
				setMusicFilePreview(reader.result as string)
			}
			reader.readAsDataURL(file[0])
		}
	}, [watchMusicFile])

	const addMusicMutation = useMutation<DefaultResponse, AxiosError<ErrorResponse>, FormData>({
		mutationFn: (musicData) => postMusicData(musicData),
		onSuccess: (data) => {
			toast.success(data.message)
			queryQlient.invalidateQueries('getMusic')
			handleModalChange(false)
		},
		onError: (error) => {
			if (error.response?.status === 400) {
				toast.error(error.response.data.message)
			}
		}
	})

	const onSubmit = async (data: CreateMusicPayload) => {
		const formData = new FormData()
		Object.entries(data).forEach(([key, value]) => {
			if (value instanceof FileList && value.length > 0) {
				formData.append(key, value[0])
			} else if (value) {
				formData.append(key, value as string)
			}
		})
		return addMusicMutation.mutate(formData)
	}

	const handleModalChange = (value: boolean) => {
		onOpenChange(value)
		if (!value) {
			setMusicFilePreview(null)
			reset(
				{
					title: '',
					genre: '',
					author: '',
					music_image: ''
				},
				{
					keepErrors: false
				}
			)
		}
	}

	return (
		<MusicFormModal
			actionText={capitalCase(t('SELF_MANAGEMENT.MUSIC.ACTION.CREATE'))}
			isOpen={isOpen}
			onOpenChange={handleModalChange}
		>
			<ModalBody className="px-3 md:px-6">
				<form id="submit-hook-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col space-y-10">
						<Input
							{...register('title')}
							errorMessage={
								errors?.title?.message && (
									<p className="mt-1 text-sm text-red-600">
										{sentenceCase(t(`GENERAL.VALIDATION.${errors?.title?.message}`))}
									</p>
								)
							}
							isInvalid={Boolean(errors.title?.message)}
							label={
								<InputLabel
									className="text-sm text-black"
									label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.TITLE'))}
									isMandatory={true}
								/>
							}
							placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.TITLE'))}
							radius="sm"
							labelPlacement="outside"
							variant="bordered"
						/>
						<Select
							{...register('genre')}
							className="w-full"
							errorMessage={
								errors?.genre?.message && (
									<p className="mt-1 text-sm text-red-600">
										{sentenceCase(t(`GENERAL.VALIDATION.${errors?.genre?.message}`))}
									</p>
								)
							}
							isInvalid={Boolean(errors.genre?.message)}
							label={
								<InputLabel
									className="text-sm text-black"
									label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.GENRE'))}
									isMandatory={true}
								/>
							}
							placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.GENRE'))}
							radius="sm"
							labelPlacement="outside"
							variant="bordered"
						>
							{ListMusicGenre.map((data) => (
								<SelectItem key={data}>{capitalCase(data)}</SelectItem>
							))}
						</Select>
						<Input
							{...register('author')}
							errorMessage={
								errors?.author?.message && (
									<p className="mt-1 text-sm text-red-600">
										{sentenceCase(t(`GENERAL.VALIDATION.${errors?.author?.message}`))}
									</p>
								)
							}
							isInvalid={Boolean(errors.author?.message)}
							label={
								<InputLabel
									className="text-sm text-black"
									label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.AUTHOR'))}
									isMandatory={true}
								/>
							}
							placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.AUTHOR'))}
							radius="sm"
							labelPlacement="outside"
							variant="bordered"
						/>
						<Select
							{...register('music_image')}
							errorMessage={
								errors?.music_image?.message && (
									<p className="mt-1 text-sm text-red-600">
										{sentenceCase(t(`GENERAL.VALIDATION.${errors?.music_image?.message}`))}
									</p>
								)
							}
							isInvalid={Boolean(errors.music_image?.message)}
							label={
								<InputLabel
									className="text-sm text-black"
									label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.IMAGE'))}
									isMandatory={true}
								/>
							}
							placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.IMAGE'))}
							radius="sm"
							startContent={
								watchImageLink && (
									<Image src={watchImageLink} width={40} height={40} alt={watchImageLink} />
								)
							}
							labelPlacement="outside"
							variant="bordered"
						>
							{ListMusicImages.map((data) => (
								<SelectItem key={data.url}>{data.name}</SelectItem>
							))}
						</Select>
						<Select
							label={
								<InputLabel
									className="text-sm text-black"
									label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.MUSIC SOURCE'))}
									isMandatory={true}
								/>
							}
							placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.MUSIC SOURCE'))}
							defaultSelectedKeys={['File']}
							labelPlacement="outside"
							variant="bordered"
							disallowEmptySelection
						>
							<SelectItem key={'File'} onPress={() => setIsMusicFile(true)}>
								File
							</SelectItem>
							<SelectItem key={'Link'} onPress={() => setIsMusicFile(false)}>
								Link
							</SelectItem>
						</Select>
						{isMusicFile ? (
							<>
								<div className="!mt-3">
									<InputLabel
										className="text-sm text-black"
										label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.MUSIC_FILE'))}
										isMandatory={true}
									/>
									<input className="mb-1 mt-2 text-sm" type="file" {...register('music_file')} />
									{errors.music_file && (
										<p className="mt text-sm text-red-600">
											{sentenceCase(t(`GENERAL.VALIDATION.${errors?.music_file?.message}`))}
										</p>
									)}
								</div>
								{musicFilePreview && watchMusicFile && !Boolean(errors?.music_file?.message) && (
									<AudioPlayerComponent music_link={musicFilePreview} />
								)}
							</>
						) : (
							<>
								<Input
									{...register('music_link')}
									errorMessage={
										errors?.music_link?.message && (
											<p className="mt-1 text-sm text-red-600">
												{sentenceCase(t(`GENERAL.VALIDATION.${errors?.music_link?.message}`))}
											</p>
										)
									}
									isInvalid={Boolean(errors.music_link?.message)}
									label={
										<InputLabel
											className="text-sm text-black"
											label={capitalCase(t('SELF_MANAGEMENT.MUSIC.FIELD.MUSIC_LINK'))}
											isMandatory={true}
										/>
									}
									placeholder={sentenceCase(t('SELF_MANAGEMENT.MUSIC.PLACEHOLDER.MUSIC_LINK'))}
									radius="sm"
									labelPlacement="outside"
									variant="bordered"
								/>
								{watchMusicLink && !Boolean(errors?.music_link?.message) && (
									<AudioPlayerComponent music_link={watchMusicLink} />
								)}
							</>
						)}
					</div>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button
					isIconOnly={addMusicMutation.isLoading}
					isLoading={addMusicMutation.isLoading}
					form="submit-hook-form"
					type="submit"
					className="!w-24 bg-kalma-blue-500 text-white"
				>
					Submit
				</Button>
			</ModalFooter>
		</MusicFormModal>
	)
}
