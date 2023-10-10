import React, { useState } from 'react'
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
  CFormLabel,
  CFormText,
} from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { AddCourse } from 'src/api/catalog/CourseAPI'
import { GetCourseTypeOptions } from 'src/definitions/Enums/CourseTypeEnums'
import useDanceTypeData from 'src/definitions/SelectData/DanceType'
import useDanceLevelData from 'src/definitions/SelectData/DanceLevel'
import useTrainerData from 'src/definitions/SelectData/Trainer'
import Select from 'react-select';
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'

const CourseAdd = () => {

  const [danceTypeId, setDanceTypeId] = useState(null)
  const [danceLevelId, setDanceLevelId] = useState(null)
  const [capacity, setCapacity] = useState(null)
  const [trainerId, setTrainerId] = useState(null)
  const [description, setDescription] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [courseType, setCourseType] = useState(null)
  const [onSale, setOnSale] = useState(null)
  const [price, setPrice] = useState(null)
  const [status, setStatus] = useState(null)

  const [image, setImage] = useState(null)
  const [chooseImage, setChooseImage] = useState(null)
  const [validated, setValidated] = useState(false)

  const danceTypes = useDanceTypeData();
  const danceLevels = useDanceLevelData();
  const trainers = useTrainerData();

  const body = {
    danceTypeId: danceTypeId ? parseInt(danceTypeId.value) : null,
    danceLevelId: danceLevelId ? parseInt(danceLevelId.value) : null,
    capacity: parseInt(capacity),
    trainerId: trainerId ? parseInt(trainerId.value) : null,
    description: description,
    startDate: startDate,
    endDate: endDate,
    courseType: parseInt(courseType),
    onSale: parseInt(onSale),
    price: parseFloat(price),
    status: parseInt(status)
  }

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
  const formData = new FormData()
   
  formData.append("image", image)

  const handleSubmit = (event) => {

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()

      setValidated(true)
    }
    else {
      setValidated(false)
      AddCourse(body,formData)
    }
    event.preventDefault()

  }
  

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDanceTypes = danceTypes.filter((danceType) =>
    danceType.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDanceLevels = danceLevels.filter((danceLevel) =>
    danceLevel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Kurs Ekle</span>
        </CCardHeader>

        <CCardBody>
          <CForm
            className="row needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol sm="6">
                <label htmlFor="danceTypeSelect">Dans Tipi Seçiniz:</label>
                <Select
                  className='mt-2'
                  name="dans_type_id"
                  required
                  value={danceTypeId}
                  onChange={(selectedOption) => setDanceTypeId(selectedOption)}
                  options={filteredDanceTypes.map((danceType) => ({
                    value: danceType.id,
                    label: danceType.name,
                  }))}
                />
                {validated && danceTypeId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen dans tipi seçiniz.</CFormFeedback>
                )}
              </CCol>

              <CCol sm="6">
                <label htmlFor="danceLevelSelect">Dans Seviyesi Seçiniz:</label>
                <Select
                  className='mt-2'
                  name="dance_level_id"
                  required
                  value={danceLevelId}
                  onChange={(selectedOption) => setDanceLevelId(selectedOption)}
                  options={filteredDanceLevels.map((danceLevel) => ({
                    value: danceLevel.id,
                    label: danceLevel.name,
                  }))}
                />
                {validated && danceLevelId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen dans leveli seçiniz.</CFormFeedback>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="number" onChange={e => setCapacity(e.target.value)} label="Kapasite" required />
                <CFormFeedback invalid>Lütfen kapasite giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <label htmlFor="danceLevelSelect">Eğitmen Seçiniz:</label>
                <Select
                  className='mt-2'
                  name="trainer_id"
                  required
                  value={trainerId}
                  onChange={(selectedOption) => setTrainerId(selectedOption)}
                  options={filteredTrainers.map((trainer) => ({
                    value: trainer.id,
                    label: trainer.name,
                  }))}
                />
                {validated && trainerId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen eğitmen seçiniz.</CFormFeedback>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" onChange={e => setStartDate(e.target.value)} label="Başlangıç Tarihi" required />
                <CFormFeedback invalid>Lütfen başlangıç tarihi giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormInput type="date" onChange={e => setEndDate(e.target.value)} label="Bitiş Tarihi" required />
                <CFormFeedback invalid>Lütfen bitiş tarihi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormSelect onChange={e => setCourseType(e.target.value)} label="Kurs Tipi" required>
                  <option value="">Seçiniz</option>
                  {GetCourseTypeOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen kurs tipi seçiniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect onChange={e => setOnSale(e.target.value)} label="Satış Durumu" required>
                  <option value="">Seçiniz</option>
                  <option value={1}>Satışa Açık</option>
                  <option value={-1}>Satışa Kapalı</option>
                </CFormSelect>
                <CFormFeedback invalid>Lütfen satış durumunu seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="4">
                <CFormInput id='fileInput' onChange={handleImageChange} name='image' type="file" label="Resim" />
                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
               
              </CCol>
             
              <CCol sm="4">
                <CFormInput type="number" onChange={e => setPrice(e.target.value)} label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="4">
                <CFormSelect onChange={e => setStatus(e.target.value)} label="Statü" required>
                  <option value="">Seçiniz</option>
                  {GetStatusOptions()} 
                </CFormSelect>
                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
              </CCol>

            </CRow>
            <CRow className="mt-4">
              <CCol sm="6">
                
              </CCol>

              <CCol sm="6">
              {chooseImage && (
                <img src={chooseImage} alt="Seçilen Resim" width="150" height="150" />
              )}
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

export default CourseAdd
