import React, { useReducer } from 'react'
import { AppContext } from './AppContext'
import AppReducer from './AppReducer'

export const AppState = ({ children }) => {
  const initialState = {
    tasks: [],
    selectedTask: null,
    user: null,
    userLogged: null,
    filteredTasks: []
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getTasks = () => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo?userId=' + state.user._id)
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
      userId: state.user._id
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
      userId: state.user._id,
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
      userId: state.user._id,
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
    event.target.reset()
  }
  const logoutUser = () => {
    dispatch({
      type: 'LOGOUT',
      payload: state.user._id
    })
  }

  const getUserLogged = () => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/' + state.user._id)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Error al recoger datos del usuario')
      }).then((response) => {
        dispatch({
          type: 'GET_USER',
          payload: response.user
        })
      })
  }

  const getFilteredTasks = () => {
    dispatch({
      type: 'GET_FILTERED_TASKS',
      payload: state.tasks
    })
  }

  return (
    <AppContext.Provider value={{
      tasks: state.tasks,
      selectedTask: state.selectedTask,
      user: state.user,
      userLogged: state.userLogged,
      filteredTasks: state.filteredTasks,
      dispatch,
      getTasks,
      createTask,
      deleteTask,
      completeTask,
      selectTask,
      updateTask,
      deleteSelectedTask,
      logoutUser,
      getUserLogged,
      getFilteredTasks
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
