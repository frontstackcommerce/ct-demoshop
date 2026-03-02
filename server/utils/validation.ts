const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX_STRING_LENGTH = 255
const MAX_QUANTITY = 99

export function validateEmail(email: unknown): string {
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > MAX_STRING_LENGTH) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }
  return email.trim()
}

export function validateString(
  value: unknown,
  fieldName: string,
  maxLength = MAX_STRING_LENGTH,
): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > maxLength) {
    throw createError({ statusCode: 400, statusMessage: `Invalid ${fieldName}` })
  }
  return value.trim()
}

export function validateId(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || !UUID_REGEX.test(value)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid ${fieldName}` })
  }
  return value
}

export function validateQuantity(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > MAX_QUANTITY) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid quantity (0-99)' })
  }
  return value
}

export function validateAddress(addr: unknown): {
  firstName: string
  lastName: string
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  country: string
  phone: string
} {
  if (!addr || typeof addr !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid address' })
  }

  const a = addr as Record<string, unknown>
  return {
    firstName: validateString(a.firstName, 'firstName', 100),
    lastName: validateString(a.lastName, 'lastName', 100),
    streetName: validateString(a.streetName, 'streetName'),
    streetNumber: typeof a.streetNumber === 'string' ? a.streetNumber.trim().slice(0, 20) : '',
    postalCode: validateString(a.postalCode, 'postalCode', 20),
    city: validateString(a.city, 'city', 100),
    country: validateString(a.country, 'country', 2),
    phone: typeof a.phone === 'string' ? a.phone.trim().slice(0, 30) : '',
  }
}

// Simple in-memory rate limiter
const attempts = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 10

export function checkRateLimit(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)

  if (entry && entry.resetAt > now) {
    if (entry.count >= MAX_ATTEMPTS) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many attempts. Please try again later.',
      })
    }
    entry.count++
  } else {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
  }

  // Cleanup old entries periodically
  if (attempts.size > 10000) {
    for (const [k, v] of attempts) {
      if (v.resetAt <= now) attempts.delete(k)
    }
  }
}

export function safeError(error: unknown, fallbackMessage = 'An error occurred'): never {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    throw error
  }
  console.error('[API Error]', error)
  throw createError({ statusCode: 500, statusMessage: fallbackMessage })
}
