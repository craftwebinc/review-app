const page = () => {
	return (
		<main className="flex min-h-[100dvh] items-center justify-center px-4">
			<div className="max-w-[420px] text-center">
				<h1 className="text-xl font-bold">
				既に投稿済みです
				</h1>

				<p className="mt-3 text-sm text-gray-600 leading-relaxed">
				この端末からはすでに口コミ投稿が
				完了しています。
				</p>

				<p className="mt-2 text-sm text-gray-600">
				ご協力ありがとうございました。
				</p>
			</div>
		</main>
	)
}

export default page