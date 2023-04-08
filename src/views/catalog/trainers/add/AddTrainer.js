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

const AddTrainer = () => {
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
          <strong>Eğitmen Ekle</strong>
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
                <CFormInput type="date" label="Doğum Tarihi" required />
                <CFormFeedback invalid>Lütfen doğum tarihini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen emailinizi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="phone" label="Telefon Numarası" required />
                <CFormFeedback invalid>Lütfen telefon numarasını giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="password" label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim yükleyiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect label="Statü:">
                  <option>Seçiniz</option>
                  <option>Aktif</option>
                  <option>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
              </CCol>
              <CCol sm="6">
                <CFormTextarea label="Açıklama"></CFormTextarea>
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

export default AddTrainer
