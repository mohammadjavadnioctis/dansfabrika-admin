import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
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
  CFormLabel
} from '@coreui/react'
import { AddTrainer } from 'src/api/catalog/TrainerAPI'


const TrainerAdd = () => {
  
  const [name, setName] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [password, setPassword] = useState(null)
  const [description, setDescription] = useState(null)

  const [image, setImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    birthday: birthday,
    description: description,
  }

  const formData = new FormData()
   
  formData.append("image", image)
 
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else{
      setValidated(false)
      AddTrainer(body,formData)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }

  return (
    <CContainer>
      <CCard>
      <CCardHeader className="bg-dark">
          <span className='text-white'>Eğitmen Ekle</span>
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
                <CFormInput onChange={e => setBirthday(e.target.value)} name='birthday' type="date" label="Doğum Tarihi" required />
                <CFormFeedback invalid>Lütfen doğum tarihini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={e => setEmail(e.target.value)} name='email' type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen emailinizi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput onChange={e => setPhone(e.target.value)} name='phone' type="phone" label="Telefon Numarası" required />
                <CFormFeedback invalid>Lütfen telefon numarasını giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={e => setPassword(e.target.value)} name='password' type="password" label="Şifre" required />
                <CFormFeedback invalid>Lütfen şifre giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.files[0])} name='image' type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
              <CFormLabel>Açıklama</CFormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data="Lütfen mesajınızı giriniz."
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                  required
                />
                <CFormFeedback invalid>Lütfen açıklama giriniz.</CFormFeedback>
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

export default TrainerAdd
