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
import { FaFileExcel  } from "react-icons/fa";
import { DeleteCalendar, GetAllCalendars } from 'src/api/catalog/CalendarAPI'
import { BASE_URL } from 'src/config/Config'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'queue', operator: 'startsWith', type: 'string' },
  { name: 'image', operator: 'startsWith', type: 'string' },
  { name: 'status', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'queue', defaultFlex: 2, header: 'Takvim Sırası' },
  { name: 'image', defaultFlex: 3, header: 'Resim', render: ({ data }) => (
    <ImageFormatter src={data.image}></ImageFormatter>
  )},
  {
    name: 'status', defaultFlex: 3, header: 'Durum', render: ({ data }) => (
      GetStatusName(data.status) 
    )
  },
  { name: 'actions', defaultFlex:3, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/calendars/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteCalendar(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]


const Calendars = () => {
  // Export Excel
  const exportHeader = ["id", "queue", "name", "image", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Takvimler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: calendars,
      },
    });
  }

  const [calendars, setCalendars] = useState([]);
  
  useEffect(() => {
    GetAllCalendars()
    .then((response) => {
      setCalendars(response.data)
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
              <CFormLabel className="mt-1 text-light">Takvimler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/calendars/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Takvim Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>
              
              {calendars.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={calendars}
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

export default Calendars
