import { IoJournalOutline } from 'react-icons/io5'
import { uniqueId } from 'lodash'
import { FiUsers } from 'react-icons/fi'
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { MdOutlineArticle } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { LanguageType } from '../types'

export const LanguageData: LanguageType[] = [
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

export const LoginData = [
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.EMAILORUSERNAME',
		name: 'email_or_username',
		type: 'text'
	},
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.PASSWORD',
		name: 'password',
		type: 'password'
	}
]

export const RegisterData = [
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.NAME',
		name: 'full_name',
		type: 'text'
	},
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.USERNAME',
		name: 'username',
		type: 'text'
	},
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.EMAIL',
		name: 'email',
		type: 'text'
	},
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.AGE',
		name: 'age',
		type: 'text'
	},
	{
		id: uniqueId(),
		label_path: 'FIELDLABEL.PASSWORD',
		name: 'password',
		type: 'text'
	}
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

export const ListMusicImages = [
	{
		name: 'Lake',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980748/lake_eliscl.jpg'
	},
	{
		name: 'Night Sky',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980749/night_sky_gp7ifv.jpg'
	},
	{
		name: 'Mountain',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980748/mountain_hewhlv.jpg'
	},
	{
		name: 'River',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980748/river_kmqgil.jpg'
	},
	{
		name: 'Beach',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980748/beach_zjvnsp.jpg'
	},
	{
		name: 'Forest',
		url: 'https://res.cloudinary.com/dol4595k7/image/upload/v1718980747/forest_kvt6me.jpg'
	}
]

export const ListMusicGenre = ['nature', 'instrumental']
export const ListArticleType = [
	'mental health',
	'youth mental health',
	'depression article',
	'stress article',
	'anxiety article',
	'adult mental health',
	'mental illness',
	'dare to care'
]

export const MusicMeditationTableColumn = [
	{
		key: 'title',
		label_path: 'TITLE'
	},
	{
		key: 'genre',
		label_path: 'GENRE'
	},
	{
		key: 'author',
		label_path: 'AUTHOR'
	},
	{
		key: 'created_by',
		label_path: 'CREATED_BY'
	},
	{
		key: 'created_date',
		label_path: 'CREATED_DATE'
	},
	{
		key: 'action',
		label_path: 'ACTION'
	}
]

export const ArticleTableColumn = [
	{
		key: 'title',
		label_path: 'TITLE'
	},
	{
		key: 'article_type',
		label_path: 'ARTICLE_TYPE'
	},
	{
		key: 'created_by',
		label_path: 'CREATED_BY'
	},
	{
		key: 'created_date',
		label_path: 'CREATED_DATE'
	},
	{
		key: 'action',
		label_path: 'ACTION'
	}
]

export const MusicFilter = [
	{
		name: 'All',
		value: 'all',
		column: 'all'
	},
	{
		name: 'Nature',
		value: 'nature',
		column: 'genre'
	},
	{
		name: 'Instrumental',
		value: 'instrumental',
		column: 'genre'
	}
]

export const ArticleFilter = [
	{
		name: 'All',
		value: 'all',
		column: 'all'
	},
	{
		name: 'Mental Health',
		value: 'mental health',
		column: 'article_type'
	},
	{
		name: 'Youth Mental Health',
		value: 'youth mental health',
		column: 'article_type'
	},
	{
		name: 'Depression Article',
		value: 'depression article',
		column: 'article_type'
	},
	{
		name: 'Stress Article',
		value: 'stress article',
		column: 'article_type'
	},
	{
		name: 'Anxiety Article',
		value: 'anxiety article',
		column: 'article_type'
	},
	{
		name: 'Adult Mental Health',
		value: 'adult mental health',
		column: 'article_type'
	},
	{
		name: 'Mental Illness',
		value: 'mental illness',
		column: 'article_type'
	},
	{
		name: 'Dare to Care',
		value: 'dare to care',
		column: 'article_type'
	}
]
