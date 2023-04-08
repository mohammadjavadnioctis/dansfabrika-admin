import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './../Notification.css'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CFormFeedback,
  CButton,
  CFormTextarea,
} from '@coreui/react'

const NotificationAdd = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <strong>Bildirim Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol sm="6">
                <CFormSelect label="Bildirim Tipi">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen bildirim tipi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Kime">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kime gönderileceğini seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CKEditor
                  editor={ClassicEditor}
                  data="Lütfen mesajınızı giriniz."
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    console.log({ event, editor, data })
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor)
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor)
                  }}
                />
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3">
                  Kaydet
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NotificationAdd
