import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const Register = lazy(() => import('~/pages/common/Register'))

// Admin pages
const Dashboard = lazy(() => import('~/pages/admin/Dashboard/index'))
const AddListing = lazy(() => import('~/pages/admin/Dashboard/addListing'))
const BasicCalendar = lazy(() => import('~/pages/admin/Dashboard/basicCalendar'))
const Bookmark = lazy(() => import('~/pages/admin/Dashboard/Bookmark'))
const Courses = lazy(() => import('~/pages/admin/Dashboard/courses'))
const ListViewCalendar = lazy(() => import('~/pages/admin/Dashboard/listViewCalendar'))
const Mailbox = lazy(() => import('~/pages/admin/Dashboard/mailbox'))
const MailboxCompose = lazy(() => import('~/pages/admin/Dashboard/mailboxCompose'))
const MailboxRead = lazy(() => import('~/pages/admin/Dashboard/mailboxRead'))
const Review = lazy(() => import('~/pages/admin/Dashboard/review'))
const TeacherProfile = lazy(() => import('~/pages/admin/Dashboard/teacherProfile'))
const UserProfile = lazy(() => import('~/pages/admin/Dashboard/userProfile'))

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
  { path: '/admin/add-listing', component: AddListing },
  { path: '/admin/basic-calendar', component: BasicCalendar },
  { path: '/admin/bookmark', component: Bookmark },
  { path: '/admin/courses', component: Courses },
  { path: '/admin/list-view-calendar', component: ListViewCalendar },
  { path: '/admin/mailbox', component: Mailbox },
  { path: '/admin/mailbox-compose', component: MailboxCompose },
  { path: '/admin/mailbox-read', component: MailboxRead },
  { path: '/admin/review', component: Review },
  { path: '/admin/teacher-profile', component: TeacherProfile },
  { path: '/admin/user-profile', component: UserProfile },
  //User pages
  { path: '/profile', component: Profile },
  { path: '/password-change', component: PasswordChange },
]

export { publicRoutes, privateRoutes }
