export const getBaseUrl = () => {
return (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000'
}


const defaultHeaders = () => ({
'Content-Type': 'application/json',
'X-Session-Id': getSessionId()
})


export function getSessionId(): string {
if (typeof window === 'undefined') return 'ssr'
let s = localStorage.getItem('sessionId')
if (!s) {
s = 's_' + Math.random().toString(36).slice(2, 9)
localStorage.setItem('sessionId', s)
}
return s
}


export async function apiGet(path: string, params?: Record<string, string | number>) {
const url = new URL(getBaseUrl() + path)
if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
const res = await fetch(url.toString(), { headers: defaultHeaders() })
const data = await safeJson(res)
if (!res.ok) throw data
return data
}


export async function apiPost(path: string, body: unknown) {
const res = await fetch(getBaseUrl() + path, {
method: 'POST',
headers: defaultHeaders(),
body: JSON.stringify(body)
})
const data = await safeJson(res)
if (!res.ok) throw data
return data
}


async function safeJson(res: Response) {
try {
return await res.json()
} catch {
return { error: 'invalid_json', message: 'Invalid JSON from server', status: res.status }
}
}