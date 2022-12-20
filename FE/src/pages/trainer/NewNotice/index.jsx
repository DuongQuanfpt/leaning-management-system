import React, { useState, useEffect } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Input, Typography, Upload, Button, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import styled from 'styled-components'

import postApi from '~/api/postApi'
import { customConfiguration } from '~/utils/CustomClassicEditor'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'

const StyledUpload = styled(Upload)`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const NewNotice = () => {
  const [postDetail, setPostDetail] = useState({
    postTitle: '',
    excerpt: '',
    content: '',
  })
  // eslint-disable-next-line no-unused-vars
  const [listCategory, setListCategory] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - New Notice'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    const params = {
      isNotice: true,
      topView: 5,
    }
    await postApi
      .getListPost(params)
      .then((response) => {
        console.log(response)
        setListCategory(response?.categoryFilter)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleSave = async () => {
    if (postDetail.postTitle?.trim() === '') {
      Modal.error({
        content: 'Notice title must not empty',
      })
      return
    }
    if (postDetail.excerpt?.trim() === '') {
      Modal.error({
        content: 'Notice excerpt must not empty',
      })
      return
    }
    if (thumbnail === null) {
      Modal.error({
        content: 'Thumnail image must not empty',
      })
      return
    }
    if (postDetail.content?.trim() === '') {
      Modal.error({
        content: 'Notice content must not empty',
      })
      return
    }

    const params = {
      postTitle: postDetail.postTitle.trim(),
      content: postDetail.content.trim(),
      excerpt: postDetail.excerpt.trim(),
    }

    if (!thumbnail.thumbUrl) {
      const base64 = await convertToBase64(thumbnail)
      params.thumbnailBase64 = base64
    }
    setLoading(true)

    postApi
      .createPost(params, token)
      .then((response) => {
        console.log(response)
        Modal.success({
          content: 'Create Notice Successfully',
        })
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        Modal.error({
          content: 'Create Notice Failed, try again later',
        })
        setLoading(false)
      })
  }

  const props = {
    name: 'file',
    accept: 'image/png, image/jpeg',
    multiple: false,
    maxCount: 1,
    fileList: thumbnail === null ? [] : [thumbnail],
    beforeUpload: () => {
      return false
    },
    onChange(info) {
      const { status } = info.file
      const extensionFile = info?.file?.name?.split('.')?.pop().toLowerCase()

      if (status !== 'uploading') {
        if (info.file.status === 'removed') return

        if (!['png', 'jfif', 'pjpeg', 'jpeg', 'pjp', 'jpg'].includes(extensionFile)) {
          Modal.error({
            content: 'File type is invalid',
          })
          return
        }
        //File bigger than 20MB
        if (info.file.size >= 20000000) {
          Modal.error({
            content: 'Image must smaller than 20MB',
          })
          return
        }
        Modal.success({
          content: `${info.file.name} file uploaded successfully.`,
        })
        const formData = new FormData()
        formData.append('file', info.file)

        console.log(formData.values().next().value)
        setThumbnail(formData.values().next().value)
      }
    },

    onRemove(e) {
      console.log('Remove files', e)
      setThumbnail(null)
    },
  }

  return (
    <>
      <div>
        <AdminSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AdminHeader />
          <div className="body flex-grow-1 px-5">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <Typography.Text strong>Title</Typography.Text>
                <Input.TextArea
                  value={postDetail.postTitle}
                  placeholder="Title of Notice"
                  onChange={(e) => setPostDetail((prev) => ({ ...prev, postTitle: e.target.value }))}
                />
              </div>
              <div className="col-lg-12 mb-3">
                <Typography.Text strong> Excerpt</Typography.Text>
                <Input.TextArea
                  showCount
                  maxLength={300}
                  value={postDetail.excerpt}
                  placeholder="Excerpt of Notice"
                  onChange={(e) => setPostDetail((prev) => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>
              <div className="col-lg-12 mb-3">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <Typography.Text strong>Thumbnail Image</Typography.Text>
                    <StyledUpload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </StyledUpload>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-3">
                <Typography.Text strong>Content</Typography.Text>
                <CKEditor
                  editor={ClassicEditor}
                  data={postDetail?.content}
                  onChange={(e, editor) => setPostDetail((prev) => ({ ...prev, content: editor.getData() }))}
                  config={customConfiguration}
                />
              </div>
              <div className="col-lg-12 mb-3">
                <Button type="primary" onClick={handleSave} loading={loading} className="mr-3">
                  Save
                </Button>
              </div>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </>
  )
}

export default NewNotice
