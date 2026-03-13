'use client'

const CheckboxGroup = ({options, value, onChange}) => {

	const toggle = (id)=>{
		if(value.includes(id)) onChange(value.filter((v) => v !== id))
		else onChange([...value, id])
	}

	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
			{options.map((opt)=>(
				<label key={opt.id}
					className="flex cursor-pointer items-center gap-2 rounded-xl border p-3">
					<input 
						type="checkbox"
						checked={value.includes(opt.id)}
						onChange={()=>toggle(opt.id)}
						className="h-4 w-4"/>
					<span className="text-sm">{opt.label}</span>
				</label>
			))}
		</div>
	)
}

export default CheckboxGroup