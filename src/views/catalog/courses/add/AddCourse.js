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
  CFormLabel,
} from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { AddCourse } from 'src/api/catalog/CourseAPI'
import { GetCourseTypeOptions } from 'src/definitions/Enums/CourseTypeEnums'

const CourseAdd = () => {

  const [danceTypeId, setDanceTypeId] = useState(null)
  const [danceLevelId, setDanceLevelId] = useState(null)
  const [capacity, setCapacity] = useState(null)
  const [trainerId, setTrainerId] = useState(null)
  const [description, setDescription] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [courseType, setCourseType] = useState(null)
  const [onSale, setOnSale] = useState(null)
  const [price, setPrice] = useState(null)

  const [image, setImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    danceTypeId: parseInt(danceTypeId),
    danceLevelId: parseInt(danceLevelId),
    capacity: parseInt(capacity),
    trainerId: parseInt(trainerId),
    description: description,
    startDate: startDate,
    endDate: endDate,
    courseType: parseInt(courseType),
    onSale: parseInt(onSale),
    price: parseFloat(price),
    image: image,
  }

  const handleSubmit = (event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddCourse(body)
    }
    event.preventDefault()

  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Kurs Ekle</span>
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
                <CFormSelect label="Dans Tipi Seçiniz:" onChange={e => setDanceTypeId(e.target.value)} name='dans_type_id' required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setDanceLevelId(e.target.value)} label="Dans Leveli" name="dance_level_id" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans leveli seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" onChange={e => setCapacity(e.target.value)} label="Kapasite" required />
                <CFormFeedback invalid>Lütfen kapasite giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setTrainerId(e.target.value)} label="Eğitmen Seçiniz:" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen eğitmen seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" onChange={e => setStartDate(e.target.value)} label="Başlangıç Tarihi" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" onChange={e => setEndDate(e.target.value)} label="Bitiş Tarihi" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect onChange={e => setCourseType(e.target.value)} label="Kurs Tipi" required>
                  <option value="" disabled>Seçiniz</option>
                  {GetCourseTypeOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setOnSale(e.target.value)} label="Satış Durumu" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Satışa Açık</option>
                  <option value={-1}>Satışa Kapalı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen satış durumunu seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.value)} name='image' type="file" label="Resim" /> 
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="number" onChange={e => setPrice(e.target.value)} label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
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

export default CourseAdd
