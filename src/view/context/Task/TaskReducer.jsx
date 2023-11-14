import { GET_TASKS } from '../types'

export default (state, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload
      }
    default:
      return state
  }
}
