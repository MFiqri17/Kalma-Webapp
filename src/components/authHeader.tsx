const GeneralHeaders = ({
	title,
	subtitle,
	classname
}: {
	title: string
	subtitle: string
	classname?: string
}) => {
	return (
		<div className={`text-center ${classname}`}>
			<h1 className="text-3xl font-bold text-black">{title}</h1>
			<p className="mt-3 text-xl font-medium text-[#585858]">{subtitle}</p>
		</div>
	)
}

export default GeneralHeaders
