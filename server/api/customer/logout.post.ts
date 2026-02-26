export default defineEventHandler(async (event) => {
  setCustomerSession(event, null)
  return { ok: true }
})
