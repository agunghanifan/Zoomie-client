const initialState = {
  chats: [],
  status: [],
  loading: false,
  error: false,
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'chats/setChats' ) return { ...state, chats: payload }
  if ( type === 'status/setStatus' ) return { ...state, status: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  return state
}