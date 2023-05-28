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
import { GetByIdCourseStudent, UpdateCourseStudent } from 'src/api/catalog/Course-StudentAPI'
import { useParams } from 'react-router-dom'

const CourseStudentUpdate = () => {

  const [courseId, setCourseId] = useState(null)
  const [studentId, setStudentId] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [paidPrice, setPaidPrice] = useState(null)
  const [status, setStatus] = useState(null)
  const [createdDate, setCreatedDate] = useState(null)

  const {id} = useParams()

  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
    courseId: parseInt(courseId),
    studentId: parseInt(studentId),
    startDate: startDate,
    endDate: endDate,
    paidPrice: parseFloat(paidPrice),
    status: parseInt(status),
    createdDate: createdDate,
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      UpdateCourseStudent(body)  
    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdCourseStudent(id)
    .then(response => {
      setCourseId(response.data.courseId)
      setStudentId(response.data.studentId)
      setStartDate(response.data.startDate)
      setEndDate(response.data.endDate)
      setPaidPrice(response.data.paidPrice)
      setStatus(response.data.status)
      setCreatedDate(response.data.createdDate)
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Öğrenci Kurs Güncelle</span>
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
                <CFormSelect label="Kurs Seçiniz:" onChange={e => setCourseId(e.target.value)} value={(courseId!=null) ? courseId : ""} name='course_id' required>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Öğrenci Seçiniz:" onChange={e => setStudentId(e.target.value)} value={(studentId!=null) ? studentId : ""} name='student_id' required>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen öğrenci seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" label="Başlangıç Tarihi" onChange={e => setStartDate(e.target.value)} value={(startDate!=null) ? startDate : ""} name='start_date' required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" label="Bitiş Tarihi" onChange={e => setEndDate(e.target.value)} value={(endDate!=null) ? endDate : ""} name='end_date' required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Ödenen Tutar" onChange={e => setPaidPrice(e.target.value)} value={(paidPrice!=null) ? paidPrice : ""} name='paid_price' required />
                <CFormFeedback invalid>Lütfen ödenen tutarı giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü Seçiniz:" onChange={e => setStatus(e.target.value)} value={(status!=null) ? status : ""} name='status' required>
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Kullanıcı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default CourseStudentUpdate