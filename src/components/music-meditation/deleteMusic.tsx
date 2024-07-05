import { useMutation, useQueryClient } from 'react-query'
import { useTranslations } from 'next-intl'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { sentenceCase } from 'text-case'
import { Button, ModalFooter, ModalBody } from '@nextui-org/react'
import { deleteMusicById } from '@/src/modules/endpoints/self-management'
import { DefaultResponse, ErrorResponse } from '@/src/modules/types/response/general'
import { MusicDataResponse } from '@/src/modules/types/response/self-management'
import MusicFormModal from './static/musicFormModal'
export default function DeleteMusic({
	isOpen,
	onOpenChange,
	data
}: {
	isOpen: boolean
	onOpenChange: (value: boolean) => void
	data: Pick<MusicDataResponse, 'id' | 'title'>
}) {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const deleteMusicMutaion = useMutation<DefaultResponse, AxiosError<ErrorResponse>, string>({
		mutationFn: (id) => deleteMusicById(id),
		onSuccess: (data) => {
			toast.success(data.message)
			onOpenChange(false)
			queryClient.invalidateQueries('getMusic')
		}
	})

	return (
		<MusicFormModal
			actionText={sentenceCase(t('SELF_MANAGEMENT.MUSIC.ACTION.DELETE'))}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalBody>
				<p className="text-center text-base">
					{sentenceCase(t('SELF_MANAGEMENT.MUSIC.WARNING.DELETE_MUSIC') + ` ${data.title}`)}
				</p>
			</ModalBody>
			<ModalFooter>
				<Button
					isIconOnly={deleteMusicMutaion.isLoading}
					isLoading={deleteMusicMutaion.isLoading}
					onClick={() => deleteMusicMutaion.mutate(data.id)}
					color="danger"
					className="w-12 text-white"
				>
					Submit
				</Button>
			</ModalFooter>
		</MusicFormModal>
	)
}
