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
import { AddLesson } from 'src/api/catalog/LessonAPI'
import { GetDayOptions } from 'src/definitions/Enums/DayEnum'
import useCourseData from 'src/definitions/SelectData/Course'
import Select from 'react-select';
import { GetCourseTypeName } from 'src/definitions/Enums/CourseTypeEnums'


const LessonAdd = () => {

  const [courseId, setCourseId] = useState(null)
  const [day, setDay] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [date, setDate] = useState(null)
  const [validated, setValidated] = useState(false)

  const courses = useCourseData();

  const body = {
    courseId: courseId ? parseInt(courseId.value) : null,
    day: parseInt(day),
    startTime: startTime,
    endTime: endTime,
    performDate: date,
    status: 0
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddLesson(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }

  const [searchTerm, setSearchTerm] = useState('');
  const filteredCourses = courses.filter((course) =>
    course.danceType.name + course.danceLevel.name + course.trainer?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDateChange = (e) => {
    const dateInputValue = e?.target.value;
    // console.log(dateInputValue)
    body.performDate = dateInputValue
    setDate(dateInputValue)
  } 

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Kurs Günü Ekle</span>
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
                  value={courseId}
                  onChange={(selectedOption) => setCourseId(selectedOption)}
                  options={filteredCourses.map((course) => ({
                    value: course.id,
                    label: GetCourseTypeName(course.courseType) + ' - ' + course?.danceLevel?.name + ' - ' + course.danceType.name + ' ' + course.danceLevel.name + ' ' + course.trainer?.name,
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
              <CCol sm="6">
                <CFormInput type="time" onChange={e => setStartTime(e.target.value)} name='start_time' label="Başlangıç Saati" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="time" onChange={e => setEndTime(e.target.value)} name='end_time' label="Bitiş Saati" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>

            </CRow>
            <CCol sm="6">
            <CFormInput
                type="date"
                label="Pick date"
                placeholder="Pick date"
                value={date}
                onChange={handleDateChange}
                // required
                name='performDate'
              />
            </CCol>

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

export default LessonAdd
