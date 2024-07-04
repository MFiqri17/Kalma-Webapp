'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { Button, Input, Select, SelectItem, Selection, Textarea } from '@nextui-org/react'
import { capitalCase, sentenceCase } from 'text-case'
import { useTranslations } from 'next-intl'
import { CreateArticleSchema } from '@/src/modules/types/validation/self-management'
import { CreateArticleSchemaType } from '@/src/modules/types/payload/self-management'
import { api } from '@/src/modules/utils/api'
import { useRouter } from '@/src/navigation'
import InputLabel from '../../label-name'

export default function ArticleForm() {
	const t = useTranslations('SELF_MANAGEMENT.ARTICLE')

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

	const router = useRouter()
	const [articleTypes, setArticleTypes] = useState<string[]>([''])
	const [contents, setContents] = useState<string[]>([''])

	const articleTypeName = [
		{
			key: '1',
			label: 'mental health'
		},
		{
			key: '2',
			label: 'youth mental health'
		},
		{
			key: '3',
			label: 'depression article'
		},
		{
			key: '4',
			label: 'stress article'
		},
		{
			key: '5',
			label: 'anxiety article'
		},
		{
			key: '6',
			label: 'adult mental health'
		},
		{
			key: '7',
			label: 'mental illness'
		},
		{
			key: '8',
			label: 'dare to care'
		}
	]

	const keyToLabelMap = articleTypeName.reduce(
		(map, article) => {
			map[article.key] = article.label
			return map
		},
		{} as Record<string, string>
	)

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
				router.back()
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
					variant="bordered"
					classNames={{
						base: 'max-w-5xl',
						inputWrapper: 'after:bg-kalma-blue-500',
						input: '!text-kalma-black-500 text-sm font-medium'
					}}
					label={
						<InputLabel
							className="text-base font-medium text-kalma-blue-500"
							isMandatory={true}
							label={capitalCase(t('FIELD.TITLE'))}
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

			<div className="mt-6">
				<p className="text-base font-medium text-kalma-blue-500">{capitalCase(t('FIELD.IMAGE'))}</p>
				<input {...register('image')} className="my-4" type="file" />
			</div>

			<Select
				label="Article Type"
				variant="bordered"
				placeholder="Select a type"
				selectedKeys={new Set(articleTypes)}
				selectionMode="multiple"
				className="max-w-5xl"
				onSelectionChange={(keys: Selection) => {
					const selectedKeysArray = Array.from(keys as Set<string>)
					const selectedLabelsArray = selectedKeysArray
						.map((key) => keyToLabelMap[key])
						.filter(Boolean)
					setArticleTypes(selectedKeysArray)
					setValue('article_type', selectedLabelsArray)
				}}
			>
				{articleTypeName.map((article) => (
					<SelectItem key={article.key}>{article.label}</SelectItem>
				))}
			</Select>

			{contents.map((content, index) => (
				<div key={index} className="mt-10">
					<Textarea
						value={content}
						onChange={(e) => handleContentChange(index, e.target.value)}
						variant="bordered"
						classNames={{
							base: 'max-w-5xl',
							inputWrapper: 'after:bg-kalma-blue-500',
							input: '!text-kalma-black-500 text-sm font-medium'
						}}
						label={
							index === 0 ? (
								<InputLabel
									className="text-base font-medium text-kalma-blue-500"
									isMandatory={true}
									label={capitalCase(t('FIELD.CONTENT'))}
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
						<Button type="button" onClick={handleAddContent} className="mt-2">
							Add Another Content
						</Button>
					)}
				</div>
			))}
		</form>
	)
}
