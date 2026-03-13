'use client'

import { useParams,useRouter } from "next/navigation"
import { useEffect } from "react"

const page = () => {

	const params = useParams()
	const router = useRouter()

	const storeCode = params.storeCode;

	useEffect(()=>{
		const timer = setTimeout(()=>{
			router.replace('/review/mock-session-001');
		},800)

		return ()=>clearTimeout(timer)
	},[router])

	return (
		<main className="flex min-h-[100dvh] items-center justify-center px-4">
			<div className="w-full max-w-[420px] rounded-2xl border p-6 text-center">
				<p className="text-sm text-gray-500">店舗コード</p>
				<p className="mt-1 font-mono text-lg">{storeCode}</p>

				<div className="my-6 flex justify-center">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
				</div>

				<h1 className="text-lg font-semibold">口コミページへ移動しています</h1>
				<p className="mt-2 text-sm text-gray-600">
				しばらくそのままでお待ちください。
				</p>
			</div>
    </main>
	)
}

export default page