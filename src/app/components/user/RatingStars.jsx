'use client'

const RatingStars = ({value, onChange}) => {
	return (
		<div className="flex items-center gap-2">
			{[1,2,3,4,5].map((n)=>(
				<button
					key={n}
					type="button"
					onClick={()=>{onChange(n)}}
					className="text-3xl leading-none"
					aria-label={`${n}星`}
				>
					<span className={n<= value?'':'opacity-20'}>★</span>
				</button>
			))}
		</div>
	)
}

export default RatingStars