import { GET_TASKS, GET_USER, LOGOUT } from '../types'

export default (state, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload
      }

    case GET_USER:
      return {
        ...state,
        user: payload
      }

    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
