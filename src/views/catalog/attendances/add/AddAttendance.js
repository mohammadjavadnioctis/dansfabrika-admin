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
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'
import { AddAttendance } from 'src/api/catalog/AttandanceAPI'
import useCourseData from 'src/definitions/SelectData/Course'
import useStudentData from 'src/definitions/SelectData/Student'
import useLessonData from 'src/definitions/SelectData/Lesson'
import Select from 'react-select';
import { GetCourseTypeName } from 'src/definitions/Enums/CourseTypeEnums'


const AttendanceAdd = () => {

  const [attendanceDate, setAttedanceDate] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [studentId, setStudentId] = useState(null)

  const [validated, setValidated] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState({})

  const courses = useCourseData();
  const students = useStudentData();
  const lessons = useLessonData();
  
  const body = {
    attendanceDate: attendanceDate,
    courseId: courseId ? parseInt(courseId.value) : null,
    studentId: studentId ? parseInt(studentId.value) : null,
    lessonId: parseInt(lessonId),
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

  const handleCourseSelection = (selectedOption) =>  {
   
    setCourseId(selectedOption)

  }

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCourses = courses.filter((course) =>
    course.danceType.name + course.danceLevel.name + course.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /*
  const filteredLessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  */

  useEffect(() => {
      console.log('courseId Changed', courseId)
      const selectedCourseData = courses.find(course => course.id === courseId.value)
      console.log('here is hte selected course: ', selectedCourse)
      setSelectedCourse(selectedCourseData)
    } ,[courseId])


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
                <label htmlFor="courseSelect">Kurs Seçiniz</label>
                <Select
                  className='mt-2'
                  name="course"
                  required
                  value={courseId}
                  onChange={(selectedOption) => handleCourseSelection(selectedOption)}
                  options={filteredCourses.map((course) => ({
                    value: course.id,
                    label: course.danceType.name + ' ' + course.danceLevel.name + ' ' + course.trainer.name + ' ' + new Date(course.createdDate),
                  }))}
                />
                {validated && courseId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen kurs seçiniz.</CFormFeedback>
                )}
                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect onChange={e => setLessonId(e.target.value)} name='lesson_id' label="Ders:">
                  <option value={""}>Seçiniz</option>
                  {/* {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>{GetCourseTypeName(lesson?.course.courseType)} {lesson?.course?.danceType?.name} {lesson.performDate} {lesson.startTime} - {lesson.endTime} {lesson.id}</option>
                  ))} */}
                   {selectedCourse && selectedCourse?.lesson && selectedCourse?.lesson?.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>
                      {/* {GetCourseTypeName(lesson?.course.courseType)}  */}
                      {lesson?.course?.danceType?.name} {lesson.performDate} {lesson.startTime} - {lesson.endTime} {lesson.id}
                      </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen ders seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <label htmlFor="studentSelect">Öğrenci Seçiniz</label>
                <Select
                  className='mt-2'
                  value={studentId}
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
