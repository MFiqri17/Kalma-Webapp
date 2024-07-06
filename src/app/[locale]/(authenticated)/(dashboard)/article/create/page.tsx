import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { capitalCase } from 'text-case'
import ArticleForm from '@/src/components/article/article-form'

const AddArticle = () => {
	const t = useTranslations('SELF_MANAGEMENT')

	return (
		<section>
			<div className="bg-transparent lg:px-48">
				<section className="sticky top-0 flex w-full justify-between">
					<h1 className="text-xl font-semibold text-kalma-black-600">
						{capitalCase(t('ARTICLE.ACTION.CREATE'))}
					</h1>
				</section>
				<section className="my-3">
					<ArticleForm />
				</section>
				<section className="flex justify-end">
					<Button
						className="!w-28 bg-kalma-blue-500 text-base text-white"
						type="submit"
						form="submit-hook-form"
					>
						{capitalCase('SUBMIT')}
					</Button>
				</section>
			</div>
		</section>
	)
}

export default AddArticle
