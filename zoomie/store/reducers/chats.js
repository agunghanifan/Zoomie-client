const initialState = {
  chats: [],
  loading: false,
  error: false,
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'chats/setChats' ) return { ...state, chats: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  return state
}