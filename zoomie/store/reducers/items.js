const initialState = {
  items: [],
  loading: false,
  error: false,
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'items/setItems' ) return { ...state, items: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  return state
}