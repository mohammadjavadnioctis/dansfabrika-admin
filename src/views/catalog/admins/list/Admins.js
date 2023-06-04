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
import { DeleteAdmin, GetAllAdmins, UpdateAdminPassword } from 'src/api/catalog/AdminAPI'
import { GridLinkDelete, GridLinkPasswordUpdate, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';


const defaultFilterValue = [
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'email', operator: 'startsWith', type: 'string' },
]

const Admins = () => {

  const [basicModal, setBasicModal] = useState(false);
  
  const toggleShow = (id) => {
    setIdValue(id)
    setBasicModal(!basicModal)
  }

  const [idValue, setIdValue] = useState(null);
  const [password, setPassword] = useState(null); 
  
  const body = {
    id: idValue,
    password: password
  }

  const handleSubmit = (event) => {
    UpdateAdminPassword(body) 
  }

  const title = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'name', defaultFlex: 2, header: 'Ad' },
    { name: 'email', defaultFlex: 3, header: 'Email' },
    { name: 'password', defaultFlex: 3, header: 'Şifre' },
    { name: 'role', defaultFlex: 3, header: 'Role' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    {
      name: 'actions', minWidth: 350, header: 'Aksiyon', render: ({ data }) => (
        <div>
          <CButton onClick={() => toggleShow(data.id)} style={{marginRight: 5}}>Şifre Güncelle</CButton>
          <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/admins/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
          <GridLinkDelete onClick={() => DeleteAdmin(data.id)} title={"Sil"}></GridLinkDelete>
        </div>
      )
    },
  ]
  
  // Export Excel
  const exportHeader = ["id", "name", "email", "role", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Adminler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: admins,
      },
    });
  }

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
                href={BASE_URL + 'catalog/admins/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Admin Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              {/* Modal başlangıcı */}
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Şifre Güncelle</MDBModalTitle>
                      <CButton className='btn-close' color='none' onClick={toggleShow}></CButton>
                    </MDBModalHeader>

                    <MDBModalBody>
                      <CFormInput onChange={e => setPassword(e.target.value)}  name='password' type='password' label="Yeni Şifre" required></CFormInput>
                    </MDBModalBody>

                    <MDBModalFooter>
                      <CButton color='secondary' onClick={toggleShow}>
                        Kapat
                      </CButton>
                      <CButton onClick={handleSubmit}>Kaydet</CButton>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {admins.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={admins}
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

export default Admins
