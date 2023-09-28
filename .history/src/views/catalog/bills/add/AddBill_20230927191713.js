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
    CFormTextarea,
    CFormLabel,
} from '@coreui/react'
import { AddBill } from 'src/api/catalog/BillsAPI'
import { GetProcessTypeOptions } from 'src/definitions/Enums/ProcessTypeEnum'
import { GetProcessOptions } from 'src/definitions/Enums/ProcessEnum'
const BillAdd = () => {

    const [processType, setProccessType] = useState(null)
    const [process, setProccess] = useState(null)
    const [description, setDescription] = useState(null)
    const [processDate, setProccessDate] = useState(null)
    const [price, setPrice] = useState(null)

    const [validated, setValidated] = useState(false)

    const body = {
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
            AddBill(body)  // Ekleme fonksiyonu
        }
        event.preventDefault()
    }



    return (
        <CContainer>
            <CCard>
                <CCardHeader className="bg-dark">
                    <span className='text-white'>Gelir veya Gider Ekle</span>
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
                                <CFormSelect onChange={e => setProccessType(e.target.value)}  label="İşlem Tipi:" required>
                  <option value="">Seçiniz</option>
                  {GetProcessTypeOptions()} 
                </CFormSelect>
                                <CFormFeedback invalid>Lütfen işlem tipi seçiniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                            <CFormSelect onChange={e => setProccessType(e.target.value)}  label="İşlem:" required>
                  <option value="">Seçiniz</option>
                  {GetProcessOptions()} 
                </CFormSelect>
                                <CFormFeedback invalid>Lütfen işlem seçiniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol sm="6">
                                <CFormInput onChange={e => setProccessDate(e.target.value)} type='date' name='proccess_date' label='İşlem Tarihi' required></CFormInput>
                                <CFormFeedback invalid>Lütfen Tarih seçiniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormInput onChange={e => setPrice(e.target.value)} type='number' name='price' label='Fiyat' required></CFormInput>
                                <CFormFeedback invalid>Lütfen rol seçiniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol sm="12">
                                <CFormTextarea onChange={e => setDescription(e.target.value)} name='description' label='Açıklama' rows='5' required></CFormTextarea>
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

export default BillAdd
