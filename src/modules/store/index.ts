import { create } from 'zustand'
import { GetRoleState, GetUserPropertyState, SidebarState } from '../types'

export const useSidebarStore = create<SidebarState>((set) => ({
	isOpen: false,
	setIsOpen: (isOpen: boolean) => set({ isOpen }),
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useGetRole = create<GetRoleState>((set) => ({
	role: 'user',
	setRole: (role) => set({ role })
}))

export const useGetUserProperty = create<GetUserPropertyState>((set) => ({
	data: null,
	setData: (data) => set({ data })
}))
