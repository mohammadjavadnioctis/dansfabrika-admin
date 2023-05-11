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
import { DeleteAdmin, GetAllAdmins } from 'src/api/catalog/Admins'
import { GridLinkDelete, GridLinkUpdate } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'

const gridStyle = { minHeight: 550, marginTop: 10 }

const title = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Ad' },
  { name: 'email', defaultFlex: 3, header: 'Email' },
  { name: 'password', defaultFlex: 3, header: 'Şifre' },
  { name: 'role', defaultFlex: 3, header: 'Role' },
  { name: 'status', defaultFlex: 3, header: 'Statü' },
  { name: 'actions', defaultFlex:3, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={process.env.REACT_APP_BASE_URL+'catalog/admins/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteAdmin(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]

const Admins = () => {
  
  const [admins, setAdmins] = useState([]);
  
  useEffect(() => {
    GetAllAdmins()
    .then((response) => {
      setAdmins(response.data)
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
              <CFormLabel className="mt-1 text-light">Adminler</CFormLabel>
              <CButton
                className="float-end bg-light text-dark"
                href={process.env.REACT_APP_BASE_URL + 'catalog/admins/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Admin Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              {admins.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={admins}
                  defaultLimit={10}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Admins
