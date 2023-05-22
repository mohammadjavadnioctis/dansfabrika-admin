import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom';
import { GetByIdAdmin, UpdateAdmin } from 'src/api/catalog/AdminAPI'

const AdminUpdate = () => {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [role, setRole] = useState(null)
  const [status, setStatus] = useState(null)
  
  const {id} = useParams()

  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
    name: name,
    email: email,
    password: password,
    role: parseInt(role),
    status: parseInt(status)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else{
      setValidated(false)
      UpdateAdmin(body)  // Update fonksiyonu
    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdAdmin(id)
    .then(response => {
      setName(response.data.name)
      setEmail(response.data.email)
      setRole(response.data.role)
      setStatus(response.data.status)
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Admin Güncelle</span>
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
                <CFormInput onChange={e => setName(e.target.value)} value={(name!=null) ? name : ""} name='name' type="text" label="İsim Ve Soyisim" required />
                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
              </CCol>
              <CCol sm="6"> 
                <CFormInput onChange={e => setEmail(e.target.value)} value={(email!=null) ? email : ""} name='email' type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen email adresini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput onChange={e => setPassword(e.target.value)} value={(password!=null) ? password : ""} name='password' type="password" label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect onChange={e => setRole(e.target.value)} value={(role!=null) ? role : ""} name='role' label="Rol:">
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen rol seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status!=null) ? status : ""}>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{width:'100%'}}>
                    Güncelle
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AdminUpdate
