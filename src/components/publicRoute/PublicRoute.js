import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getData, isAuth } from '../../config/appConfig'
import Loader from '../Loader'

const PublicRoute = () => {
  const auth = isAuth()
  const user = getData('uid')

  if (auth && user?.isVerified) {
    return (
      <React.Suspense fallback={<Loader />}>
        <Navigate to={'/dashboard'} replace />
      </React.Suspense>
    )
  }
  if (auth && !user?.isVerified) {
    return (
      <React.Suspense fallback={<Loader />}>
        <Navigate to={'/verify'} replace />
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