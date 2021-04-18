export function setGarages (payload) {
  return { type: 'garages/setGarages', payload }
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}
