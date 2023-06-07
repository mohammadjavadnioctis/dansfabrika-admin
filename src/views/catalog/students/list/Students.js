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
import React, { useCallback, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { cilPlus } from '@coreui/icons'
import { DateFormat, GridLinkDelete, GridLinkUpdate, ImageFormatter, gridStyle} from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteStudent, GetAllStudents, UpdateStudentPassword } from 'src/api/catalog/StudentAPI'
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
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'

const defaultFilterValue = [
  { name: 'email', operator: 'startsWith', type: 'string' },
]

const Students = () => {

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
      UpdateStudentPassword(body) 
  }

  const title = [
    { name: 'id', type: 'number', header: 'ID', defaultVisible: false },
    { name: 'name', header: 'Adı Soyadı' },
    { name: 'identity', header: 'T.C. No' },
    { name: 'email',  header: 'Email' },
    { name: 'phone', header: 'Telefon' },
    { name: 'image', header: 'Resim', render: ({ data }) => (
        <ImageFormatter src={data.image}></ImageFormatter>
    )},
    { name: 'country',  header: 'Ülke' },
    { name: 'gender', header: 'Cinsiyet' },
    { name: 'birthday', header: 'Doğum Tarihi', render: ({ data }) => (
      <DateFormat date={data.birthday}></DateFormat>
    )},
    { name: 'credit',  header: 'Kredi' },
    { name: 'score', header: 'Skor' },
    { name: 'reference', header: 'Referans' },
    { name: 'referanceId',header: 'Referans Id' },
    { name: 'code',  header: 'Kod' },
    {
      name: 'status', header: 'Durum', render: ({ data }) => (
        GetStatusName(data.status)
      )
    },
    { name: 'actions', minWidth: 375, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <CButton onClick={() => toggleShow(data.id)} style={{marginRight: 5}}>Şifre Güncelle</CButton>
        <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/students/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={()=>DeleteStudent(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )},
  ]


  const exportHeader = ["id", "name", "identity", "email", "phone", "image", "country", "gender", "birthday", "credit", "score", "referance", "referancedId", "code", "status"];
  const [students, setStudents] = useState([]);
  

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Öğrenciler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: students,
      },
    });
  }

  const loadData = async ({ skip, limit }) => {
    const params = {
      take: limit,
      page: skip / limit + 1
    };

    
    try {
      const response = await GetAllStudents(params);

      const studentData = response.data.data
      const totalCount = response.data.meta.itemCount;
      setStudents(studentData) // for excel
      return { data: studentData, count: parseInt(totalCount) };
    } catch (error) {
      console.log(error);
    }
  };


  const dataSource = useCallback(loadData, []);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark">
              <CFormLabel className="mt-1 text-light">Öğrenciler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/students/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Öğrenci Ekle'}></SpanDatatableHead>
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
                      <CFormInput onChange={e => setPassword(e.target.value)} id='password'  name='password' type='password' label="Yeni Şifre" required></CFormInput>
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

              <ReactDataGrid
                idProperty="id"
                style={gridStyle}
                columns={title}
                pagination
                defaultLimit={10}
                pageSizes={[10, 25, 50, 100, 1000000]}
                dataSource={dataSource}
                defaultFilterValue={defaultFilterValue}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Students
