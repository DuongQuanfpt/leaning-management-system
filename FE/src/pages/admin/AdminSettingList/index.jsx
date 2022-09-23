import React from 'react'

const AdminSettingList = () => {
  return (
    <>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3"></div>
      </div>
    </>
  )
}

export default AdminSettingList
