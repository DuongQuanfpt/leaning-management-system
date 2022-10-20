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
const SubjectList = lazy(() => import('~/pages/manager/SubjectList'))
const SubjectDetail = lazy(() => import('~/pages/manager/SubjectDetail'))
const SubjectAdd = lazy(() => import('~/pages/manager/SubjectAdd'))

//Manager pages
const ClassList = lazy(() => import('~/pages/manager/ClassList'))
const ClassDetail = lazy(() => import('~/pages/manager/ClassDetail'))
const ClassAdd = lazy(() => import('~/pages/manager/ClassAdd'))
const SubjectSettingList = lazy(() => import('~/pages/manager/SubjectSettingList'))
const SubjectSettingDetail = lazy(() => import('~/pages/manager/SubjectSettingDetail'))
const SubjectSettingAdd = lazy(() => import('~/pages/manager/SubjectSettingAdd'))

//Supporter pages
const ContactList = lazy(() => import('~/pages/supporter/ContactList'))
const ContactDetail = lazy(() => import('~/pages/supporter/ContactDetail'))

//Trainer
const TraineeList = lazy(() => import('~/pages/trainer/TraineeList'))
const TraineeDetail = lazy(() => import('~/pages/trainer/TraineeDetail'))
const TraineeImport = lazy(() => import('~/pages/trainer/TraineeImport'))

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
  { path: '/class-add', component: ClassAdd },
  { path: '/subject-setting-list', component: SubjectSettingList },
  { path: '/subject-setting-detail/:id', component: SubjectSettingDetail },
  { path: '/subject-setting-add', component: SubjectSettingAdd },
]

// Supporter routes
const supporterRoutes = [
  { path: '/contact-list', component: ContactList },
  { path: '/contact-detail/:id', component: ContactDetail },
]

// Trainer routes
const trainerRoutes = []

// Trainee routes
const traineeRoutes = []

//Admin and manager routes
const subjectListRoutes = [
  { path: '/subject-list', component: SubjectList },
  { path: '/subject-detail/:id', component: SubjectDetail },
  { path: '/subject-add', component: SubjectAdd },
]

const classListRoutes = [
  { path: '/class-list', component: ClassList },
  { path: '/class-detail/:id', component: ClassDetail },
]

const traineeListRoutes = [
  { path: '/trainee-list', component: TraineeList },
  { path: '/trainee-detail/:classId/:id', component: TraineeDetail },
  { path: '/trainee-import', component: TraineeImport },
]

export {
  commonRoutes,
  userRoutes,
  adminRoutes,
  managerRoutes,
  supporterRoutes,
  trainerRoutes,
  traineeRoutes,
  subjectListRoutes,
  traineeListRoutes,
  classListRoutes,
}
