import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'
import { Button } from '@nextui-org/react'
import ArticleForm from '@/src/components/self-management/article/article-form'

export default function Article() {
	const t = useTranslations('SELF_MANAGEMENT')

	return (
		<div className="flex flex-col rounded-md border border-gray-300 p-6">
			<h1 className="mb-6 text-2xl text-kalma-black-600">{capitalCase(t('TITLE'))}</h1>
			<div className="my-8">
				<ArticleForm />
			</div>
			<Button
				className="mt-6 w-full rounded-full bg-kalma-blue-500 py-4 text-lg font-semibold text-white hover:bg-kalma-blue-500 hover:opacity-80 focus:bg-kalma-blue-500"
				type="submit"
				form="submit-hook-form"
			>
				{capitalCase(t('BUTTON.SUBMIT'))}
			</Button>
		</div>
	)
}
