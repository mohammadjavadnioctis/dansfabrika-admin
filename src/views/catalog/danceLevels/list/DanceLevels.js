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
import { DeleteDanceLevel, GetAllDanceLevels } from 'src/api/catalog/Dance-LevelAPI'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'


const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'status', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Dans Seviye Adı' },
  {
    name: 'status', defaultFlex: 3, header: 'Durum', render: ({ data }) => (
      GetStatusName(data.status) 
    )
  },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/danceLevels/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeleteDanceLevel(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]

const DanceTypes = () => {

  // Export Excel
  const exportHeader = ["id", "name", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Dans Levelleri",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: danceLevels,
      },
    });
  }

  const [danceLevels, setDanceLevels] = useState([]);

  useEffect(() => {
    GetAllDanceLevels()
      .then((response) => {
        setDanceLevels(response.data)
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
              <CFormLabel className="mt-1 text-light">Dans Seviyeleri</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/danceLevels/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Dans Seviyesi Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {danceLevels.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={danceLevels}
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
