import React, { useReducer } from 'react'
import { AppContext } from './AppContext'
import AppReducer from './AppReducer'
import { userID } from '../User'

export const AppState = ({ children }) => {
  const initialState = {
    tasks: [],
    selectedTask: null
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
    const dd = date.getDate(date)
    const mm = date.getMonth(date) + 1
    const yyyy = date.getFullYear(date)
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

  const deleteTask = (taskId) => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/' + taskId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al eliminar la tarea')
    }).then((response) => {
      dispatch({
        type: 'DELETE_TASK',
        payload: response.todo._id
      })
    })
  }

  const completeTask = ({ title, description, newDate, taskId }) => {
    let body = {}

    body = {
      name: title,
      description,
      finishDate: newDate,
      isCompleted: true,
      userId: userID,
      _id: taskId
    }
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al completar la tarea')
    }).then((response) => {
      dispatch({
        type: 'COMPLETE_TASK',
        payload: response.todo
      })
    })
  }

  const selectTask = (taskId) => {
    dispatch({
      type: 'SELECT_TASK',
      payload: taskId
    })
  }

  const deleteSelectedTask = (taskId) => {
    dispatch({
      type: 'DELETE_SELECTED_TASK',
      payload: taskId
    })
  }

  const updateTask = (event) => {
    event.preventDefault()

    const date = new Date(event.target.elements.finishDate.value)
    const dd = date.getDate(date)
    const mm = date.getMonth(date) + 1
    const yyyy = date.getFullYear(date)
    const finishDate = yyyy + '-' + mm + '-' + dd

    let body = {}
    const taskID = state.selectedTask._id
    body = {
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      finishDate,
      isCompleted: false,
      userId: userID,
      _id: taskID
    }
    console.log(body)
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al editar la tarea')
    }).then((response) => {
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.todo
      })
    })
  }

  return (
    <AppContext.Provider value={{
      tasks: state.tasks,
      selectedTask: state.selectedTask,
      getTasks,
      createTask,
      deleteTask,
      completeTask,
      selectTask,
      updateTask,
      deleteSelectedTask
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
