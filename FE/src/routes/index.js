import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const Register = lazy(() => import('~/pages/common/Register'))
const RegisterSuccessed = lazy(() => import('~/pages/common/RegisterSuccessed'))

// Admin pages
const AdminDashboard = lazy(() => import('~/pages/admin/AdminDashboard'))

//404 pages
const PageNotFound = lazy(() => import('~/pages/common/PageNotFound'))

// Common routes
const commonRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/register', component: Register },
  { path: '/register-successed', component: RegisterSuccessed },
  { path: '/404', component: PageNotFound },
]

// Admin routes
const adminRoutes = [{ path: '/admin', component: AdminDashboard }]

// Manager routes
const managerRoutes = []

// Supporter routes
const supporterRoutes = []

// Trainer routes
const trainerRoutes = []

// Trainee routes
const traineeRoutes = []

export { commonRoutes, adminRoutes, managerRoutes, supporterRoutes, trainerRoutes, traineeRoutes }
