import { capitalCase } from 'text-case'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddMusicSchema, AddMusicSchemaType } from '@/src/modules/validation/musicValidation'
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
		getValues,
		reset,
		formState: { errors }
	} = useForm<AddMusicSchemaType>({
		resolver: zodResolver(AddMusicSchema),
		defaultValues: {
			title: '',
			genre: '',
			author: '',
			music_link: ''
		}
	})

	const submitHandler = () => {
		const payload: AddMusicSchemaType = {
			title: getValues('title'),
			genre: getValues('genre'),
			author: getValues('author'),
			music_link: getValues('music_link')
		}
		// eslint-disable-next-line no-console
		console.log(payload)
		reset({
			title: '',
			genre: '',
			author: '',
			music_link: ''
		})
	}

	const handleModalChange = (value: boolean) => {
		onOpenChange(value)
		if (!value) {
			reset(
				{
					title: '',
					genre: '',
					author: '',
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
						label={capitalCase('JUDUL MUSIK')}
						labelPlacement="outside"
						placeholder={capitalCase('JUDUL MUSIK')}
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
						label={capitalCase('GENRE MUSIK')}
						labelPlacement="outside"
						placeholder={capitalCase('GENRE MUSIK')}
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
						label={capitalCase('PENGARANG MUSIK')}
						labelPlacement="outside"
						placeholder={capitalCase('PENGARANG MUSIK')}
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
						label={capitalCase('LINK MUSIK')}
						labelPlacement="outside"
						placeholder={capitalCase('LINK MUSIK')}
						radius="sm"
						variant="bordered"
					/>
				</div>
			</form>
		</MusicFormModal>
	)
}
