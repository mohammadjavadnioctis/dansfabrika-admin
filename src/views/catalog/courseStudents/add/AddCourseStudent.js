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
import { AddCourseStudent } from 'src/api/catalog/Course-StudentAPI'
import useCourseData from 'src/definitions/SelectData/Course'
import useStudentData from 'src/definitions/SelectData/Student'

const CourseStudentAdd = () => {

  const [courseId, setCourseId] = useState(null)
  const [studentId, setStudentId] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [paidPrice, setPaidPrice] = useState(null)
  const [createdDate, setCreatedDate] = useState(null)

  const [validated, setValidated] = useState(false)

  const courses = useCourseData();
  const students = useStudentData();

  const body = {
    courseId: parseInt(courseId),
    studentId: parseInt(studentId),
    startDate: startDate,
    endDate: endDate,
    paidPrice: parseFloat(paidPrice),
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
      AddCourseStudent(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Öğrenci Kurs Ekle</span>
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
                <CFormSelect label="Kurs Seçiniz:" onChange={e => setCourseId(e.target.value)} name='course_id' required>
                <option value={""}>Seçiniz</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.description}</option>
                ))}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Öğrenci Seçiniz:" onChange={e => setStudentId(e.target.value)} name='student_id' required>
                  <option value={""}>Seçiniz</option>
                  {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen öğrenci seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" label="Başlangıç Tarihi" onChange={e => setStartDate(e.target.value)} name='start_date' required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" label="Bitiş Tarihi" onChange={e => setEndDate(e.target.value)} name='end_date' required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="text" label="Ödenen Tutar" onChange={e => setPaidPrice(e.target.value)} name='paid_price' required />
                <CFormFeedback invalid>Lütfen ödenen tutarı giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{width:"100%"}}>
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

export default CourseStudentAdd
