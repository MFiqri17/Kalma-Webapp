'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { Input } from '@nextui-org/react'
import { capitalCase, sentenceCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { CreateArticleSchema } from '@/src/modules/types/validation/self-management'
import { CreateArticleSchemaType } from '@/src/modules/types/payload/self-management'
import { api } from '@/src/modules/utils/api'
import InputLabel from '../../label-name'

export default function ArticleForm() {
	const t = useTranslations('SELF_MANAGEMENT')

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<CreateArticleSchemaType>({
		resolver: zodResolver(CreateArticleSchema),
		defaultValues: {
			title: '',
			article_type: [''],
			content: ['']
		}
	})

	const [articleTypes, setArticleTypes] = useState<string[]>([''])
	const [contents, setContents] = useState<string[]>([''])

	const createArticleMutation = useMutation(
		async (data: CreateArticleSchemaType) => {
			const formData = new FormData()
			formData.append('title', data.title)
			if (data.image) {
				formData.append('image', data.image)
			}
			data.article_type.forEach((type, index) => {
				formData.append(`article_type[${index}]`, type)
			})
			data.content.forEach((content, index) => {
				formData.append(`content[${index}]`, content)
			})

			const response = await api.post('/article', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			return response.data
		},
		{
			onSuccess: (data) => {
				toast.success('Article created successfully!')
				// eslint-disable-next-line no-console
				console.log(data)
			},
			onError: (error) => {
				toast.error('Failed to create article.')
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}
	)

	const onSubmit: SubmitHandler<CreateArticleSchemaType> = (data) => {
		createArticleMutation.mutate(data)
	}

	const handleAddArticleType = () => {
		setArticleTypes([...articleTypes, ''])
	}

	const handleArticleTypeChange = (index: number, value: string) => {
		const newArticleTypes = [...articleTypes]
		newArticleTypes[index] = value
		setArticleTypes(newArticleTypes)
		setValue('article_type', newArticleTypes)
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

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="submit-hook-form">
			<div>
				<Input
					{...register('title')}
					variant="underlined"
					classNames={{
						inputWrapper: 'after:bg-kalma-blue-500',
						input: '!text-kalma-black-500 text-sm font-medium'
					}}
					label={
						<InputLabel
							className="text-base font-medium text-kalma-blue-500"
							isMandatory={true}
							label={capitalCase(t('title'))}
						/>
					}
					type="text"
					isInvalid={Boolean(errors.title?.message)}
					errorMessage={
						errors.title?.message && (
							<p className="mt-1 text-sm text-red-600">
								{sentenceCase(t(`ARTICLE.VALIDATION.${errors.title.message}`))}
							</p>
						)
					}
				/>
			</div>

			<div>
				<input
					{...register('image')}
					className="my-4"
					type="file"
					onChange={(e) => {
						setValue('image', e && e.target && e.target.files && e.target.files[0])
					}}
				/>
			</div>

			{articleTypes.map((type, index) => (
				<div key={index}>
					<Input
						value={type}
						onChange={(e) => handleArticleTypeChange(index, e.target.value)}
						variant="underlined"
						classNames={{
							inputWrapper: 'after:bg-kalma-blue-500',
							input: '!text-kalma-black-500 text-sm font-medium'
						}}
						label={
							index === 0 ? (
								<InputLabel
									className="text-base font-medium text-kalma-blue-500"
									isMandatory={true}
									label={capitalCase(t('article_type'))}
								/>
							) : null
						}
						type="text"
						isInvalid={Boolean(errors.article_type?.[index]?.message)}
						errorMessage={
							errors.article_type?.[index]?.message && (
								<p className="mt-1 text-sm text-red-600">
									{sentenceCase(t(`ARTICLE.VALIDATION.${errors.article_type?.[index]?.message}`))}
								</p>
							)
						}
					/>
					{index === articleTypes.length - 1 && (
						<button type="button" onClick={handleAddArticleType}>
							Add Another Article Type
						</button>
					)}
				</div>
			))}

			{contents.map((content, index) => (
				<div key={index}>
					<Input
						value={content}
						onChange={(e) => handleContentChange(index, e.target.value)}
						variant="underlined"
						classNames={{
							inputWrapper: 'after:bg-kalma-blue-500',
							input: '!text-kalma-black-500 text-sm font-medium'
						}}
						label={
							index === 0 ? (
								<InputLabel
									className="text-base font-medium text-kalma-blue-500"
									isMandatory={true}
									label={capitalCase(t('content'))}
								/>
							) : null
						}
						type="text"
						isInvalid={Boolean(errors.content?.[index]?.message)}
						errorMessage={
							errors.content?.[index]?.message && (
								<p className="mt-1 text-sm text-red-600">
									{sentenceCase(t(`ARTICLE.VALIDATION.${errors.content?.[index]?.message}`))}
								</p>
							)
						}
					/>
					{index === contents.length - 1 && (
						<button type="button" onClick={handleAddContent}>
							Add Another Content
						</button>
					)}
				</div>
			))}
		</form>
	)
}
