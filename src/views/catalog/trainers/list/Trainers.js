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
import { DeleteAdmin, GetAllAdmins } from 'src/api/catalog/AdminAPI'
import { DateFormat, GridLinkDelete, GridLinkUpdate, ImageFormatter, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { DeleteTrainer, GetAllTrainers } from 'src/api/catalog/TrainerAPI'
import { GetStatusName } from 'src/definitions/Enums/StatusEnums'

const defaultFilterValue = [
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'email', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', header: 'ID', defaultVisible: true },
  { name: 'name', header: 'Ad Soyad' },
  { name: 'birthday', header: 'Doğum Tarihi', render: ({ data }) => (
    <DateFormat date={data.birthday} />
  )},
  { name: 'email', header: 'Email' },
  { name: 'image', header: 'Resim', render: ({ data }) => (
    <ImageFormatter src={data.image}></ImageFormatter>
  )},
  {
    name: 'status', defaultFlex: 3, header: 'Durum', render: ({ data }) => (
      GetStatusName(data.status) 
    )
  },
  {
    name: 'actions', minWidth: 200, header: 'Aksiyon', render: ({ data }) => (
      <div>
        <GridLinkUpdate onClick={() => data.id} href={BASE_URL + 'catalog/trainers/update/' + data.id} title={"Güncelle"}></GridLinkUpdate>
        <GridLinkDelete onClick={() => DeleteTrainer(data.id)} title={"Sil"}></GridLinkDelete>
      </div>
    )
  },
]

const Trainers = () => {

  // Export Excel
  const exportHeader = ["id", "name", "birthday", "email", "phone", "image", "description", "status"]

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Eğitmenler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: trainers,
      },
    });
  }

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    GetAllTrainers()
      .then((response) => {
        setTrainers(response.data)
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
              <CFormLabel className="mt-1 text-light">Eğitmenler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/trainers/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Eğitmen Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>

              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {trainers.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={trainers}
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

export default Trainers
