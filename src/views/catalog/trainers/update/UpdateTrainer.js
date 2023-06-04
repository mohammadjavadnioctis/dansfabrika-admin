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
import { AddTrainer, AddTrainerImages, GetByIdTrainer, UpdateTrainer } from 'src/api/catalog/TrainerAPI'
import { useParams } from 'react-router-dom'


const TrainerUpdate = () => {

  const [name, setName] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [description, setDescription] = useState(null)
  const [status, setStatus] = useState(null)

  const { id } = useParams()
  const [image, setImage] = useState(null)

  const [validated, setValidated] = useState(false)

  const body = {
    id: parseInt(id),
    name: name,
    email: email,
    phone: phone,
    birthday: birthday,
    description: description,
    status: status,
  }

  const formData = new FormData()
  formData.append("id", id)
  formData.append("image", image)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)

      UpdateTrainer(body)

      if (image) {
        AddTrainerImages(formData)
      }

    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdTrainer(id)
      .then(response => {
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setBirthday(response.data.birthday)
        setDescription(response.data.description)
        setStatus(response.data.status)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Eğitmen Güncelle</span>
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
                <CFormInput onChange={e => setName(e.target.value)} value={(name != null) ? name : ""} name='name' type="text" label="İsim Ve Soyisim" required />
                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput onChange={e => setBirthday(e.target.value)} value={(birthday != null) ? birthday : ""} name='birthday' type="date" label="Doğum Tarihi" required />
                <CFormFeedback invalid>Lütfen doğum tarihini giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput onChange={e => setEmail(e.target.value)} value={(email != null) ? email : ""} name='email' type="email" label="Email" required />
                <CFormFeedback invalid>Lütfen emailinizi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput onChange={e => setPhone(e.target.value)} value={(phone != null) ? phone : ""} name='phone' type="phone" label="Telefon Numarası" required />
                <CFormFeedback invalid>Lütfen telefon numarasını giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4"><CCol sm="6">
              <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='reference_id'>
                <option value={0}>Seçiniz</option>
                <option value={1}>Aktif</option>
                <option value={-1}>Pasif</option>
              </CFormSelect>
              <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
            </CCol>

              <CCol sm="6">
                <CFormInput id='fileInput' onChange={e => setImage(e.target.files[0])} name='image' type="file" label="Resim" />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="12">
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

export default TrainerUpdate
