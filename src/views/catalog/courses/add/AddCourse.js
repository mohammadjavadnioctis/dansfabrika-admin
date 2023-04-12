import React, { useState } from 'react'
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
} from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const CourseAdd = () => {
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
          <strong>Kurs Ekle</strong>
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
                <CFormSelect label="Dans Tipi">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Dans Leveli">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans leveli seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Kapasite" required />
                <CFormFeedback invalid>Lütfen kapasite giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Eğitmen Seçiniz:">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen eğitmen seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" label="Başlangıç Tarihi" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" label="Bitiş Tarihi" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect label="Kurs Tipi">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Satış Durumu">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen satış durumunu seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="number" label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect label="Statü">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default CourseAdd
