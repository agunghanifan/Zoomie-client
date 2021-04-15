export function setFavorites (payload) {
  return { type: 'favorites/setFavorites', payload }
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}

