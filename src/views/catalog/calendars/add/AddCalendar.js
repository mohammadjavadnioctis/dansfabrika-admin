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
import { AddCalendar } from 'src/api/catalog/CalendarAPI'


const CalendarAdd = () => {
  
  const [queue, setQueue] = useState(null)
  const [name, setName] = useState(null)

  const [image, setImage] = useState(null)
  const [chooseImage, setChooseImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    queue: queue,
    name: name,
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
      AddCalendar(body,formData)
    }
    event.preventDefault()

  }

  return (
    <CContainer>
      <CCard>
      <CCardHeader className="bg-dark">
          <span className='text-white'>Takvim Ekle</span>
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
                <CFormInput type="number" onChange={e => setQueue(e.target.value)} label="Sıra" required />
                <CFormFeedback invalid>Sıra giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" onChange={e => setName(e.target.value)} label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CFormInput id='fileInput' onChange={handleImageChange} name='image' type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
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

export default CalendarAdd
