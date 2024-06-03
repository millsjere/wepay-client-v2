import { lazy } from 'react'

// Public Routes 
const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Register'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))

// Private Routes
const Dashboard = lazy(() => import('../pages/user/Overview'))


// Routes 
const LoginRoute =
{
    path: '/',
    component: Login,
    isAuth: false
}

const SignupRoute =
{
    path: '/signup',
    component: Signup,
    isAuth: false
}

const ForgotPasswordRoute =
{
    path: '/forgot-password',
    component: ForgotPassword,
    isAuth: false
}

const ResetPasswordRoute =
{
    path: '/reset-password',
    component: ResetPassword,
    isAuth: false
}

const DashboardRoute =
{
    path: '/dashboard',
    component: Dashboard,
    isAuth: true
}





// export all routes as array
export const appRoutes = [
    LoginRoute,
    SignupRoute,
    ForgotPasswordRoute,
    ResetPasswordRoute,
    DashboardRoute

]