'use client'
export default function GeneralLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen items-center justify-center bg-[url('/bg_webapp_kalma.svg')] bg-cover">
			<div className="flex max-h-[700px] w-[500px] flex-col justify-center rounded-3xl bg-white p-12">
				{children}
			</div>
		</div>
	)
}
