import { GET_TASKS, ADD_TASK, DELETE_TASK, COMPLETE_TASK } from '../types'

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
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== payload)
      }
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task._id === payload._id ? payload : task)
      }

    default:
      return state
  }
}
