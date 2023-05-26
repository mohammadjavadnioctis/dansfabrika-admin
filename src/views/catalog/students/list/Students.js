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
import { cilPlus } from '@coreui/icons'
import { GridLinkDelete, GridLinkUpdate, ImageFormatter, gridStyle} from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteStudent, GetAllStudents } from 'src/api/catalog/StudentAPI'

const defaultFilterValue = [
  { name: 'email', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', header: 'ID', defaultVisible: true },
  { name: 'name', header: 'Ad' },
  { name: 'identity', header: 'Otomatik Artan' },
  { name: 'email',  header: 'Email' },
  { name: 'phone', header: 'Telefon' },
  { name: 'image', header: 'Resim', render: ({ data }) => (
      <ImageFormatter src={data.image}></ImageFormatter>
  )},
  { name: 'country',  header: 'Ülke' },
  { name: 'gender', header: 'Cinsiyet' },
  { name: 'birthday', header: 'Doğum Tarihi' },
  { name: 'credit',  header: 'Kredi' },
  { name: 'score', header: 'Skor' },
  { name: 'referance', header: 'Referans' },
  { name: 'referancedId',header: 'Referans Id' },
  { name: 'code',  header: 'Kod' },
  { name: 'status', header: 'Statü' },
  { name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/students/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteStudent(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]

const Students = () => {
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
