import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CFormFeedback,
  CButton,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'
import { AddPackage } from 'src/api/catalog/PackageAPI'

const PackageAdd = () => {

  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [price, setPrice] = useState(null)
  const [credit, setCredit] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    name: name,
    description: description,
    price: parseFloat(price),
    credit: parseInt(credit)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddPackage(body)  // Ekleme fonksiyonu
    }
    event.preventDefault()
  }



  return (
    <CContainer>
      <CCard>
        < CCardHeader className="bg-dark">
          <span className='text-white'>Paket Ekle</span>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row needs-validation my-form"
            id='my-form'
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol sm="4">
                <CFormInput onChange={e => setName(e.target.value)} name='name' type="text" label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
              <CCol sm="4">
                <CFormInput onChange={e => setPrice(e.target.value)} name='price' type="number" label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormInput onChange={e => setCredit(e.target.value)} name='credit' type="number" label="Kredi" required />
                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CFormLabel>Açıklama</CFormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data="Lütfen mesajınızı giriniz."
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{ width: '100%' }}>
                  Kaydet
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default PackageAdd
