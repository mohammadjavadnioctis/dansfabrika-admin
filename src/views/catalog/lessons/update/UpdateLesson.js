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
import { GetByIdLesson, UpdateLesson } from 'src/api/catalog/LessonAPI'
import { useParams } from 'react-router-dom'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'
import { GetDayOptions } from 'src/definitions/Enums/DayEnum'
import useCourseData from 'src/definitions/SelectData/Course'
import Select from 'react-select';

const LessonUpdate = () => {

  const [courseId, setCourseId] = useState(null)
  const [day, setDay] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [status, setStatus] = useState(null)

  const { id } = useParams()

  const [validated, setValidated] = useState(false)

  const courses = useCourseData();

  const body = {
    id: parseInt(id),
    courseId: courseId ? parseInt(courseId.value) : null,
    day: parseInt(day),
    startTime: startTime,
    endTime: endTime,
    status: parseInt(status)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      UpdateLesson(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdLesson(id)
      .then(response => {
        setCourseId({ value: response.data.courseId, label: response.data.course.danceType.name + ' ' + response.data.course.danceLevel.name + ' ' + response.data.course.trainer.name })
        setDay(response.data.day)
        setStartTime(response.data.startTime)
        setEndTime(response.data.endTime)
        setStatus(response.data.status)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.danceType.name + course.danceLevel.name + course.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Ders Güncelle</span>
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
                <CFormSelect onChange={e => setDay(e.target.value)} value={(day != null) ? day : ""} name='day' label="Gün" required>
                  <option value={""} disabled>Seçiniz</option>
                  {GetDayOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen gün giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput type="time" onChange={e => setStartTime(e.target.value)} value={(startTime != null) ? startTime : ""} name='start_time' label="Başlangıç Saati" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput type="time" onChange={e => setEndTime(e.target.value)} value={(endTime != null) ? endTime : ""} name='end_time' label="Bitiş Saati" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='status'>
                  <option value={""} disabled>Seçiniz</option>
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

export default LessonUpdate
