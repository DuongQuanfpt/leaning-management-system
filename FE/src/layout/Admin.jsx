import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { adminRoutes, managerRoutes, supporterRoutes, trainerRoutes, traineeRoutes } from '~/routes'
import '~/assets/scss/style.scss'

import ScrollToTop from '~/components/Common/ScrollToTop'

const Admin = () => {
  return (
    <>
      <Fragment>
        <Routes>
          {adminRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {managerRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {supporterRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {trainerRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {traineeRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
        <ScrollToTop />
      </Fragment>
    </>
  )
}

export default Admin
