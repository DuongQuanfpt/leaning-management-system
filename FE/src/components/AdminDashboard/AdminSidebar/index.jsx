import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarShow, setSidebarUnfoldable } from '~/redux/SidebarSlice/sidebarSlice'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import avatar from '~/assets/images/profile/pic1.jpg'

import { AdminSidebarNav } from './AdminSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import '~/assets/css/custom/scrollbar.css'

// sidebar nav config
import _nav from '~/utils/navigator/_nav'
import { Avatar, Space, Typography } from 'antd'
import styled from 'styled-components'

const SpaceStyled = styled(Space)`
  gap: 0px !important;
`

const AdminSidebar = () => {
  const profileData = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable)

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={false}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch(setSidebarShow(visible))
          dispatch(setSidebarUnfoldable(!unfoldable))
        }}
      >
        <CSidebarBrand className="d-none d-md-flex py-2 w-100" to="/">
          <Space className="d-flex flex-column p-2" style={{ gap: 0 }}>
            <Avatar src={!!profileData.avatar_url === true ? profileData.avatar_url : avatar} size="large" />
          </Space>
          <SpaceStyled className="d-flex flex-column px-2 py-0">
            <Space className="d-flex flex-rows p-0 m-0" style={{ gap: 0 }}>
              <Typography.Text strong style={{ fontSize: '16px', lineHeight: '0', color: '#fff' }}>
                {profileData.fullName}
              </Typography.Text>
            </Space>
            <Space className="d-flex flex-rows p-0 m-0" style={{ gap: 0 }}>
              <Typography.Text italic style={{ fontSize: '12px', lineHeight: '0', color: '#fff' }}>
                {profileData.username}
              </Typography.Text>
            </Space>
            <Space className="d-flex flex-rows p-0 m-0" style={{ gap: 0 }}>
              <Typography.Text italic style={{ fontSize: '12px', lineHeight: '0', color: '#fff' }}>
                {profileData.email}
              </Typography.Text>
            </Space>
          </SpaceStyled>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AdminSidebarNav items={_nav} />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    </>
  )
}

export default memo(AdminSidebar)
