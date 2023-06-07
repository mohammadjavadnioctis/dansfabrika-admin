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
  CFormLabel,
} from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { AddCourse, GetByIdCourse, UpdateCourse } from 'src/api/catalog/CourseAPI'
import { useParams } from 'react-router-dom'
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'

const CourseUpdate = () => {

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
  const [status, setStatus] = useState(null)

  const [image, setImage] = useState(null)

  const { id } = useParams()
  
  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
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
    status: parseInt(status),
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
      UpdateCourse(body)
    }
    event.preventDefault()

  }

  useEffect(() => {
    GetByIdCourse(id)
        .then(response => {
            setDanceTypeId(response.data.danceTypeId)
            setDanceLevelId(response.data.danceLevelId)
            setCapacity(response.data.capacity)
            setTrainerId(response.data.trainerId)
            setDescription(response.data.description)
            setStartDate(SetDateFormat(response.data.startDate))
            setEndDate(SetDateFormat(response.data.endDate))
            setCourseType(response.data.courseType)
            setOnSale(response.data.onSale)
            setPrice(response.data.price)
            setStatus(response.data.status)
            setImage(response.data.image)
        })
        .catch(error => {
            console.log(error);
        })
}, []);

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Kurs Güncelle</span>
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
                <CFormSelect label="Dans Tipi Seçiniz:" onChange={e => setDanceTypeId(e.target.value)} value={(danceTypeId != null) ? danceTypeId : ""} name='dans_type_id' required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setDanceLevelId(e.target.value)} value={(danceLevelId != null) ? danceLevelId : ""} label="Dans Leveli" name="dance_level_id" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen dans leveli seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" onChange={e => setCapacity(e.target.value)} value={(capacity != null) ? capacity : ""} label="Kapasite" required />
                <CFormFeedback invalid>Lütfen kapasite giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setTrainerId(e.target.value)} value={(trainerId != null) ? trainerId : ""} label="Eğitmen Seçiniz:" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen eğitmen seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" onChange={e => setStartDate(e.target.value)} value={(startDate != null) ? startDate : ""} label="Başlangıç Tarihi" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" onChange={e => setEndDate(e.target.value)} value={(endDate != null) ? endDate : ""} label="Bitiş Tarihi" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect onChange={e => setCourseType(e.target.value)} value={(courseType != null) ? courseType : ""} label="Kurs Tipi" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setOnSale(e.target.value)} value={(onSale != null) ? onSale : ""} label="Satış Durumu" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={-1}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen satış durumunu seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.value)} value={(image != null) ? image : ""} name='image' type="file" label="Resim" /> 
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="number" onChange={e => setPrice(e.target.value)} value={(price != null) ? price : ""}label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} label="Statü" required>
                  <option value="" disabled>Seçiniz</option>
                  {GetStatusOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CFormLabel>Açıklama</CFormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={(description != null) ? description : ""}
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

export default CourseUpdate
