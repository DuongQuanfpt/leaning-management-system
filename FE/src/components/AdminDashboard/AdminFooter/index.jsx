import React from 'react'
import { CFooter } from '@coreui/react'

const AdminFooter = () => {
  return (
    <CFooter>
      <div color="bg-dark">
        <span className="ms-1">&copy; LMS - Learning Management System</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by SWP491_G23</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AdminFooter)
