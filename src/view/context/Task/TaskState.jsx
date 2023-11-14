import React, { useReducer } from 'react'
import { TaskContext } from './TaskContext'
import TaskReducer from './TaskReducer'

export const TaskState = ({ children }) => {
  const initialState = {
    tasks: []
  }

  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  const userID = user._id

  const [state, dispatch] = useReducer(TaskReducer, initialState)

  const getTasks = () => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo?userId=' + userID)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Error al recoger las notas')
      }).then((data) => {
        globalThis.localStorage.setItem('TODOS', JSON.stringify(data.todos))
        console.log(data.todos)
        dispatch({
          type: 'GET_TASKS',
          payload: data.todos
        })
      })
  }

  return (
    <TaskContext.Provider value={{
      tasks: state.tasks,
      getTasks
    }}
    >
      {children}
    </TaskContext.Provider>
  )
}
