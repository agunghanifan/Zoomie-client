const initialState = {
  garages: [],
  loading: false,
  error: false,
  garageLogIn: []
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'garages/setGarages' ) return { ...state, garages: payload }
  if ( type === 'garageLogIn/setgarageLogIn' ) return { ...state, garageLogIn: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  return state
}