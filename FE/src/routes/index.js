import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const Register = lazy(() => import('~/pages/common/Register'))

// Admin pages
const Dashboard = lazy(() => import('~/pages/admin/Dashboard'))

//User pages
const Profile = lazy(() => import('~/pages/user/Profile'))
const PasswordChange = lazy(() => import('~/pages/user/PasswordChange'))

//404 pages
const PageNotFound = lazy(() => import('~/pages/common/PageNotFound'))

// Public routes
const publicRoutes = [
  { path: '*', component: PageNotFound },
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/register', component: Register },
  { path: '/404', component: PageNotFound },
]

// Private routes
const privateRoutes = [
  // Admin pages
  { path: '/admin', component: Dashboard },
  //User pages
  { path: '/profile', component: Profile },
  { path: '/password-change', component: PasswordChange },
]

export { publicRoutes, privateRoutes }
