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
import React, { useCallback, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import {
  columns,
  dataSource,
  defaultFilterValue,
} from 'src/dami_data/packages/PackageData'
import CIcon from '@coreui/icons-react'
import { cilInbox } from '@coreui/icons'

const gridStyle = { minHeight: 550, marginTop: 10 }

const loadData = ({ skip, limit, sortInfo }) => {
  const url =
    dataSource + '?skip=' + skip + '&limit=' + limit + '&sortInfo=' + JSON.stringify(sortInfo)

  return fetch(url).then((response) => {
    const totalCount = response.headers.get('X-Total-Count')
    return response.json().then((data) => {
      return Promise.resolve({ data, count: parseInt(totalCount) })
    })
  })
}

const Packages = () => {
  //const dataSource = useCallback(loadData, []);

  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true
    menuProps.items = [
      {
        label: 'Row ' + rowProps.rowIndex,
      },
    ]
  }
  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark">
              <CFormLabel className="mt-1 text-light">Paketler</CFormLabel>
              <CButton
                className="float-end bg-light text-dark"
                href={process.env.REACT_APP_BASE_URL + 'catalog/packages/add'}
              >
                <CIcon icon={cilInbox} className="mx-2" />
                Paket Ekle
              </CButton>
            </CCardHeader>

            <CCardBody>
              <ReactDataGrid
                idProperty="id"
                defaultFilterValue={defaultFilterValue}
                renderRowContextMenu={renderRowContextMenu}
                style={gridStyle}
                columns={columns}
                pagination
                dataSource={dataSource}
                defaultLimit={10}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Packages
