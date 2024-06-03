import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth } from '../../config/appConfig'
import Loader from '../Loader'
import Layout from '../layout'


const PrivateRoute = () => {
  const auth = isAuth()
  // const currentTime = new Date().getTime()
  const sessionTime = getData()
  console.log(sessionTime)


  if (auth) {
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
    return (
      <>
        <Navigate to={'/'} replace />
      </>
    )
  }
}

export default PrivateRoute