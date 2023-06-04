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
  CRow,
  CFormFeedback,
  CButton,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'
import { AddSlider } from 'src/api/catalog/SliderAPI'

const SliderAdd = () => {

  const [queue, setQueue] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)

  const [image, setImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    queue: parseInt(queue),
    name: name,
    description: description,
  }

  const formData = new FormData()
   
  formData.append("image", image)

  const handleSubmit =(event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      AddSlider(body,formData)
    }
    event.preventDefault()

  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Slider Ekle</span>
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
              <CCol sm="6">
                <CFormInput onChange={e => setQueue(e.target.value)} name='queue' type="number" label="Sıra" required />
                <CFormFeedback invalid>Sıra giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput onChange={e => setName(e.target.value)} name='name' type="text" label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.files[0])} name='image' type="file" label="Resim" required />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>

              </CCol>
            </CRow>

            <CRow>
              <CCol sm="12 mt-4">
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
                <CFormFeedback invalid>Lütfen açıklama giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
                <CButton color="primary" type="submit" className="float-end mt-3" style={{width:'100%'}}>
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

export default SliderAdd
