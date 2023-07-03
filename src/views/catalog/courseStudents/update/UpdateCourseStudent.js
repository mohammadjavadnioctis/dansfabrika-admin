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
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'
import useCourseData from 'src/definitions/SelectData/Course'
import useStudentData from 'src/definitions/SelectData/Student'
import Select from 'react-select';

const CourseStudentUpdate = () => {

  const [courseId, setCourseId] = useState(null)
  const [studentId, setStudentId] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [paidPrice, setPaidPrice] = useState(null)
  const [status, setStatus] = useState(null)
  const [createdDate, setCreatedDate] = useState(null)

  const { id } = useParams()

  const [validated, setValidated] = useState(false)

  const courses = useCourseData();
  const students = useStudentData();

  const body = {
    id: parseInt(id),
    courseId: courseId ? parseInt(courseId.value) : null,
    studentId: studentId ? parseInt(studentId.value) : null,
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
console.log(studentId)
  useEffect(() => {
    GetByIdCourseStudent(id)
      .then(response => {
        setCourseId({ value: response.data.courseId, label: response.data.course.danceType.name + ' ' + response.data.course.danceLevel.name + ' ' + response.data.course.trainer.name })
        setStudentId({ value: response.data.studentId, label: response.data.student.name})
        setStartDate(SetDateFormat(response.data.startDate))
        setEndDate(SetDateFormat(response.data.endDate))
        setPaidPrice(response.data.paidPrice)
        setStatus(response.data.status)
        setCreatedDate(response.data.createdDate)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCourses = courses.filter((course) =>
    course.danceType.name + course.danceLevel.name + course.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
                <label htmlFor="courseSelect">Kurs Seçiniz</label>
                <Select
                  className='mt-2'
                  name="course"
                  required
                  value={(courseId != null) ? courseId : ""}
                  onChange={(selectedOption) => setCourseId(selectedOption)}
                  options={filteredCourses.map((course) => ({
                    value: course.id,
                    label: course.danceType.name + ' ' + course.danceLevel.name + ' ' + course.trainer.name,
                  }))}
                />
                {validated && courseId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen kurs seçiniz.</CFormFeedback>
                )}
              </CCol>

              <CCol sm="6">
                <label htmlFor="studentSelect">Öğrenci Seçiniz</label>
                <Select
                  className='mt-2'
                  value={(studentId != null) ? studentId : ""}
                  required
                  onChange={(selectedOption) => setStudentId(selectedOption)}
                  options={filteredStudents.map((student) => ({
                    value: student.id,
                    label: student.name + ' ' + student.email
                  }))}
                />
                {validated && studentId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen öğrenci seçiniz.</CFormFeedback>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" label="Başlangıç Tarihi" onChange={e => setStartDate(e.target.value)} value={(startDate != null) ? startDate : ""} name='start_date' required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" label="Bitiş Tarihi" onChange={e => setEndDate(e.target.value)} value={(endDate != null) ? endDate : ""} name='end_date' required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="number" label="Ödenen Tutar" onChange={e => setPaidPrice(e.target.value)} value={(paidPrice != null) ? paidPrice : ""} name='paid_price' required />
                <CFormFeedback invalid>Lütfen ödenen tutarı giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü Seçiniz:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='status' required>
                  <option value={""}>Seçiniz</option>
                  {GetStatusOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default CourseStudentUpdate