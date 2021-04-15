export function setTransactions (payload) {
  return { type: 'transactions/setTransactions', payload }
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}
