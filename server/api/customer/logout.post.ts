export default defineEventHandler(async (event) => {
  setCustomerSession(event, null)
  clearAnonymousId(event)
  return { ok: true }
})
