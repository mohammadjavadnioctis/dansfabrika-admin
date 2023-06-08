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
import { GetByIdAttendance, UpdateAttendance } from 'src/api/catalog/AttandanceAPI'
import { useParams } from 'react-router-dom'
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import useCourseData from 'src/definitions/SelectData/Course'
import useStudentData from 'src/definitions/SelectData/Student'
import useLessonData from 'src/definitions/SelectData/Lesson'


const AttendanceUpdate = () => {

    const [attendanceDate, setAttedanceDate] = useState(null)
    const [courseId, setCourseId] = useState(null)
    const [lessonId, setLessonId] = useState(null)
    const [studentId, setStudentId] = useState(null)

    const { id } = useParams()

    const [validated, setValidated] = useState(false)

    const courses = useCourseData();
    const students = useStudentData();
    const lessons = useLessonData();

    const body = {
        id: parseInt(id),
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
            UpdateAttendance(body)  // Ekleme fonksiyonu
        }
        event.preventDefault()
    }

    useEffect(() => {
        GetByIdAttendance(id)
            .then(response => {
                setAttedanceDate(SetDateTimeFormat(response.data.attendanceDate))
                setCourseId(response.data.courseId)
                setLessonId(response.data.lessonId)
                setStudentId(response.data.studentId)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <CContainer>
            <CCard>
                <CCardHeader className="bg-dark">
                    <span className='text-white'>Yoklama Güncelle</span>
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
                                <CFormInput onChange={e => setAttedanceDate(e.target.value)} value={(attendanceDate!=null) ? attendanceDate : ""} name='attendaceDate' type="datetime-local" label="Tarih" required />
                                <CFormFeedback invalid>Lütfen tarih giriniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormSelect onChange={e => setCourseId(e.target.value)} value={(courseId!=null) ? courseId : ""} name='course_id' label="Kurs:">
                                <option value={""}>Seçiniz</option>
                                {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.description}</option>
                                ))}
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen kurs seçiniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4">
                            <CCol sm="6">
                                <CFormSelect onChange={e => setLessonId(e.target.value)} value={(lessonId!=null) ? lessonId : ""} name='lesson_id' label="Ders:">
                                <option value={""}>Seçiniz</option>
                                {lessons.map(lesson => (
                                <option key={lesson.id} value={lesson.id}>{lesson.id}</option>
                                ))}
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen ders seçiniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormSelect onChange={e => setStudentId(e.target.value)} value={(studentId!=null) ? studentId : ""} name='student_id' label="Öğrenci:">
                                <option value={""}>Seçiniz</option>
                                {students.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                                ))}
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

export default AttendanceUpdate
