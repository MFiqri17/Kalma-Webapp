import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import React from 'react'

export default function MusicFormModal({
	isOpen,
	onOpenChange,
	children,
	actionText
}: {
	isOpen: boolean
	onOpenChange: (value: boolean) => void
	children: React.ReactNode
	actionText: string
}) {
	return (
		<Modal
			classNames={{
				base: 'bg-kalma-cream-300 text-black max-h-600'
			}}
			isOpen={isOpen}
			size="lg"
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="text-lg font-medium text-kalma-black-800">
							{actionText}
						</ModalHeader>
						{children}
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
