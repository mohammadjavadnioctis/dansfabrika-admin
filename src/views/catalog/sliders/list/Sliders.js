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
import { GridLinkDelete, GridLinkUpdate, ImageFormatter, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel  } from "react-icons/fa";
import { DeleteSlider, GetAllSliders } from 'src/api/catalog/SliderAPI'
import { BASE_URL } from 'src/config/Config'


const defaultFilterValue = [
  { name: 'id', operator: 'startsWith', type: 'string' },
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'description', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'queue', defaultFlex: 2, header: 'Sıra' },
  { name: 'name', defaultFlex: 3, header: 'Ad' },
  { name: 'description', defaultFlex: 3, header: 'Açıklama' },
  { name: 'image', defaultFlex: 3, header: 'Resim', render: ({ data }) => (
    <ImageFormatter src={data.image}></ImageFormatter>
  )},
  { name: 'status', defaultFlex: 3, header: 'Statü' },
  { name: 'actions', defaultFlex:3, header: 'Aksiyon', render: ({ data }) => (
    <div>
      <GridLinkUpdate onClick={()=>data.id} href={BASE_URL+'catalog/sliders/update/'+data.id} title={"Güncelle"}></GridLinkUpdate>
      <GridLinkDelete onClick={()=>DeleteSlider(data.id)} title={"Sil"}></GridLinkDelete>
    </div>
  )},
]


const Sliders = () => {
  // Export Excel
  const exportHeader = ["id", "queue", "name", "description", "image", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Sliderlar",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: sliders,
      },
    });
  }

  const [sliders, setSliders] = useState([]);
  
  useEffect(() => {
    GetAllSliders()
    .then((response) => {
      setSliders(response.data)
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
              <CFormLabel className="mt-1 text-light">Sliderlar</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/sliders/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Slider Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>
              
              {sliders.length > 0 && (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={sliders}
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

export default Sliders
