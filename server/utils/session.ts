import type { H3Event } from 'h3'
import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto'

const ANONYMOUS_COOKIE = 'anonymous_id'
const CUSTOMER_COOKIE = 'customer_session'
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function getSessionSecret(): string {
  const config = useRuntimeConfig()
  return config.commercetools.clientSecret
}

function sign(payload: string): string {
  const hmac = createHmac('sha256', getSessionSecret())
  hmac.update(payload)
  return hmac.digest('base64url')
}

function verifySignature(payload: string, signature: string): boolean {
  const expected = sign(payload)
  if (expected.length !== signature.length) return false
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  } catch {
    return false
  }
}

export function getAnonymousId(event: H3Event): string {
  const id = getCookie(event, ANONYMOUS_COOKIE)
  if (id && UUID_REGEX.test(id)) {
    return id
  }

  const newId = randomUUID()
  setCookie(event, ANONYMOUS_COOKIE, newId, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  })
  return newId
}

interface CustomerSession {
  customerId: string
  email: string
}

export function getCustomerSession(event: H3Event): CustomerSession | null {
  const raw = getCookie(event, CUSTOMER_COOKIE)
  if (!raw) return null
  try {
    const dotIndex = raw.lastIndexOf('.')
    if (dotIndex === -1) return null

    const payload = raw.slice(0, dotIndex)
    const signature = raw.slice(dotIndex + 1)

    if (!verifySignature(payload, signature)) return null

    const session = JSON.parse(payload) as CustomerSession
    if (!session.customerId || !session.email) return null

    return session
  } catch {
    return null
  }
}

export function setCustomerSession(event: H3Event, data: CustomerSession | null) {
  if (data) {
    const payload = JSON.stringify(data)
    const signature = sign(payload)
    setCookie(event, CUSTOMER_COOKIE, `${payload}.${signature}`, {
      httpOnly: true,
      secure: !import.meta.dev,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  } else {
    deleteCookie(event, CUSTOMER_COOKIE, { path: '/' })
  }
}

export function clearAnonymousId(event: H3Event) {
  deleteCookie(event, ANONYMOUS_COOKIE, { path: '/' })
}
