import { createContext, useReducer } from 'react'
import { reducer, initialState } from '../../reducer/todos'

export const TaskContext = createContext()

export const taskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}
