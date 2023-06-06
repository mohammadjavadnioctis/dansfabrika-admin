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
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'
import { AddAttendance } from 'src/api/catalog/AttandanceAPI'

const AttendanceAdd = () => {

  const [attendanceDate, setAttedanceDate] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [studentId, setStudentId] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    attendanceDate: attendanceDate,
    courseId: parseInt(courseId),
    lessonId: parseInt(lessonId),
    studentId: parseInt(studentId)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddAttendance(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }


  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Yoklama Ekle</span>
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
                <CFormInput onChange={e => setAttedanceDate(e.target.value)} name='attendaceDate' type="date" label="Tarih" required />
                <CFormFeedback invalid>Lütfen tarih giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setCourseId(e.target.value)} name='course_id' label="Kurs:">
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={2}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect onChange={e => setLessonId(e.target.value)} name='lesson_id' label="Ders:">
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={2}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen ders seçiniz.</CFormFeedback>
              </CCol>
              <CCol sm="6">
                <CFormSelect onChange={e => setStudentId(e.target.value)} name='student_id' label="Öğrenci:">
                  <option value={0}>Seçiniz</option>
                  <option value={1}>Aktif</option>
                  <option value={10}>Pasif</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen öğrenci seçiniz.</CFormFeedback>
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

export default AttendanceAdd
