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
import { AddAdmin } from 'src/api/catalog/AdminAPI'


const AdminAdd = () => {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [role, setRole] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    name: name,
    email: email,
    password: password,
    role: parseInt(role)
  }
 
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else{
      setValidated(false)
      AddAdmin(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Admin Ekle</span>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row needs-validation my-form"
            id='my-form'
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol sm="6">
                <CFormInput onChange={e => setName(e.target.value)} name='name' type="text" label="İsim Ve Soyisim" required />
                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
              </CCol>
              <CCol sm="6">
                <CFormInput onChange={e => setEmail(e.target.value)} name='email' type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen email adresini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={e => setPassword(e.target.value)} name='password' type="password" label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setRole(e.target.value)} name='role' label="Rol:">
                  <option value={""}>Seçiniz</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen rol seçiniz.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{width:'100%'}}>
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

export default AdminAdd
