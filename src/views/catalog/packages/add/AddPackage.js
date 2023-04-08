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
  CFormTextarea,
} from '@coreui/react'

const PackagesAdd = () => {
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
          <strong>Paket Ekle</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol sm="4">
                <CFormInput type="text" label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
              <CCol sm="4">
                <CFormInput type="text" label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="text" label="Kredi" required />
                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CFormTextarea label="Açıklama" required></CFormTextarea>
                <CFormFeedback invalid>Lütfen açıklama giriniz.</CFormFeedback>
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

export default PackagesAdd
