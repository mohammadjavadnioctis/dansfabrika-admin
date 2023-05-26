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
import { AddCalendarImages, GetByIdCalendar, UpdateCalendar } from 'src/api/catalog/CalendarAPI'
import { useParams } from 'react-router-dom'


const CalendarAdd = () => {

  const [queue, setQueue] = useState(null)
  const [name, setName] = useState(null)
  const [status, setStatus] = useState(null)

  const {id} = useParams()

  const [image, setImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
    queue: queue,
    name: name,
    status: parseInt(status),
  }

  const formData = new FormData()
  formData.append("id", parseInt(id))
  formData.append("image", image)

  const handleSubmit =(event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)

      UpdateCalendar(body)

      AddCalendarImages(formData)
    }
    event.preventDefault()

  }

  useEffect(() => {
    GetByIdCalendar(id)
    .then(response => {
      setQueue(response.data.queue)
      setName(response.data.name)
      setImage(response.data.image)
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
          <span className='text-white'>Takvim Güncelle</span>
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
                <CFormInput type="number" onChange={e => setQueue(e.target.value)} value={(queue!=null) ? queue : ""} name='queue' label="Sıra" required />
                <CFormFeedback invalid>Sıra giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="text" onChange={e => setName(e.target.value)} value={(name!=null) ? name : ""} name='queue' label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.files[0])} name='image' type="file" label="Resim" />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status!=null) ? status : ""} required>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
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
