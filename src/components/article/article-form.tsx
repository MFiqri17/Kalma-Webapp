'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { Button, Input, Select, SelectItem, Selection, Textarea, Tooltip } from '@nextui-org/react'
import { capitalCase, sentenceCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { MdDelete } from 'react-icons/md'
import { AxiosError } from 'axios'
import { CreateArticleSchema } from '@/src/modules/types/validation/self-management'
import { CreateArticlePayload } from '@/src/modules/types/payload/self-management'
import { useRouter } from '@/src/navigation'
import { postArticleData } from '@/src/modules/endpoints/self-management'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { ListArticleType } from '@/src/modules/constant/static-data'
import InputLabel from '../label-name'

export default function ArticleForm() {
	const t = useTranslations()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<CreateArticlePayload>({
		resolver: zodResolver(CreateArticleSchema),
		defaultValues: {
			title: '',
			article_type: [],
			content: []
		}
	})

	const router = useRouter()
	const [articleTypes, setArticleTypes] = useState<string[]>([])
	const [contents, setContents] = useState<string[]>([''])

	const createArticleMutation = useMutation<DefaultResponse, AxiosError<ErrorResponse>, FormData>({
		mutationFn: (articleData) => postArticleData(articleData),
		onSuccess: (data) => {
			toast.success(data.message)
			router.replace('/article')
		},
		onError: (error) => {
			if (error.response?.status === 400) {
				toast.error(error.response.data.message)
			}
		}
	})

	const onSubmit = (data: CreateArticlePayload) => {
		const formData = new FormData()
		formData.append('title', data.title)
		if (data.image && data.image.length > 1) {
			formData.append('image', data.image[0])
		}
		data.article_type.forEach((type, index) => {
			formData.append(`article_type[${index}]`, type)
		})
		data.content.forEach((content, index) => {
			formData.append(`content[${index}]`, content)
		})
		createArticleMutation.mutate(formData)
	}

	const handleAddContent = () => {
		setContents([...contents, ''])
	}

	const handleContentChange = (index: number, value: string) => {
		const newContents = [...contents]
		newContents[index] = value
		setContents(newContents)
		setValue('content', newContents)
	}

	const handleDeleteLastContent = () => {
		const newContents = [...contents]
		if (newContents.length != 1) {
			newContents.pop()
			setContents(newContents)
			setValue('content', newContents)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full" id="submit-hook-form">
			<div>
				<Input
					{...register('title')}
					variant="underlined"
					classNames={{
						inputWrapper: 'after:bg-kalma-blue-500',
						input: '!text-kalma-black-500 text-base font-medium'
					}}
					label={
						<InputLabel
							className="text-base font-medium text-black"
							isMandatory={true}
							label={capitalCase(t('SELF_MANAGEMENT.ARTICLE.FIELD.TITLE'))}
						/>
					}
					type="text"
					isInvalid={Boolean(errors.title?.message)}
					errorMessage={
						errors.title?.message && (
							<p className="mt-1 text-sm text-red-600">
								{sentenceCase(t(`GENERAL.VALIDATION.${errors.title.message}`))}
							</p>
						)
					}
				/>
			</div>

			<div className="mb-3 mt-6">
				<InputLabel
					className="text-base font-medium text-black"
					label={capitalCase(t('SELF_MANAGEMENT.ARTICLE.FIELD.IMAGE'))}
				/>
				<input {...register('image')} className="my-3 text-base text-black" type="file" />
			</div>
			<Select
				label={
					<InputLabel
						className="text-base font-medium text-black"
						isMandatory={true}
						label={capitalCase(t('SELF_MANAGEMENT.ARTICLE.FIELD.ARTICLE_TYPE'))}
					/>
				}
				variant="underlined"
				selectedKeys={new Set(articleTypes)}
				selectionMode="multiple"
				isInvalid={articleTypes.length === 0}
				errorMessage={
					articleTypes.length === 0 && (
						<p className="mt-1 text-sm text-red-600">
							{sentenceCase(t(`GENERAL.VALIDATION.REQUIRED`))}
						</p>
					)
				}
				classNames={{
					trigger: 'after:bg-kalma-blue-500',
					value: '!text-kalma-black-500 text-base font-medium'
				}}
				className="w-full"
				onSelectionChange={(keys: Selection) => {
					const selectedKeysArray = Array.from(keys as Set<string>)
					setArticleTypes(selectedKeysArray)
					setValue('article_type', selectedKeysArray)
				}}
			>
				{ListArticleType.map((item) => (
					<SelectItem key={item}>{capitalCase(item)}</SelectItem>
				))}
			</Select>
			<section className="my-6">
				<InputLabel
					className="text-base font-medium text-black"
					isMandatory={true}
					label={`${capitalCase(t('SELF_MANAGEMENT.ARTICLE.FIELD.CONTENT'))}`}
				/>
				{contents.map((content, index) => (
					<div key={index} className="mt-2 flex max-w-5xl flex-col">
						<div className="mb-3 flex items-center space-x-3">
							<Textarea
								value={content}
								onChange={(e) => handleContentChange(index, e.target.value)}
								variant="underlined"
								classNames={{
									inputWrapper: 'after:bg-kalma-blue-500',
									input: '!text-kalma-black-500 text-base font-medium'
								}}
								label={''}
								type="text"
								isInvalid={content === ''}
								errorMessage={
									content === '' && (
										<p className="mt-1 text-sm text-red-600">
											{sentenceCase(t(`GENERAL.VALIDATION.REQUIRED`))}
										</p>
									)
								}
							/>
							<Tooltip
								color="danger"
								content={capitalCase(t('SELF_MANAGEMENT.ARTICLE.ACTION.DELETE_CONTENT'))}
							>
								<Button
									isIconOnly
									className="cursor-pointer text-lg text-danger active:opacity-50"
									onClick={handleDeleteLastContent}
								>
									<MdDelete />
								</Button>
							</Tooltip>
						</div>
						{index === contents.length - 1 && (
							<Button
								type="button"
								onClick={handleAddContent}
								className="!w-40 bg-kalma-blue-500 text-base text-white"
							>
								{capitalCase(t('SELF_MANAGEMENT.ARTICLE.ACTION.ADD_CONTENT'))}
							</Button>
						)}
					</div>
				))}
			</section>
		</form>
	)
}
