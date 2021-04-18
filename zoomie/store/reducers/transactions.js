const initialState = {
  transactions: [],
  loading: false,
  error: null,
  historyTransactions: []
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if ( type === 'transactions/setTransactions' ) return { ...state, transactions: payload }
  if ( type === 'loading/setLoading' ) return { ...state, loading: payload }
  if ( type === 'error/setError' ) return { ...state, error: payload }
  if ( type === 'transactions/setTransactionsHistory' ) return { ...state, historyTransactions: payload}
  return state
}