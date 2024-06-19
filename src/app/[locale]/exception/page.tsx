import ForbiddenAccess from '@/src/components/exception/forbidden-access'
import NotApproved from '@/src/components/exception/not-approved'

export default function Exception({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const status = searchParams.status
	const message = searchParams.message

	const getComponentError = () => {
		switch (status) {
			case '400':
				return <NotApproved message={String(message)} />
			case '403':
				return <ForbiddenAccess message={String(message)} />
		}
	}

	return <>{getComponentError()}</>
}
