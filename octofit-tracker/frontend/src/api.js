const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollectionRows(payload) {
  const candidates = [payload, payload?.results, payload?.data, payload?.items, payload?.data?.results]
  return candidates.find(Array.isArray) ?? []
}