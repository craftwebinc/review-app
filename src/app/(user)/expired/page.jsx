const page = () => {
	return (
		<main className="flex min-h-[100dvh] items-center justify-center px-4">
			<div className="max-w-[420px] text-center">
				<h1 className="text-xl font-bold">有効期限が切れました</h1>

				<p className="mt-3 text-sm text-gray-600 leading-relaxed">
				口コミ投稿の有効期限が切れています。
				</p>

				<p className="mt-2 text-sm text-gray-600">
				お手数ですが、店舗のQRコードを
				もう一度読み取ってください。
				</p>
			</div>
		</main>
	)
}

export default page