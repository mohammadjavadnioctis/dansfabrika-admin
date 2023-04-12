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
import Attendances from '../list/Attendances'

const AttendanceAdd = () => {
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
          <strong>Yoklama Ekle</strong>
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
                <CFormInput type="date" label="Tarih" required />
                <CFormFeedback invalid>Lütfen tarih giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Kurs:">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect label="Ders:">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen ders seçiniz.</CFormFeedback>
              </CCol>
              <CCol sm="6">
                <CFormSelect label="Öğrenci:">
                  <option>Seçiniz</option>
                  <option>Admin</option>
                  <option>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen öğrenci seçiniz.</CFormFeedback>
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

export default AttendanceAdd
