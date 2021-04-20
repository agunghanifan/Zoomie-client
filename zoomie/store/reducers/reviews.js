const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: false,
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'reviews/setReviews' ) return { ...state, reviews: payload }
  if ( type === 'review/setReview' ) return { ...state, review: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  return state
}