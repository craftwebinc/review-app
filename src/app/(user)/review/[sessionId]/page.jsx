'use client'

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

const CHECK_OPTIONS = [
	{ id: 'service', label: '接客が丁寧' },
	{ id: 'clean', label: '清潔感がある' },
	{ id: 'mood', label: '雰囲気が良い' },
	{ id: 'speed', label: '提供がスムーズ' },
	{ id: 'price', label: '価格に満足' },
	{ id: 'quality', label: '品質が良い' },
	{ id: 'explain', label: '説明がわかりやすい' },
	{ id: 'access', label: '立地が便利' },
	{ id: 'repeat', label: 'また来たい' },
	{ id: 'recommend', label: '人におすすめしたい' },
]

function buildMockReview({ rating, tags, attrs }){
	const tagText = tags.length ? `特に「${tags.join('・')}」が印象的でした。` : ''
	const purpose = attrs.purpose ? `（${attrs.purpose}で利用）` : ''
	const age = attrs.age ? ` ${attrs.age}です。` : ''
	const base =
    rating >= 4
		? 'とても満足です。スタッフの対応も良く、安心して利用できました。'
		: rating === 3
			? '全体的に良かったです。気になる点はありますが、また利用したいと思いました。'
			: '今回は少し残念でした。次回は改善されていると嬉しいです。'

	return `【口コミ案】${purpose}\n${base}${age}\n${tagText}\nまた来店したいと思います。`
}


const page =() => {
	const params = useParams()
	const sessionId = params.sessionId

	const [step, setStep] = useState(1)// 1:入力 2:生成/編集
	const [rating, setRating] = useState(0)
	const [selected, setSelected] = useState([]);
	const [attrs, setAttrs] = useState({age:'', purpose:''});
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');

	const selectedLabels = useMemo(()=>{
		const map = new Map(CHECK_OPTIONS.map((o) => [o.id, o.label]))
		return selected.map((id) => map.get(id)).filter(Boolean);
	},[selected])

	const canGenerate = rating > 0 // MVPはこれだけでOK（厳密にすると離脱増えがち）

	const handleGenerate = async () => {
		if(!canGenerate || loading) return
		setLoading(true);

		 // API未接続のためモック生成（後でここをAPIに差し替え）
		await new Promise((r)=> setTimeout(r,700))
		const mock = buildMockReview({rating, tags: selectedLabels, attrs})
		setText(mock);

		setLoading(false);
		setStep(2);
	}


	return (
		<main className="mx-auto max-w-[720px] px-4 py-6">
			<header className="mb-6">
				<p className="text-sm text-gray-500">口コミ投稿</p>
				<h1 className="text-xl font-bold">ご利用の感想を教えてください</h1>
				<p className="mt-2 text-sm text-gray-600">入力は30秒ほどで完了します。文章はあとから編集できます。</p>
			</header>

		{/* STEP1 */}
		{step === 1 && (
			<section className="space-y-6">
				<div className="rounded-2xl border p-4">
					<h2 className="font-semibold">星の評価</h2>
					<div className="mt-3">
						{/* ここに星が表示されるはずです */}
					</div>
				</div>

				<div className="rounded-2xl border p-4">
					<h2 className="font-semibold">良かった点（複数選択OK）</h2>
					<p className="mt-1 text-sm text-gray-600">当てはまるものを選んでください</p>
					<div className="mt-3">
						{/* ここにチェックボックスが表示されるはずです */}
					</div>
				</div>

				<div className="rounded-2xl border p-4">
					<h2 className="font-semibold">属性（任意）</h2>
					<p className="mt-1 text-sm text-gray-600">未入力でもOKです</p>
					<div className="mt-3">
						{/* ここに属性のradioボタンが表示されるはずです */}
					</div>
				</div>

				<div className="sticky bottom-3">
					<button 
					type="button"
					onClick={handleGenerate}
					disabled={!canGenerate || loading}
					className="w-full rounded-2xl bg-black px-4 py-4 text-white disabled:opacity-40">
						{loading ? '作成中' : 'AIで口コミを作る'}
					</button>
					<p className="mt-2 text-center text-xs text-gray-500">※ 生成された文章はこの後に編集できます</p>
				</div>
			</section>
		)}
		{/* STEP2 */}
		{step === 2 && (
			<section className="space-y-4">
				<div className="rounded-2xl border p-4">
					<h2 className="font-semibold">口コミ（編集できます）</h2>
					<div className="mt-1 text-sm text-gray-600">必要に応じて文章を調整してください</div>
					<div className="mt-3">
						{/* ここにレビュー用のエディタ表示 */}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<button 
					type="button"
					onClick={()=>setStep(1)}
					className="rounded-2xl border px-4 py-3">
						戻る
					</button>
					<button 
					type="button"
					onClick={handleConfirm}
					disabled={!text.trim()}
					className="rounded-2xl bg-black border px-4 py-3 text-white disabled:opacity-40">
						確定して次へ
					</button>
				</div>

				<div className="text-xs text-gray-500">
					セッションID：<span className="font-mono">{sessionID}</span>
				</div>

			</section>
		)}
		</main>
	)
}

export default page