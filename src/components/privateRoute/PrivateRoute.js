import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import Loader from '../Loader'
import Layout from '../layout'


const PrivateRoute = () => {
  const auth = isAuth()
  const user = getData('uid')
  const currentTime = new Date().getTime()
  const sessionTime = getData('exp')

  console.log(user)

  if (auth && Number(sessionTime) > Number(currentTime)) {
    return (
      <>
        <Layout>
          <React.Suspense fallback={<Loader />}>
            <Outlet />
          </React.Suspense>
        </Layout>
      </>
    )
  } else {
    sessionTimeout()
    return (
      <>
        <Navigate to={'/'} replace />
      </>
    )
  }
}

export default PrivateRoute