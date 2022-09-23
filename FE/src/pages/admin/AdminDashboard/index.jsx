import React from 'react'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminContent from '~/components/AdminDashboard/AdminContent'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AdminDashboard = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <AdminContent />
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminDashboard
