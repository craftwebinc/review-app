'use client'

const AttributeForms = ({ value, onChange }) => {
	return (
		<div className="grid gap-3 sm:grid-cols-2">
			<label className="grid gap-1">
				<span className="text-sm text-gray-700">年代</span>
				<select 
					value={value.age}
					onChange={(e)=>onChange({...value, age:e.target.value})}
					className="rounded-xl border px-3 py-2">
						<option value="">選択しない</option>
						<option value="10代">10代</option>
						<option value="20代">20代</option>
						<option value="30代">30代</option>
						<option value="30代">30代</option>
						<option value="50代">50代</option>
						<option value="60代以上">60代以上</option>
					</select>
			</label>
			<label className="grid gap-1">
				<span className="text-sm text-gray-700">性別</span>
				<select 
					value={value.gender}
					onChange={(e)=>onChange({...value, gender:e.target.value})}
					className="rounded-xl border px-3 py-2">
						<option value="">選択しない</option>
						<option value="男性">男性</option>
						<option value="女性">女性</option>
					</select>
			</label>
		</div>
	)
}

export default AttributeForms