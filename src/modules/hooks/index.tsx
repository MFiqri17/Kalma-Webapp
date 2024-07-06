import { useState, useCallback } from 'react'
import { GetDataPayload } from '../types/payload/general'

const useGetDataPayloadState = (initialState: GetDataPayload = {}) => {
	const [state, setState] = useState<GetDataPayload>(initialState)

	const setPayloadState = useCallback(
		(newState: Partial<GetDataPayload>, selectedFilter?: string) => {
			setState((prevState) => {
				let updatedState = { ...prevState, ...newState }

				if (selectedFilter === 'all') {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { filter_column, filter_value, ...rest } = updatedState
					updatedState = rest
				}

				return updatedState
			})
		},
		[]
	)

	return [state, setPayloadState] as const
}

export default useGetDataPayloadState
