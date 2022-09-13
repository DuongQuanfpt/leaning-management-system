// Admin pages
import Dashboard from '~/pages/admin/Dashboard'

//Common pages
import HomePage from '~/pages/common/HomePage'
import Login from '~/pages/common/Login'
import ForgetPassword from '~/pages/common/Register'
import Register from '~/pages/common/Register'
import PasswordChange from '~/pages/user/PasswordChange'

import PageNotFound from '~/pages/common/PageNotFound'

//User pages

// Public routes
const publicRoutes = [
  { path: '*', component: HomePage },
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/register', component: Register },
  { path: '/password-change', component: PasswordChange },

  { path: '/404', component: PageNotFound },
]

// Private routes
const privateRoutes = [{ path: '/admin', component: Dashboard }]

export { publicRoutes, privateRoutes }
