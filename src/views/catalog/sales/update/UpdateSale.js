import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { UpdateSale, GetByIdSale } from 'src/api/catalog/SaleAPI'
import { useParams } from 'react-router-dom'
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import { GetCourseTypeOptions } from 'src/definitions/Enums/CourseTypeEnums'
import Select from 'react-select';
import useStudentData from 'src/definitions/SelectData/Student';

const SaleUpdate = () => {

  const [studentId, setStudentId] = useState(null)
  const [credit, setCredit] = useState(null)
  const [price, setPrice] = useState(null)
  const [type, setType] = useState(null)
  const [sellBy, setSellBy] = useState(null)

  const { id } = useParams()

  const [validated, setValidated] = useState(false)

  const students = useStudentData();

  const body = {
    id: parseInt(id),
    studentId: studentId ? parseInt(studentId.value) : null,
    credit: parseInt(credit),
    price: parseFloat(price),
    type: parseInt(type),
    sellBy: sellBy
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    }
    else {
      setValidated(false)
      UpdateSale(body)
    }
    event.preventDefault()
  }

  useEffect(() => {
    GetByIdSale(id)
      .then(response => {
        setStudentId({ value: response.data.studentId, label: response.data.student.name })
        setCredit(response.data.credit)
        setPrice(response.data.price)
        setType(response.data.type)
        setSellBy(SetDateFormat(response.data.sellBy))
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CContainer>
      <CCard>
        <CCardHeader className="bg-dark">
          <span className='text-white'>Satış Güncelle</span>
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
                <label>Öğrenci Seçiniz:</label>
                <Select
                  className='mt-2'
                  required
                  value={(studentId != null) ? studentId : ""}
                  onChange={(selectedOption) => setStudentId(selectedOption)}
                  options={filteredStudents.map((student) => ({
                    value: student.id,
                    label: student.name,
                  }))}
                />
                {validated && studentId === null && (
                  <CFormFeedback style={{ color: "red" }}>Lütfen öğrenci seçiniz.</CFormFeedback>
                )}
              </CCol>

              <CCol sm="6">
                <CFormInput type="number" label="Kredi" onChange={e => setCredit(e.target.value)} value={(credit != null) ? credit : ""} name='credit' required />
                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="number" onChange={e => setPrice(e.target.value)} value={(price != null) ? price : ""} name='price' label="Fiyat" required />
                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
              </CCol>

              <CCol sm="6">
                <CFormSelect label="Tip:" onChange={e => setType(e.target.value)} value={(type != null) ? type : ""} name='type' required>
                  <option value={""} disabled>Seçiniz</option>
                  {GetCourseTypeOptions()}
                </CFormSelect>
                <CFormFeedback invalid>Lütfen tip seçiniz.</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol sm="6">
                <CFormInput type="date" onChange={e => setSellBy(e.target.value)} value={(sellBy != null) ? sellBy : ""} name='sell_by' label="Satış Tarihi" required />
                <CFormFeedback invalid>Lütfen tarih giriniz.</CFormFeedback>
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

export default SaleUpdate
