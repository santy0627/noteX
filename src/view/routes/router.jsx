import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Registro from '../pages/Registro/Registro'
import Nav from '../pages/Nav/Nav'
import Login from '../pages/Login/Login.jsx'
import Application from '../pages/Application/Application'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx'

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
    ],
    ErrorBoundary: ErrorPage
  },
  {
    path: '/app',
    element: <ProtectedRoute><Application /></ProtectedRoute>
  }
])
