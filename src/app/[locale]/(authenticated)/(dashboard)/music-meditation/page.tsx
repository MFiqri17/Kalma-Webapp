import MusicCard from '@/src/components/musicCard'

export default function MusicMeditation() {
	const dataExample = [
		{
			key: 1,
			category: 'Calmness',
			author: 'Isaac Newton',
			title: 'A Music About Life'
		},
		{
			key: 2,
			category: 'Calmness',
			author: 'Isaac Newton',
			title: 'A Music About Life'
		},
		{
			key: 3,
			category: 'Calmness',
			author: 'Isaac Newton',
			title: 'A Music About Life'
		},
		{
			key: 4,
			category: 'Calmness',
			author: 'Isaac Newton',
			title: 'A Music About Life'
		},
		{
			key: 5,
			category: 'Calmness',
			author: 'Isaac Newton',
			title: 'A Music About Life'
		}
	]

	return (
		<div className="mt-6 w-500 pl-40">
			{dataExample.map((data) => (
				<div key={data.key} className="mb-5">
					<MusicCard author={data.author} category={data.category} title={data.title} />
				</div>
			))}
		</div>
	)
}
