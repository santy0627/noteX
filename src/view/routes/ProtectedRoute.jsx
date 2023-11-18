import { Navigate } from 'react-router-dom'
import { user } from '../context/User'

export default function ProtectedRoute ({ children }) {
  if (!user) { return <Navigate to='/ingreso' replace /> }
  return children
}
