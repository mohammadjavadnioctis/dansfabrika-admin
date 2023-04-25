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
import { dataSource, defaultFilterValue } from 'src/dami_data/admin/AdminData'
import CIcon from '@coreui/icons-react'
import { cilUserPlus } from '@coreui/icons'
import './App.css'

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

const gridLinkStyle={color:'black', marginRight:5,}
const GridLink=({onClick, title}) =><a style={gridLinkStyle} onClick={onClick}>{title}</a>

const columns = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Ad' },
  { name: 'email', defaultFlex: 3, header: 'Email' },
  { name: 'password', defaultFlex: 3, header: 'Şifre' },
  { name: 'role', defaultFlex: 3, header: 'Role' },
  { name: 'status', defaultFlex: 3, header: 'Statü' },
  { name: 'created_date', defaultFlex: 3, header: 'Oluşturma Tarihi' },
  { name: 'action', defaultFlex: 3, header: 'Aksiyon', render:({data}) => (
      <div>
        <GridLink onClick={()=>console.log(data.id+"id li kullanıcıyı düzenle")} title={"Düzenle"}></GridLink>
        <GridLink onClick={()=>console.log(data.id+"id li kullanıcıyı sil")} title={"Sil"}></GridLink>
      </div>
    ) 
  },
]

const Admins = () => {
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
              <CFormLabel className="mt-1 text-light">Adminler</CFormLabel>
              <CButton
                className="float-end bg-light text-dark"
                href={process.env.REACT_APP_BASE_URL + 'catalog/admins/add'}
              >
                <CIcon icon={cilUserPlus} className="mx-2" />
                Admin Ekle
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

export default Admins
