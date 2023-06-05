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

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'description', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: true },
  { name: 'name', defaultFlex: 2, header: 'Ad' },
  { name: 'description', defaultFlex: 3, header: 'Açıklama' },
  { name: 'price', defaultFlex: 3, header: 'Tutar' },
  { name: 'status', defaultFlex: 2, header: 'Statü' },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/packages/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeletePackage(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]

const Packages = () => {

  // Export Excel
  const exportHeader = ["id", "name", "description", "price", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Paketler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: packages,
      },
    });
  }

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    GetAllPackages()
      .then((response) => {
        setPackages(response.data)
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
              <CFormLabel className="mt-1 text-light">Paketler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/packages/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Paket Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {packages.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={packages}
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

export default Packages
