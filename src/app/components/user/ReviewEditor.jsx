'use client'

const ReviewEditor = ({ value, onChange }) => {
	return (
		<div className="grid gap-2">
			<textarea 
				value={value}
				onChange={(e)=>onChange(e.target.value)}
				rows={8}
				className="w-full resize-y rounded-xl text-gray-500"/>
				<div className="text-right text-xs text-gray-500">{value.length} 文字</div>
		</div>
	)
}

export default ReviewEditor