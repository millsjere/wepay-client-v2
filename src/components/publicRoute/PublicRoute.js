import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuth } from '../../config/appConfig'
import Loader from '../Loader'

const PublicRoute = () => {
  const auth = isAuth()

  if (auth) {
    return (
      <React.Suspense fallback={<Loader />}>
        <Navigate to={'/welcome'} replace />
      </React.Suspense>
    )
  } else {
    return (
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>
    )
  }
}

export default PublicRoute