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
import { DeletePackage, GetAllPackages } from 'src/api/catalog/PackageAPI'
import { DeleteAttendance, GetAllAttendances } from 'src/api/catalog/AttandanceAPI'

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'description', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'courseId', defaultFlex: 3, header: 'Kurs Id' },
  { name: 'lessonId', defaultFlex: 3, header: 'Ders Id' },
  { name: 'studentId', defaultFlex: 2, header: 'Öğrenci İsmi' },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/attendances/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeleteAttendance(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]


const Attendances = () => {
  
  // Export Excel
  const exportHeader = ["id", "attendanceDate", "courseId", "lessonId", "studentId"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Yoklamalar",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: packages,
      },
    });
  }

  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    GetAllAttendances()
      .then((response) => {
        setAttendances(response.data)
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
              <CFormLabel className="mt-1 text-light">Yoklamalar</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/attendances/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Yoklama Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {attendances.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={attendances}
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

export default Attendances
