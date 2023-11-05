import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Registro from '../pages/Registro/Registro'
import Nav from '../pages/Nav/Nav'
import Login from '../pages/Login/login'
import Application from '../pages/Application/Application'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Nav,
    children: [
      {
        path: '',
        Component: Landing
      },
      {
        path: 'inicio',
        Component: Landing
      },
      {
        path: 'registro',
        Component: Registro
      },
      {
        path: 'ingreso',
        Component: Login
      }
    ]
  },
  {
    path: '/app',
    Component: Application
  }
])
