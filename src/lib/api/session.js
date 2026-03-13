export async function fetchSessionGuard(sessionId) {
	const response = await fetch(`/api/session/${sessionId}`, {
		method: 'GET',
		cache: 'no-store',
	})

	const result = await response.json()

	if (!response.ok || !result.ok) {
		throw new Error(result.message || 'セッション取得に失敗しました。')
	}

	return result
}