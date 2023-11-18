import React, { useReducer } from 'react'
import { AppContext } from './AppContext'
import AppReducer from './AppReducer'
import { userID } from '../User'

export const AppState = ({ children }) => {
  const initialState = {
    tasks: []
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getTasks = () => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo?userId=' + userID)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Error al recoger las notas')
      }).then((data) => {
        dispatch({
          type: 'GET_TASKS',
          payload: data.todos
        })
      })
  }

  const createTask = (event) => {
    event.preventDefault()

    const date = new Date(event.target.elements.finishDate.value)
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    const finishDate = yyyy + '-' + mm + '-' + dd

    let body = {}

    body = {
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      finishDate,
      isCompleted: false,
      userId: userID
    }
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) return response.json()
      throw new Error('Error al crear la nota')
    }).then((response) => {
      dispatch({
        type: 'ADD_TASK',
        payload: response.todo
      })
    })
    event.target.reset()
  }

  const deleteTask = () => {

  }

  return (
    <AppContext.Provider value={{
      tasks: state.tasks,
      user: state.user,
      getTasks,
      createTask,
      deleteTask
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
