import { useEffect, useState } from 'react'
import { apiGet } from '../api/api'


export type Profile = { id: string; name: string; age: number; bio: string; photoUrl?: string }


export function useProfiles(limit = 8) {
const [profiles, setProfiles] = useState<Profile[]>([])
const [cursor, setCursor] = useState<string | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<any>(null)
const [remaining, setRemaining] = useState<number | null>(null)


async function fetchNext() {
if (loading) return
setLoading(true)
setError(null)
try {
const res = await apiGet('/profiles', { limit, cursor: cursor ?? '' })
const data = res.data ?? []
setProfiles(prev => [...prev, ...data])
setCursor(res.cursor ?? null)
setRemaining(typeof res.remaining === 'number' ? res.remaining : null)
} catch (err) {
setError(err)
} finally {
setLoading(false)
}
}


async function refresh() {
setProfiles([])
setCursor(null)
await fetchNext()
}


useEffect(() => {
// initial load
fetchNext()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


return { profiles, fetchNext, refresh, loading, error, remaining }
}