import type { H3Event } from 'h3'
import { randomUUID } from 'node:crypto'

const ANONYMOUS_COOKIE = 'anonymous_id'
const CUSTOMER_COOKIE = 'customer_session'

export function getAnonymousId(event: H3Event): string {
  let id = getCookie(event, ANONYMOUS_COOKIE)
  if (!id) {
    id = randomUUID()
    setCookie(event, ANONYMOUS_COOKIE, id, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
  }
  return id
}

interface CustomerSession {
  customerId: string
  email: string
}

export function getCustomerSession(event: H3Event): CustomerSession | null {
  const raw = getCookie(event, CUSTOMER_COOKIE)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CustomerSession
  } catch {
    return null
  }
}

export function setCustomerSession(event: H3Event, data: CustomerSession | null) {
  if (data) {
    setCookie(event, CUSTOMER_COOKIE, JSON.stringify(data), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  } else {
    deleteCookie(event, CUSTOMER_COOKIE, { path: '/' })
  }
}
