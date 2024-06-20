import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import { capitalCase } from 'text-case'

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
			hideCloseButton
			classNames={{
				base: 'bg-kalma-cream-300 text-black'
			}}
			isOpen={isOpen}
			size="lg"
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{capitalCase('MODAL MEDITASI MUSIK')}
						</ModalHeader>
						<ModalBody>{children}</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								{capitalCase('TUTUP')}
							</Button>
							<Button color="primary" form="submit-hook-form" type="submit">
								{capitalCase(actionText)}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
