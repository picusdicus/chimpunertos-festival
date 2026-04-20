// In-memory store for OAuth states (in production, use Redis/database)
const stateStore = new Map<string, { createdAt: number }>()

export function generateAndStoreState(state: string): void {
  stateStore.set(state, { createdAt: Date.now() })
}

export function validateAndConsumeState(state: string): boolean {
  const entry = stateStore.get(state)
  if (!entry) return false

  // Check if state is not older than 10 minutes
  if (Date.now() - entry.createdAt > 60 * 10 * 1000) {
    stateStore.delete(state)
    return false
  }

  // Remove state after validation (one-time use)
  stateStore.delete(state)
  return true
}
