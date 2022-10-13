import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  adminRoutes,
  managerRoutes,
  supporterRoutes,
  trainerRoutes,
  traineeRoutes,
  userRoutes,
  commonRoutes,
  adminAndManagerRoutes,
  managerAndTrainerRoutes,
  supporterAndTrainerRoutes,
} from '~/routes'
import RequireAuth from '~/utils/RequireAuth'

import '~/assets/scss/style.scss'
import 'antd/dist/antd.min.css'

const User = () => {
  return (
    <>
      <Fragment>
        <Routes>
          {commonRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {/* User routes, all roles can access this */}
          <Route element={<RequireAuth allowedRoles={['admin', 'manager', 'supporter', 'trainer', 'trainee']} />}>
            {userRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Only users with admin role can access */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            {adminRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Only users with manager role can access */}
          <Route element={<RequireAuth allowedRoles={['manager']} />}>
            {managerRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Only users with supporter role can access */}
          <Route element={<RequireAuth allowedRoles={['supporter']} />}>
            {supporterRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Only users with trainer role can access */}
          <Route element={<RequireAuth allowedRoles={['trainer']} />}>
            {trainerRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Only users with trainee role can access */}
          <Route element={<RequireAuth allowedRoles={['trainee']} />}>
            {traineeRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Both admin and manager role can access */}
          <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
            {adminAndManagerRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Both manager and trainer role can access */}
          <Route element={<RequireAuth allowedRoles={['manager', 'trainer']} />}>
            {managerAndTrainerRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {/* Both trainer and supporter role can access */}
          <Route element={<RequireAuth allowedRoles={['trainer', 'supporter']} />}>
            {supporterAndTrainerRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
        </Routes>
      </Fragment>
    </>
  )
}

export default User
