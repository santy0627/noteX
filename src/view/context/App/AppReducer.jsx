import { GET_TASKS, ADD_TASK, DELETE_TASK, COMPLETE_TASK, SELECT_TASK, UPDATE_TASK, DELETE_SELECTED_TASK, GET_USER, LOGOUT, DELETE_USER, UPDATE_USER } from '../types'

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
    case SELECT_TASK: {
      const selectedTodo = state.tasks.filter(task => task._id === payload)
      return {
        ...state,
        selectedTask: selectedTodo[0]
      }
    }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task._id === payload._id ? payload : task),
        selectedTask: null
      }
    case DELETE_SELECTED_TASK:
      return {
        ...state,
        selectedTask: null
      }
    case GET_USER:
      return {
        ...state,
        user: payload,
        userLogged: payload
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      }
    case DELETE_USER:
      return {
        ...state,
        user: null,
        userLogged: null
      }
    default:
      return state
  }
}
