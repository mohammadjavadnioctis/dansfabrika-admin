import React, { useEffect, useState } from 'react'
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
  CFormLabel
} from '@coreui/react'
import { AddSliderImages, GetByIdSlider, UpdateSlider } from 'src/api/catalog/SliderAPI'
import { useParams } from 'react-router-dom';
import { ImageFormatterGeneral } from 'src/definitions/GridLink'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'

const SliderUpdate = () => {

  const [queue, setQueue] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [status, setStatus] = useState(null)

  const [image, setImage] = useState(null)
  const [chooseImage, setChooseImage] = useState(null) // only show person

  const { id } = useParams()

  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
    queue: parseInt(queue),
    name: name,
    description: description,
    status: parseInt(status)
  }

  const formData = new FormData()
  formData.append("id", id)
  formData.append("image", image)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setImage(file)

    reader.onload = (e) => {
      setChooseImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)

      UpdateSlider(body)


      if (image) {
        AddSliderImages(formData)
      }
    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdSlider(id)
      .then(response => {
        setQueue(response.data.queue)
        setName(response.data.name)
        setDescription(response.data.description)
        setStatus(response.data.status)
        setChooseImage(response.data.image)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Slider Güncelle</span>
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
                <CFormInput onChange={e => setQueue(e.target.value)} value={(queue != null) ? queue : ""} name='queue' type="number" label="Sıra" required />
                <CFormFeedback invalid>Sıra giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput onChange={e => setName(e.target.value)} value={(name != null) ? name : ""} name='name' type="text" label="İsim" required />
                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={handleImageChange} name='image' type="file" label="Resim" />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} required>
                  <option value={""} disabled>Seçiniz</option>
                  {GetStatusOptions()}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                {chooseImage && !image && (
                  <ImageFormatterGeneral src={chooseImage}></ImageFormatterGeneral>
                )}
                {chooseImage && image && (
                  <img src={chooseImage} alt="Seçilen Resim" width="150" height="150" />
                )}
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="12 mt-4">
                <CFormLabel>Açıklama</CFormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={(description != null) ? description : ""}
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                />
                <CFormFeedback invalid>Lütfen açıklama giriniz.</CFormFeedback>
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

export default SliderUpdate
