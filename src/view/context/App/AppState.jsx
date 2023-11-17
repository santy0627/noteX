import React, { useReducer } from 'react'
import { AppContext } from './AppContext'
import AppReducer from './AppReducer'
import { useNavigate } from 'react-router-dom'

export const AppState = ({ children }) => {
  const initialState = {
    user: null,
    tasks: []
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const navigate = useNavigate()

  const userID = state.user._id

  const getUser = (event) => {
    event.preventDefault()
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
      })
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al autenticar el usuario')
    }).then((data) => {
      dispatch({
        type: 'GET_USER',
        payload: data.user
      })
      navigate('/app')
    }).catch(error => {
      console.log('Error en navegacion' + error)
    })
  }

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

  return (
    <AppContext.Provider value={{
      tasks: state.tasks,
      user: state.user,
      getTasks,
      getUser
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
