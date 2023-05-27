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
import { GridLinkDelete, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel  } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteSale, GetAllSales } from 'src/api/catalog/SaleAPI'

const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'studentId', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 70, header: 'ID', defaultVisible: true },
  { name: 'studentId', header: 'Öğrenci Id' },
  { name: 'credit', header: 'Kredi' },
  { name: 'price', header: 'Fiyat' },
  { name: 'type', header: 'Tip' },
  { name: 'sellBy', header: 'Satış Tarihi' },
  { name: 'name', header: 'Öğrenci Adı Soyadı' },
  { name: 'email', header: 'Öğrenci Email' },
  { name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/sales/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteSale(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]

const Sales = () => {

  // Export Excel
  const exportHeader = ["id", "name", "email", "role", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Adminler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: sales,
      },
    });
  }

  const [sales, setSales] = useState([])
  
  useEffect(() => {
    GetAllSales()
    .then((response) => {
      const sale = response.data.map((item) => ({
        id:item.id,
        studentId: item.studentId,
        credit: item.credit,
        price: item.price,
        type: item.type,
        sellBy: item.sellBy,
        name: item.student.name,
        email: item.student.email
      }))
      setSales(sale)
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
              <CFormLabel className="mt-1 text-light">Satışlar</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/sales/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Satış Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>
              
              {sales.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={sales}
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

export default Sales
