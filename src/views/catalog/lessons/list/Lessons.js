import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { cilPlus } from '@coreui/icons'
import { DeleteLesson, GetAllLessons } from 'src/api/catalog/LessonAPI'
import { GridLinkDelete, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel  } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'
import { GetDayName } from 'src/definitions/Enums/DayEnum'
import { GetCourseTypeName } from 'src/definitions/Enums/CourseTypeEnums' 


const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'courseId', operator: 'startsWith', type: 'string' },
  { name: 'day', operator: 'startsWith', type: 'string' },
  { name: 'startTime', operator: 'startsWith', type: 'string' },
  { name: 'endTime', operator: 'startsWith', type: 'string' },
  { name: 'status', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'courseId', minWidth: 275, header: 'Kurs Adı', render: ({ data }) => (
    GetCourseTypeName(data.course.courseType)+ ' - ' + data.course.danceType.name + ' ' + data.course.danceLevel.name + ' ' + data.course.trainer?.name 
  )},
  { name: 'day', header: 'Kurs Günü', render: ({ data }) => (
    GetDayName(data.day)
  )},
  { name: 'startTime', header: 'Başlangıç Saati' },
  { name: 'endTime', header: 'Bitiş Saati' },
  { name: 'status', header: 'Durum', render: ({ data }) => (
    GetStatusName(data.status)
  )},
  { name: 'actions', minWidth: 300, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/lessons/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteLesson(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]

const Lessons = () => {
  
  // Export Excel
  const exportHeader = ["id", "courseId", "day", "startTime", "endTime", "status", "createdDate"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Dersler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: lessons,
      },
    });
  }

  const [lessons, setLessons] = useState([]);
  
  useEffect(() => {
    GetAllLessons()
    .then((response) => {
      setLessons(response.data)
      console.log('this is the fetched lessons: ', response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark">
              <CFormLabel className="mt-1 text-light">Kurs Haftalık Günleri</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/lessons/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Kurs Günü Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>
              
              {lessons.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={lessons}
                  defaultLimit={10}
                  defaultFilterValue={defaultFilterValue}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Lessons
