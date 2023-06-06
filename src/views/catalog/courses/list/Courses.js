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
import { GridLinkDelete, GridLinkUpdate, ImageFormatter, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteCourse, GetAllCourses } from 'src/api/catalog/CourseAPI'

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'danceTypeId', operator: 'startsWith', type: 'string' },
  { name: 'danceLevelId', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: true },
  { name: 'danceTypeId', header: 'Dans Tipi' },
  { name: 'danceLevelId', header: 'Dans Leveli' },
  { name: 'capacity', header: 'Kapasite' },
  { name: 'trainerId', header: 'Eğitmen' },
  { name: 'description', header: 'Açıklama' },
  { name: 'startDate', header: 'Başlangıç Tarihi' },
  { name: 'endDate', header: 'Bitiş Tarihi' },
  { name: 'courseType', header: 'Kurs Tipi' },
  { name: 'onSale', header: 'Satış Durumu' },
  { name: 'image', header: 'Resim', render: ({ data }) => (
    <ImageFormatter src={data.image}></ImageFormatter>
  )},
  { name: 'price', header: 'Fiyat' },
  { name: 'status', header: 'Statü' },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/courses/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeleteCourse(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]

const Courses = () => {

  // Export Excel
  const exportHeader = ["id", "name", "description", "price", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Kurslar",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: courses,
      },
    });
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    GetAllCourses()
      .then((response) => {
        setCourses(response.data)
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
              <CFormLabel className="mt-1 text-light">Kurslar</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/courses/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Kurs Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {courses.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={courses}
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

export default Courses
