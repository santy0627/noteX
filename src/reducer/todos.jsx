export const initialState = {
  user: null
}

export function reducer (state, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      globalThis.localStorage.setItem('USER', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}
