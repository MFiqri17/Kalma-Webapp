import { create } from 'zustand'

type SidebarState = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
	isOpen: false,
	setIsOpen: (isOpen: boolean) => set({ isOpen }),
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}))
