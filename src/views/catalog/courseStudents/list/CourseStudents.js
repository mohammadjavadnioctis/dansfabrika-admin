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
import { DateFormat, GridLinkDelete, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel  } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteCourseStudent, GetAllCourseStudents } from 'src/api/catalog/Course-StudentAPI'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'courseId', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'courseId', header: 'Kurs Adı' },
  { name: 'studentId', header: 'Öğrenci İsmi' },
  { name: 'startDate', header: 'Başlangıç Tarihi', render: ({ data }) => (
    <DateFormat date={data.startDate}></DateFormat>
  )},
  { name: 'endDate', header: 'Bitiş Tarihi', render: ({ data }) => (
    <DateFormat date={data.endDate}></DateFormat>
  )},
  { name: 'paidPrice', header: 'Ödenen Tutar' },
  { name: 'status', header: 'Durum', render: ({ data }) => (
    GetStatusName(data.status)
  )},
  { name: 'actions', minWidth: 300, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/courseStudents/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteCourseStudent(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]

const CourseStudents = () => {
  
  // Export Excel
  const exportHeader = ["id", "courseId", "studentId", "startDate", "endDate", "paidPrice", "status", "createdDate"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Öğrenci Kursları",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: courseStudents,
      },
    });
  }

  const [courseStudents, setCourseStudents] = useState([]);
  
  useEffect(() => {
    GetAllCourseStudents()
    .then((response) => {
      setCourseStudents(response.data)
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
              <CFormLabel className="mt-1 text-light">Öğrenci Kursları</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/courseStudents/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Öğrenci Kurs Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>
              
              {courseStudents.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={courseStudents}
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

export default CourseStudents
