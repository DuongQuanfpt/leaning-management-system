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
const SettingAdd = lazy(() => import('~/pages/admin/AdminSettingAdd'))
const UserList = lazy(() => import('~/pages/admin/AdminUserList'))
const UserDetail = lazy(() => import('~/pages/admin/AdminUserDetail'))
const UserAdd = lazy(() => import('~/pages/admin/AdminUserAdd'))
const SystemPermission = lazy(() => import('~/pages/admin/SystemPermission'))

//Manager pages
const SubjectList = lazy(() => import('~/pages/manager/SubjectList'))
const SubjectDetail = lazy(() => import('~/pages/manager/SubjectDetail'))
const ClassList = lazy(() => import('~/pages/manager/ClassList'))
const ClassDetail = lazy(() => import('~/pages/manager/ClassDetail'))

//404 pages
const PageNotFound = lazy(() => import('~/pages/common/PageNotFound'))

// Common routes
const commonRoutes = [
  { path: '*', component: HomePage },
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
// User routes
const userRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/change-password', component: ChangePassword },
]

// Admin routes
const adminRoutes = [
  { path: '/setting-list', component: SettingList },
  { path: '/setting-detail/:id', component: SettingDetail },
  { path: '/setting-add', component: SettingAdd },
  { path: '/user-list', component: UserList },
  { path: '/user-detail/:id', component: UserDetail },
  { path: '/user-add', component: UserAdd },
  { path: '/system-permission', component: SystemPermission },
]

// Manager routes
const managerRoutes = [
  { path: '/subject-list', component: SubjectList },
  { path: '/subject-detail/:id', component: SubjectDetail },
  { path: '/class-list', component: ClassList },
  { path: '/class-detail/:id', component: ClassDetail },
]

// Supporter routes
const supporterRoutes = []

// Trainer routes
const trainerRoutes = []

// Trainee routes
const traineeRoutes = []

export { commonRoutes, userRoutes, adminRoutes, managerRoutes, supporterRoutes, trainerRoutes, traineeRoutes }
