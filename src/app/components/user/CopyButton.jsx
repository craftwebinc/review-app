'use client'

import { useState } from "react";

const CopyButton = ({text}) => {

	const [copied, setCopied] = useState(false);

	const handleCopy = async ()=>{
		try{
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(()=> setCopied(false), 2000)
		}catch(error){
			console.error('コピーに失敗しました',error);
			alert('コピーに失敗しました');
		}
	}

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="w-full rounded-2xl border px-4 py-3">
			{copied ? 'コピーしました':'口コミ文をコピー'}
		</button>
	)
}

export default CopyButton;