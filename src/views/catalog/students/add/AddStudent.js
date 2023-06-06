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
import { AddStudent } from 'src/api/catalog/StudentAPI'

const StudentAdd = () => {
  const [name, setName] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [password, setPassword] = useState(null)
  const [gender, setGender] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [credit, setCredit] = useState(null)
  const [score, setScore] = useState(null)
  const [reference, setReference] = useState(null)
  const [reference_id, setReferenceId] = useState(null)

  const [image, setImage] = useState(null)
  const [chooseImage, setChooseImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    name: name,
    identity: identity,
    email: email,
    phone: phone,
    password: password,
    gender: parseInt(gender),
    birthday: birthday,
    credit: parseInt(credit),
    score: parseInt(score),
    reference: reference,
    reference_id: reference_id,
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setImage(file)

    reader.onload = (e) => {
      setChooseImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const formData = new FormData()
   
  formData.append("image", image)

  const handleSubmit =(event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddStudent(body,formData)
    }
    event.preventDefault()

  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Öğrenci Ekle</span>
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
                <CFormInput type="text" onChange={e => setName(e.target.value)} name='name' label="İsim Ve Soyisim" required />
                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="number" onChange={e => setIdentity(e.target.value)} name='identity' label="T.C. No: " required />
                <CFormFeedback invalid>Lütfen tc giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="email" onChange={e => setEmail(e.target.value)} name='email' label="Email" required />
                <CFormFeedback invalid>Lütfen email giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="number" onChange={e => setPhone(e.target.value)} name='phone' label="Telefon" required />
                <CFormFeedback invalid>Lütfen telefon giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="password" onChange={e => setPassword(e.target.value)} name='password' label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" onChange={e => setGender(e.target.value)} name='gender' label="Gender" required />
                <CFormFeedback invalid>Lütfen gender giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" onChange={e => setBirthday(e.target.value)} name='birthday' label="Doğum Tarihi" required />
                <CFormFeedback invalid>Lütfen doğum tarihinizi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" onChange={e => setCredit(e.target.value)} name='credit' label="Kredi" required />
                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" onChange={e => setScore(e.target.value)} name='score' label="Skor" required />
                <CFormFeedback invalid>Lütfen skor giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" onChange={e => setReference(e.target.value)} name='reference' label="Referans" required />
                <CFormFeedback invalid>Lütfen referans giriniz.</CFormFeedback>
              </CCol>
              
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect label="Referans Id Seçiniz:" onChange={e => setReferenceId(e.target.value)} name='reference_id'>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen referans seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput id='fileInput' onChange={handleImageChange} name='image' type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                
              </CCol>

              <CCol sm="6">
                {chooseImage && (
                  <img src={chooseImage} alt="Seçilen Resim" width="150" height="150" />
                )}
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

export default StudentAdd
