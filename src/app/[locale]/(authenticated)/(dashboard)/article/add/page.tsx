import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'
import ArticleForm from '@/src/components/self-management/article/article-form'

const AddArticle = () => {
	const t = useTranslations('SELF_MANAGEMENT')

	return (
		<div className="flex flex-col pt-4">
			<h1 className="mb-6 text-2xl text-kalma-black-600">{capitalCase(t('ARTICLE.TITLE'))}</h1>
			<div className="mt-8">
				<ArticleForm />
			</div>
			<Button
				className="mt-6 w-48 rounded-full bg-kalma-blue-500 py-4 text-lg font-semibold text-white hover:bg-kalma-blue-500 hover:opacity-80 focus:bg-kalma-blue-500"
				type="submit"
				form="submit-hook-form"
			>
				{capitalCase(t('BUTTON_ACTION.SUBMIT'))}
			</Button>
		</div>
	)
}

export default AddArticle
