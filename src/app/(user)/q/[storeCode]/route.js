import { NextResponse } from 'next/server'
import {
	findStoreByCode,
	findConfirmedSessionByDevice,
	findActiveSessionByDevice,
	createSession,
} from '@/lib/server/sessionService'

const DEVICE_COOKIE_NAME = 'review_device_id'
const DEVICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180 // 180日

function getRequestOrigin(request) {
	const forwardedProto = request.headers.get('x-forwarded-proto')
	const forwardedHost = request.headers.get('x-forwarded-host')
	const host = request.headers.get('host')

	const proto = forwardedProto || 'https'
	const resolvedHost = forwardedHost || host

	return `${proto}://${resolvedHost}`
}

export async function GET(request, context) {
	const { storeCode } = await context.params

	const store = await findStoreByCode(storeCode)

	const origin = getRequestOrigin(request)

	if (!store) {
		return NextResponse.redirect(new URL('/expired', origin))
	}

	let deviceId = request.cookies.get(DEVICE_COOKIE_NAME)?.value
	let shouldSetCookie = false

	if (!deviceId) {
		deviceId = crypto.randomUUID()
		shouldSetCookie = true
	}

	// この端末で既に投稿完了済みなら終了
	const confirmedSession = await findConfirmedSessionByDevice({
		storeCode,
		deviceId,
	})

	if (confirmedSession) {
		const response = NextResponse.redirect(new URL('/used', origin))

		if (shouldSetCookie) {
			response.cookies.set({
				name: DEVICE_COOKIE_NAME,
				value: deviceId,
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				path: '/',
				maxAge: DEVICE_COOKIE_MAX_AGE,
			})
		}

		return response
	}

	// 未完了で有効期限内のsessionがあれば続きから
	let session = await findActiveSessionByDevice({
		storeCode,
		deviceId,
	})

	// 無ければ新規作成
	if (!session) {
		session = await createSession({
			storeCode,
			clientId: store.clientId,
			deviceId,
		})
	}

	const response = NextResponse.redirect(
		new URL(`/review/${session.id}`, origin)
	)
	if (shouldSetCookie) {
		response.cookies.set({
			name: DEVICE_COOKIE_NAME,
			value: deviceId,
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: DEVICE_COOKIE_MAX_AGE,
		})
	}

	console.log('request.url:', request.url)
	console.log('request.nextUrl.href:', request.nextUrl?.href)
	console.log('request.nextUrl.origin:', request.nextUrl?.origin)
	console.log('host:', request.headers.get('host'))
	console.log('x-forwarded-host:', request.headers.get('x-forwarded-host'))
	console.log('x-forwarded-proto:', request.headers.get('x-forwarded-proto'))
	return response;
}