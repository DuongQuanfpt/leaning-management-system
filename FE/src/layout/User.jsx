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
  subjectListRoutes,
  classListRoutes,
  traineeListRoutes,
  classSettingListRoutes,
  milestoneListRoutes,
  groupListRoutes,
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

          <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
            {subjectListRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>

          <Route element={<RequireAuth allowedRoles={['manager', 'supporter', 'trainer']} />}>
            {classListRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>

          <Route element={<RequireAuth allowedRoles={['manager', 'supporter', 'trainer']} />}>
            {traineeListRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>

          <Route element={<RequireAuth allowedRoles={['supporter', 'trainer']} />}>
            {classSettingListRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>

          <Route element={<RequireAuth allowedRoles={['supporter', 'trainer']} />}>
            {milestoneListRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>

          <Route element={<RequireAuth allowedRoles={['supporter', 'trainer']} />}>
            {groupListRoutes.map((route, index) => {
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
