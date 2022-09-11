// Admin pages
import Dashboard from '~/pages/admin/Dashboard'

//Common pages
import HomePage from '~/pages/common/HomePage'
import Login from '~/pages/common/Login'
import Register from '~/pages/common/Register'
import PasswordChange from '~/pages/common/PasswordChange'
import PasswordReset from '~/pages/common/PasswordReset'

//User pages

// Public routes
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/password-change', component: PasswordChange },
  { path: '/password-reset', component: PasswordReset },
]

const privateRoutes = [{ path: '/admin/', component: Dashboard }]

export { publicRoutes, privateRoutes }
