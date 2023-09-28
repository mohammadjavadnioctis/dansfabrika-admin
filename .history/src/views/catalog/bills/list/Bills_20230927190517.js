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
  import { FaFileExcel } from "react-icons/fa";
  import { BASE_URL } from 'src/config/Config'
import { DeleteBill, GetAllBills } from 'src/api/catalog/BillsAPI'
import { GetProcessTypeName } from 'src/definitions/Enums/ProcessTypeEnum'

  const defaultFilterValue = [
    { name: 'id', operator: 'startsWith', type: 'string' },
    { name: 'processType', operator: 'startsWith', type: 'string' },
    { name: 'process', operator: 'startsWith', type: 'string' },
  ]
  
  const title = [
    { name: 'id', type: 'number', maxWidth: 100, header: 'ID', defaultVisible: true },
    {
      name: 'processType', defaultFlex: 2, header: 'İşlem Tipi', render: ({ data }) => (
        GetProcessTypeName(data.processType) 
      )
    },
    {
      name: 'process', defaultFlex: 3, header: 'İşlem', render: ({ data }) => (
        GetProcessName(data.process) 
      )
    },
    { name: 'description', defaultFlex: 3, header: 'Açıklama' },
    { name: 'processDate', defaultFlex: 2, header: 'Tarih' },
    { name: 'price', defaultFlex: 2, header: 'Tutar' },
    {
      name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
        <div>
          <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/bills/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
          <GridLinkDelete onClick={() => DeleteBill(data.id)} title={"Sil"}></GridLinkDelete>
        </div>
      )
    },
  ]
  
  const Bills = () => {
  
    // Export Excel
    const exportHeader = ["id", "processType", "process", "description", "processDate", "price"];
  
    function HandleDownloadExcel() {
      downloadExcel({
        fileName: "Gelir ve Giderler",
        sheet: "react-export-table-to-excel",
        tablePayload: {
          header: exportHeader,
          body: bills,
        },
      });
    }
  
    const [bills, setBills] = useState([]);
  
    useEffect(() => {
      GetAllBills()
        .then((response) => {
            setBills(response.data)
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
                <CFormLabel className="mt-1 text-light">Gelir ve Giderler</CFormLabel>
  
                <CButton
                  className="float-end bg-light text-dark"
                  href={BASE_URL + 'catalog/bills/add'}
                >
                  <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                  <SpanDatatableHead text={'Gelir veya Gider Ekle'}></SpanDatatableHead>
                </CButton>
              </CCardHeader>
  
              <CCardBody>
  
                <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                  <FaFileExcel></FaFileExcel>
                  <span>Export Excel</span>
                </CButton>
  
                {bills.length > 0 && (
                  <ReactDataGrid
                    idProperty="id"
                    style={gridStyle}
                    columns={title}
                    pagination
                    dataSource={bills}
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
  
  export default Bills
  