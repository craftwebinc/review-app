'use client'

import { useEffect, useState } from 'react'
import { fetchSessionGuard } from '@/lib/api/session'

export default function useSessionGuard(sessionId) {
	const [loading, setLoading] = useState(true)
	const [guard, setGuard] = useState(null)
	const [error, setError] = useState('')

	useEffect(() => {
		let isMounted = true

		async function load() {
			try {
				setLoading(true)
				setError('')

				const result = await fetchSessionGuard(sessionId)

				if (!isMounted) return
				setGuard(result)
			} catch (err) {
				if (!isMounted) return
				setError(err.message || 'エラーが発生しました。')
			} finally {
				if (!isMounted) return
				setLoading(false)
			}
		}

		if (sessionId) {
			load()
		}

		return () => {
			isMounted = false
		}
	}, [sessionId])

	return {
		loading,
		guard,
		error,
	}
}