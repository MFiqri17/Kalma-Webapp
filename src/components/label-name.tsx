export default function InputLabel({
	label,
	isMandatory = false,
	className
}: {
	label: string
	isMandatory?: boolean
	className?: string
}) {
	return (
		<p className={`flex gap-1 ${className}`}>
			{isMandatory && <span className="text-red-500">*</span>}
			{label}
		</p>
	)
}
