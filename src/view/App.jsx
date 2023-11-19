import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { AppState } from './context/App/AppState'

export const App = () => {
  return (
    <AppState>
      <RouterProvider router={router} />
    </AppState>
  )
}
