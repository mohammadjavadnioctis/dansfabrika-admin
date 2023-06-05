import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { cilPlus } from '@coreui/icons'
import { GridLinkDelete, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { GetAllNotifications } from 'src/api/catalog/NotificationAPI'

const defaultFilterValue = [
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'email', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Ad' },
  { name: 'email', defaultFlex: 3, header: 'Email' },
  { name: 'password', defaultFlex: 3, header: 'Şifre' },
  { name: 'role', defaultFlex: 3, header: 'Role' },
  { name: 'status', defaultFlex: 3, header: 'Statü' },
]

const Notifications = () => {
  
  // Export Excel
  const exportHeader = ["id", "name", "email", "role", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Bildirimler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: notifications,
      },
    });
  }

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    GetAllNotifications()
      .then((response) => {
        setNotifications(response.data)
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
              <CFormLabel className="mt-1 text-light">Bildirimler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/notifications/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Bildirim Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
            <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {notifications.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={notifications}
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

export default Notifications
