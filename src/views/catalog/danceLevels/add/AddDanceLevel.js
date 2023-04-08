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

const DanceLevelAdd = () => {
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
          <strong>Dans Leveli Ekle</strong>
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
                <CFormInput type="text" label="Dans Leveli" required />
                <CFormFeedback invalid>Lütfen dans leveli giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü:">
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

export default DanceLevelAdd
