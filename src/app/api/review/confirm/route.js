import { NextResponse } from 'next/server'
import { getSessionGuard, confirmSession } from '@/lib/server/sessionService'

export async function POST(request) {
	try {
		const body = await request.json()
		const { sessionId, rating, finalText } = body

		if (!sessionId || !rating || !finalText?.trim()) {
			return NextResponse.json(
				{ ok: false, message: '必要な値が不足しています。' },
				{ status: 400 }
			)
		}

		const guard = await getSessionGuard(sessionId)

		if (!guard.exists) {
			return NextResponse.json(
				{ ok: false, message: 'セッションが存在しません。' },
				{ status: 404 }
			)
		}

		if (guard.expired) {
			return NextResponse.json(
				{ ok: false, message: 'セッションの有効期限が切れています。' },
				{ status: 410 }
			)
		}

		if (guard.used) {
			return NextResponse.json(
				{ ok: false, message: 'このセッションは既に使用済みです。' },
				{ status: 409 }
			)
		}

		const session = await confirmSession({
			sessionId,
			rating,
			finalText,
		})

		return NextResponse.json({
			ok: true,
			sessionId: session.id,
			rating: session.rating,
		})
	} catch (error) {
		console.error(error)

		return NextResponse.json(
			{ ok: false, message: 'サーバーエラーが発生しました。' },
			{ status: 500 }
		)
	}
}