import { IoJournalOutline } from 'react-icons/io5'
import { uniqueId } from 'lodash'
import { FiUsers } from 'react-icons/fi'
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { MdOutlineArticle } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'

export const LanguageData = [
	{
		id: uniqueId(),
		value: 'en',
		label: 'English',
		icon_path: '/usa.png'
	},
	{
		id: uniqueId(),
		value: 'id',
		label: 'Bahasa Indonesia',
		icon_path: '/indonesia.png'
	}
]

export const UserManagamentTableColumn = [
	{ id: uniqueId(), name_path: 'ID' },
	{ id: uniqueId(), name_path: 'NAME' },
	{ id: uniqueId(), name_path: 'AGE' },
	{ id: uniqueId(), name_path: 'APPROVED' },
	{ id: uniqueId(), name_path: 'LAST_LOGGED_IN' },
	{ id: uniqueId(), name_path: 'CREATED DATE' }
]

export const SidebarData = {
	PsychologMenu: [
		{
			id: uniqueId(),
			label_path: 'HOME',
			url_path: '/',
			icon: <IoHomeOutline className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'JOURNAL',
			url_path: '/users-journal',
			icon: <IoJournalOutline className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'JOURNAL',
			url_path: '/users-journal',
			icon: <IoJournalOutline className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'ARTICLE',
			url_path: '/article',
			icon: <MdOutlineArticle className="text-2xl" />
		}
	],
	AdminMenu: [
		{
			id: uniqueId(),
			label_path: 'HOME',
			url_path: '/',
			icon: <IoHomeOutline className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'ARTICLE',
			url_path: '/article',
			icon: <MdOutlineArticle className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'USER',
			url_path: '/user-management',
			icon: <FiUsers className="text-2xl" />
		},
		{
			id: uniqueId(),
			label_path: 'MUSIC',
			url_path: '/music-meditation',
			icon: <IoMusicalNotesOutline className="text-2xl" />
		}
	]
}