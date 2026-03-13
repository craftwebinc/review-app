'use client'

import { useParams } from "next/navigation"

const page = () => {
	const params = useParams();
	const sessionId = params.sessionId;
	
	return (
	<main className="mx-auto max-w-[720px] px-4 py-6">
		<header className="mb-6 text-center">
			<p className="text-sm text-gray-500">キャンペーン</p>
			<h1 className="text-xl font-bold">
			口コミ投稿ありがとうございました
			</h1>
		</header>

		<section className="rounded-2xl border p-6 text-center">
			<h2 className="text-lg font-semibold">
			🎉 特典プレゼント 🎉
			</h2>

			<p className="mt-3 text-sm text-gray-600 leading-relaxed">
			口コミ投稿いただいた方へ、
			次回ご利用いただける特典をご用意しています。
			</p>

			<div className="mt-6 rounded-xl bg-gray-100 p-4">
			<p className="text-sm text-gray-500">クーポンコード</p>
			<p className="mt-1 text-2xl font-mono font-bold">
				THANKS10
			</p>
			</div>

			<p className="mt-4 text-xs text-gray-500">
			※スタッフに画面をご提示ください
			</p>
		</section>

		<p className="mt-6 text-center text-xs text-gray-400">
			session: {sessionId}
		</p>
    </main>
	)
}

export default page