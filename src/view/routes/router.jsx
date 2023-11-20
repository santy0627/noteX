import { createHashRouter } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Registro from '../pages/Registro/Registro'
import Nav from '../pages/Nav/Nav'
import Login from '../pages/Login/Login.jsx'
import Application from '../pages/Application/Application'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx'
import Header from '../components/Header/Header.jsx'
import UserPage from '../pages/UserPage/UserPage.jsx'
import SearchPage from '../pages/SearchPage/SearchPage.jsx'

export const router = createHashRouter([
  {
    path: '/',
    Component: Nav,
    children: [
      {
        path: '',
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
    element: <ProtectedRoute><Header /></ProtectedRoute>,
    children: [
      {
        path: '',
        Component: Application
      },
      {
        path: 'user',
        Component: UserPage
      },
      {
        path: 'search',
        Component: SearchPage
      }
    ],
    ErrorBoundary: ErrorPage
  }
])
