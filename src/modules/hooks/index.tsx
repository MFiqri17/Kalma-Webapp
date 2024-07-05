import { useState, useCallback } from 'react'
import { GetDataPayload } from '../types/payload/general'

const useGetDataPayloadState = (initialState: GetDataPayload = {}) => {
	const [state, setState] = useState<GetDataPayload>(initialState)

	const setPayloadState = useCallback((newState: Partial<GetDataPayload>) => {
		setState((prevState) => ({
			...prevState,
			...newState
		}))
	}, [])

	return [state, setPayloadState] as const
}

export default useGetDataPayloadState
