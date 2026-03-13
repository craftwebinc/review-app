import { NextResponse } from 'next/server'
import { getSessionGuard } from '@/lib/server/sessionService'

export async function GET(request, context) {
	try {
		const { sessionId } = await context.params
		const guard = await getSessionGuard(sessionId)

		return NextResponse.json({
			ok: true,
			exists: guard.exists,
			expired: guard.expired,
			used: guard.used,
			confirmed: guard.confirmed,
			session: guard.session
				? {
					id: guard.session.id,
					rating: guard.session.rating,
					finalText: guard.session.finalText,
					expiresAt: guard.session.expiresAt,
					usedAt: guard.session.usedAt,
				}
				: null,
		})
	} catch (error) {
		console.error(error)

		return NextResponse.json(
			{ ok: false, message: 'セッション取得に失敗しました。' },
			{ status: 500 }
		)
	}
}