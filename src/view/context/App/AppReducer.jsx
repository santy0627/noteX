import { GET_TASKS, ADD_TASK } from '../types'

export default (state, action) => {
  const { payload, type } = action

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload]
      }
    default:
      return state
  }
}
