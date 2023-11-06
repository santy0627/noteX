import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({ children }) {
  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  if (!user) {
    return <Navigate to='/ingreso' replace />
  }
  return children
}
