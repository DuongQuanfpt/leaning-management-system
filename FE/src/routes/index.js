import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const ForgetPasswordProcessed = lazy(() => import('~/pages/common/ForgetPasswordProcessed'))
const Register = lazy(() => import('~/pages/common/Register'))
const RegisterProcessed = lazy(() => import('~/pages/common/RegisterProcessed'))
const Verify = lazy(() => import('~/pages/common/Verify'))
const AccessDenied = lazy(() => import('~/pages/common/AccessDenied'))

// Admin pages
const Dashboard = lazy(() => import('~/pages/admin/AdminDashboard'))
const Profile = lazy(() => import('~/pages/user/Profile'))
const ChangePassword = lazy(() => import('~/pages/user/ChangePassword'))
const SettingList = lazy(() => import('~/pages/admin/AdminSettingList'))
const SettingDetail = lazy(() => import('~/pages/admin/AdminSettingDetail'))
const UserList = lazy(() => import('~/pages/admin/AdminUserList'))
const UserDetail = lazy(() => import('~/pages/admin/AdminUserDetail'))

//404 pages
const PageNotFound = lazy(() => import('~/pages/common/PageNotFound'))

// Common routes
const commonRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/forget-password-processed', component: ForgetPasswordProcessed },
  { path: '/register', component: Register },
  { path: '/register-processed', component: RegisterProcessed },
  { path: '/verify', component: Verify },
  { path: '/404', component: PageNotFound },
  { path: '/access-denied', component: AccessDenied },
]

// Admin routes
const adminRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/change-password', component: ChangePassword },
  { path: '/setting-list', component: SettingList },
  { path: '/setting-detail/:id', component: SettingDetail },
  { path: '/user-list', component: UserList },
  { path: '/user-detail/:id', component: UserDetail },
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
