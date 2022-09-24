import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const Register = lazy(() => import('~/pages/common/Register'))
const RegisterSuccessed = lazy(() => import('~/pages/common/RegisterSuccessed'))

// Admin pages
const AdminDashboard = lazy(() => import('~/pages/admin/AdminDashboard'))
const AdminProfile = lazy(() => import('~/pages/admin/AdminProfile'))
const AdminChangePassword = lazy(() => import('~/pages/user/ChangePassword'))
const AdminSettingList = lazy(() => import('~/pages/admin/AdminSettingList'))
const AdminSettingDetail = lazy(() => import('~/pages/admin/AdminSettingDetail'))
const AdminUserList = lazy(() => import('~/pages/admin/AdminUserList'))
const AdminUserDetail = lazy(() => import('~/pages/admin/AdminUserDetail'))

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
const adminRoutes = [
  { path: '/dashboard', component: AdminDashboard },
  { path: '/profile', component: AdminProfile },
  { path: '/change-password', component: AdminChangePassword },
  { path: '/setting-list', component: AdminSettingList },
  { path: '/setting-detail', component: AdminSettingDetail },
  { path: '/user-list', component: AdminUserList },
  { path: '/user-detail', component: AdminUserDetail },
]

// Manager routes
const managerRoutes = []

// Supporter routes
const supporterRoutes = []

// Trainer routes
const trainerRoutes = []

// Trainee routes
const traineeRoutes = []

export { commonRoutes, adminRoutes, managerRoutes, supporterRoutes, trainerRoutes, traineeRoutes }
