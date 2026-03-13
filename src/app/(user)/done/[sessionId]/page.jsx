'use client'

import CopyButton from "@/app/components/user/CopyButton";
import { useParams, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react";

const page = () => {

	const params = useParams();
	const searchPrams = useSearchParams();

	const sessionId = params.sessionId;
	const rating = Number(searchPrams.get('rating') || 0);

	const [reviewText] = useState(
		'とても満足です。スタッフの対応も良く、安心して利用できました。また利用したいと思います。'
	);

	const isHighRating = useMemo(()=> rating >= 4, [rating])

	return (
		<main className="mx-auto max-w-[720px] px-4 py-6">
			<header className="mb-6">
				<p className="text-sm text-gray-500">投稿完了</p>
				<h1 className="text-xl font-bold">ご協力ありがとうございました</h1>
			</header>
			<section className="space-y-4">
				<div className="rounded-2xl border p-4">
					<p className="text-sm text-gray-600">評価</p>
					<p className="mt-1 text-lg font-semibold">{rating > 0 ? `${rating} / 5` : "未取得"}</p>
				</div>
			{ !isHighRating && (
				<>
					<div className="rounded-2xl border p-4">
						<h2 className="font-semibold">ご回答ありがとうございました</h2>
						<p className="mt-2 text-sm leading-relaxed text-gray-600">
							いただいたご意見は今後の改善に活かしてまいります。
						</p>
					</div>
					<a
					href={`/campaign/${sessionId}`}
					className="block w-full rounded-2xl bg-black px-4 py-4 text-center text-white"
					>
					キャンペーンを見る
					</a>
				</>
			)}
			{ isHighRating && (
				<>
					<div className="rounded-2xl border p-4">
						<h2 className="font-semibold">口コミをコピーして投稿できます</h2>
						<p className="mt-2 text-sm text-gray-600">
							下の文章をコピーして、Googleの口コミ投稿画面に貼り付けてください。
						</p>

						<div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm leading-relaxed">
							{reviewText}
						</div>

						<div className="mt-4">
							<CopyButton text={reviewText} />
						</div>
					</div>

					<a
					href="https://www.google.com/"
					target="_blank"
					rel="noreferrer"
					className="block w-full rounded-2xl bg-black px-4 py-4 text-center text-white"
					>
					Googleで口コミを書く
					</a>

					<a
					href={`/campaign/${sessionId}`}
					className="block w-full rounded-2xl border px-4 py-4 text-center"
					>
					キャンペーンを見る
					</a>
				</>
			)}
			</section>
		</main>
	)
}

export default page