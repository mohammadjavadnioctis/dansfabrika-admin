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
    CFormTextarea,
} from '@coreui/react'
import { GetByIdBill, UpdateBill } from 'src/api/catalog/BillsAPI'
import { useParams } from 'react-router-dom'
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import { GetProcessTypeOptions } from 'src/definitions/Enums/ProcessTypeEnum'
import { GetProcessOptions } from 'src/definitions/Enums/ProcessEnum'
const BillUpdate = () => {

    const [processType, setProccessType] = useState(null)
    const [process, setProccess] = useState(null)
    const [description, setDescription] = useState(null)
    const [processDate, setProccessDate] = useState(null)
    const [price, setPrice] = useState(null)

    const {id} = useParams()

    const [validated, setValidated] = useState(false)

    const body = {
        id: parseInt(id),
        processType: parseInt(processType),
        process: parseInt(process),
        description: description,
        processDate: processDate,
        price: parseFloat(price)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        }
        else {
            setValidated(false)
            UpdateBill(body)  // Ekleme fonksiyonu
        }
        event.preventDefault()
    }

    useEffect(() => {
        GetByIdBill(id)
            .then(response => {
                setProccessType(response.data.processType)
                setProccess(response.data.process)
                setProccessDate(SetDateFormat(response.data.processDate))
                setPrice(response.data.price)
                setDescription(response.data.description)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <CContainer>
            <CCard>
                <CCardHeader className="bg-dark">
                    <span className='text-white'>Gelir veya Gider Güncelle</span>
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
                            <CFormSelect onChange={e => setProccessType(e.target.value)}  value={(processType != null) ? processType : ""}  label="İşlem Tipi:" required>
                  <option value="">Seçiniz</option>
                  {GetProcessTypeOptions()} 
                </CFormSelect>
                                <CFormFeedback invalid>Lütfen işlem tipi seçiniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                            <CFormSelect onChange={e => setProccess(e.target.value)} value={(proccess != null) ? proccess : ""}  label="İşlem:" required>
                  <option value="">Seçiniz</option>
                  {GetProcessOptions()} 
                </CFormSelect>
                                <CFormFeedback invalid>Lütfen işlem seçiniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol sm="6">
                                <CFormInput onChange={e => setProccessDate(e.target.value)} value={(processDate!=null) ? processDate : ""} type='date' name='proccess_date' label='İşlem Tarihi' required></CFormInput>
                                <CFormFeedback invalid>Lütfen Tarih seçiniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormInput onChange={e => setPrice(e.target.value)} value={(price!=null) ? price : ""} type='number' name='price' label='Fiyat' required></CFormInput>
                                <CFormFeedback invalid>Lütfen rol seçiniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol sm="12">
                                <CFormTextarea onChange={e => setDescription(e.target.value)} value={(description!=null) ? description : ""} name='description' label='Açıklama' rows='5' required></CFormTextarea>
                                <CFormFeedback invalid>Lütfen Açıklama Giriniz.</CFormFeedback>
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

export default BillUpdate
