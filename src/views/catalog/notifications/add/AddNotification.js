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
  CFormLabel,
} from '@coreui/react'
import { AddNotifications } from 'src/api/catalog/NotificationAPI'

const NotificationAdd = () => {

  const [type, setType] = useState(null)
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)

  const [studentId, setStudentId] = useState(null)
  const [courseId, setCourseId] = useState(null)

  const [selectedValueType, setSelectedValueType] = useState(null)

  const [validated, setValidated] = useState(false)


  const body = {
    type: parseInt(type),
    title: title,
    message: message,
  }

  if(studentId){
    body.studentId = parseInt(studentId)
  }
  if(courseId){
    body.courseId = parseInt(courseId)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddNotifications(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }


  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Bildirim Ekle</span>
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
                <CFormSelect onChange={e => setType(e.target.value)} name='type' label="Tip:" required>
                  <option value={""}>Seçiniz</option>
                  <option value={0}>SMS</option>
                  <option value={1}>Mail</option>
                  <option value={2}>Bildirim</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen bildirim tipi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setSelectedValueType(e.target.value)} name='select_person' label="Kime" required>
                  <option value={""}>Seçiniz</option>
                  <option value={1}>Tüm öğrenciler</option>
                  <option value={2}>Seçilen sınıfa</option>
                  <option value={3}>Seçilen öğrencilere</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kime gönderileceğini seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={e => setTitle(e.target.value)} name='title' type="text" label="Başlık" required />
                <CFormFeedback invalid>Lütfen başlık giriniz.</CFormFeedback>
              </CCol>

              {selectedValueType == 2 && (
                <CCol sm="6">
                  <CFormSelect label="Sınıf Seçiniz" onChange={e => setCourseId(e.target.value)} required>
                    <option value={""}>Seçiniz</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Lütfen sınıf seçiniz.</CFormFeedback>
                </CCol>
              )}

              {selectedValueType == 3 && (
                <CCol sm="6">
                  <CFormSelect label="Öğrenci Seçiniz" onChange={e => setStudentId(e.target.value)} required>
                    <option value={""}>Seçiniz</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={10}>10</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Lütfen öğrenci seçiniz.</CFormFeedback>
                </CCol>
              )}

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
                    setMessage(data)
                  }}
                  required
                />
                <CFormFeedback invalid>Lütfen açıklama giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{ width: '100%' }}>
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

export default NotificationAdd
