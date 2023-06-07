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
import { DeleteDanceType, GetAllDanceTypes } from 'src/api/catalog/Dance-TypeAPI'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'


const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'name', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Dans Adı' },
  {
    name: 'status', defaultFlex: 3, header: 'Durum', render: ({ data }) => (
      GetStatusName(data.status) 
    )
  },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/danceTypes/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeleteDanceType(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]

const DanceTypes = () => {

  // Export Excel
  const exportHeader = ["id", "name", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Dans Tipleri",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: danceTypes,
      },
    });
  }

  const [danceTypes, setDanceTypes] = useState([]);

  useEffect(() => {
    GetAllDanceTypes()
      .then((response) => {
        setDanceTypes(response.data)
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
              <CFormLabel className="mt-1 text-light">Dans Türleri</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/danceTypes/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Dans Tipi Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {danceTypes.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={danceTypes}
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

export default DanceTypes
