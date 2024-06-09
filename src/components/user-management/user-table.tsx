// import React from 'react'
// import {
// 	Table,
// 	TableHeader,
// 	TableColumn,
// 	TableBody,
// 	TableRow,
// 	TableCell,
// 	User,
// 	Chip,
// 	Tooltip,
// 	ChipProps
// } from '@nextui-org/react'
// import { UserManagamentColumnType } from '@/src/modules/types'

// const statusColorMap: Record<string, ChipProps['color']> = {
// 	active: 'success',
// 	paused: 'danger',
// 	vacation: 'warning'
// }

// export default function UserManagementTable() {
// 	const renderCell = React.useCallback((user: UserManagamentColumnType, columnKey: React.Key) => {
// 		const cellValue = user[columnKey as keyof UserManagamentColumnType]

// 		switch (columnKey) {
// 			case 'NAME':
// 				return (
// 					<User
// 						avatarProps={{ radius: 'lg', src: user.avatar }}
// 						description={user.email}
// 						name={cellValue}
// 					>
// 						{user.email}
// 					</User>
// 				)
// 			case 'APPROVED':
// 				return (
// 					<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
// 						{cellValue}
// 					</Chip>
// 				)
// 			default:
// 				return (
// 					<div className="flex flex-col">
// 						<p className="text-bold text-sm capitalize">{cellValue}</p>
// 						<p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
// 					</div>
// 				)
// 		}
// 	}, [])

// 	return (
// 		<Table aria-label="Example table with custom cells">
// 			<TableHeader columns={columns}>
// 				{(column) => (
// 					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
// 						{column.name}
// 					</TableColumn>
// 				)}
// 			</TableHeader>
// 			<TableBody items={users}>
// 				{(item) => (
// 					<TableRow key={item.id}>
// 						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
// 					</TableRow>
// 				)}
// 			</TableBody>
// 		</Table>
// 	)
// }
