const SESSION_TTL_MINUTES = 30

if (!globalThis.__reviewMockDb) {
	globalThis.__reviewMockDb = {
		stores: [
			{ id: 'store-1', storeCode: 'store001', clientId: 'client-1', name: 'テスト店舗A', active: true },
			{ id: 'store-2', storeCode: 'store002', clientId: 'client-2', name: 'テスト店舗B', active: true },
		],
		sessions: [],
	}
}

const db = globalThis.__reviewMockDb

function addMinutes(date, minutes) {
	return new Date(date.getTime() + minutes * 60 * 1000)
}

function isExpired(session, now = new Date()) {
	return new Date(session.expiresAt).getTime() <= now.getTime()
}

export async function findStoreByCode(storeCode) {
	return db.stores.find((store) => store.storeCode === storeCode && store.active) || null
}

export async function findConfirmedSessionByDevice({ storeCode, deviceId }) {
	return (
		db.sessions.find(
			(session) =>
				session.storeCode === storeCode &&
				session.deviceId === deviceId &&
				session.usedAt !== null
		) || null
	)
}

export async function findActiveSessionByDevice({ storeCode, deviceId }) {
	const now = new Date()

	return (
		db.sessions.find(
			(session) =>
				session.storeCode === storeCode &&
				session.deviceId === deviceId &&
				session.usedAt === null &&
				!isExpired(session, now)
		) || null
	)
}

export async function createSession({ storeCode, clientId, deviceId }) {
	const now = new Date()

	const session = {
		id: crypto.randomUUID(),
		storeCode,
		clientId,
		deviceId,
		createdAt: now.toISOString(),
		expiresAt: addMinutes(now, SESSION_TTL_MINUTES).toISOString(),
		usedAt: null,
		rating: null,
		finalText: '',
	}

	db.sessions.push(session)
	return session
}

export async function getSessionById(sessionId) {
	return db.sessions.find((session) => session.id === sessionId) || null
}

export async function confirmSession({ sessionId, rating, finalText }) {
	const session = db.sessions.find((item) => item.id === sessionId)
	if (!session) return null

	session.usedAt = new Date().toISOString()
	session.rating = rating
	session.finalText = finalText

	return session
}

export async function getSessionGuard(sessionId) {
	const session = await getSessionById(sessionId)

	if (!session) {
		return {
			exists: false,
			expired: false,
			used: false,
			confirmed: false,
			session: null,
		}
	}

	const expired = isExpired(session)
	const used = session.usedAt !== null

	return {
		exists: true,
		expired,
		used,
		confirmed: used,
		session,
	}
}