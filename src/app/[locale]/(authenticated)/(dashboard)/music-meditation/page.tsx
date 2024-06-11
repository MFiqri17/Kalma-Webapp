'use client'
import TableList from '@/src/components/tableList'

type MusicData = {
	id: string
	title: string
	author: string
	genre: string
	music_link: string
}

type HeadCell = {
	key: keyof MusicData
	label: string
}

export default function MusicMeditation() {
	const headCell: HeadCell[] = [
		{
			key: 'id',
			label: 'Id'
		},
		{
			key: 'title',
			label: 'Title'
		},
		{
			key: 'genre',
			label: 'Genre'
		},
		{
			key: 'author',
			label: 'Author'
		},
		{
			key: 'music_link',
			label: 'Music Link'
		}
	]

	const dataExample: MusicData[] = [
		{
			id: '1',
			title: 'Piano Quartet Piazzo',
			genre: 'Instrumental',
			author: 'Mozart',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '2',
			title: 'Nature Voice - Rain Forest Calming Sound',
			genre: 'Nature',
			author: 'Nature Amazing Sound',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '3',
			title: 'Nature Sound of Thunder Rain at Night',
			genre: 'Nature',
			author: 'Nature Amazing Sound',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '4',
			title: 'Chopin Nocturne Op. 9 No. 2',
			genre: 'Instrumental',
			author: 'Francisco Tárrega',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '5',
			title: 'ONE',
			genre: 'Instrumental',
			author: 'DEPAPEPE',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '6',
			title: 'Wedding Bell',
			genre: 'Instrumental',
			author: 'DEPAPEPE',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		},
		{
			id: '7',
			title: 'Bird Sound in the Morning',
			genre: 'Nature',
			author: 'Nature Amazing Sound',
			music_link: 'https://youtu.be/6Ufq1RrJuDo?si=X2X2w8Mu7RLL1oWs'
		}
	]

	return (
		<div className="mt-6 flex w-full flex-col pl-10">
			<h1 className="pb-6 text-4xl text-kalma-black-900">Music List</h1>
			<TableList columns={headCell} data={dataExample} />
		</div>
	)
}
