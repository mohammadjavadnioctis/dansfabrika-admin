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

const StudentAdd = () => {
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
          <strong>Öğrenci Ekle</strong>
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
                <CFormInput type="text" label="İsim Ve Soyisim" required />
                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen email adresini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput type="text" label="Telefon" required />
                <CFormFeedback invalid>Lütfen telefon giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="password" label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput type="text" label="Ülke" required />
                <CFormFeedback invalid>Lütfen ülke giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="text" label="Gender" required />
                <CFormFeedback invalid>Lütfen gender giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="date" label="Doğum Tarihi" required />
                <CFormFeedback invalid>Lütfen doğum tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Kredi" required />
                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" label="Skor" required />
                <CFormFeedback invalid>Lütfen skor giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Referans" required />
                <CFormFeedback invalid>Lütfen referans giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Referans Seçiniz:">
                  <option>Seçiniz</option>
                  <option>Aktif</option>
                  <option>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen referans seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Kod" required />
                <CFormFeedback invalid>Lütfen kod giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü">
                  <option>Seçiniz</option>
                  <option>Aktif</option>
                  <option>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default StudentAdd
