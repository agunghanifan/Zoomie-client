export function setUsers (payload) {
  return { type: 'users/setUsers', payload }
}

export function setUser (payload) {
  return { type: 'user/setUser', payload }
}


export function setLoading (payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError (payload) {
  return { type: 'error/setError', payload }
}
