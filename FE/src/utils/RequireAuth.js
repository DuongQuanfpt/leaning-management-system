import { useLocation, Navigate, Outlet } from 'react-router-dom'
const { useSelector } = require('react-redux')

const RequireAuth = ({ allowedRoles }) => {
  const profile = useSelector((state) => state.profile)
  const location = useLocation()

  return profile?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : profile?.email ? (
    <Navigate to="/access-denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
