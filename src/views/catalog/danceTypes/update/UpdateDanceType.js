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
    CFormLabel,
} from '@coreui/react'
import { GetByIdDanceType, UpdateDanceType } from 'src/api/catalog/Dance-TypeAPI'
import { useParams } from 'react-router-dom'


const DanceTypeUpdate = () => {

    const [name, setName] = useState(null)
    const [status, setStatus] = useState(null)

    const {id} = useParams()

    const [validated, setValidated] = useState(false)

    const body = {
        id: parseInt(id),
        name: name,
        status: parseInt(status)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        }
        else {
            setValidated(false)
            UpdateDanceType(body)  // Ekleme fonksiyonu
        }
        event.preventDefault()
    }

    useEffect(() => {
        GetByIdDanceType(id)
            .then(response => {
                setName(response.data.name)
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
                    <span className='text-white'>Dans Tipi Güncelle</span>
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
                                <CFormInput onChange={e => setName(e.target.value)} value={(name != null) ? name : ""} name='name' type="text" label="Dans Tipi" required />
                                <CFormFeedback invalid>Lütfen dans tipi giriniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormSelect onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='status' label="Statü:">
                                    <option value={0}>Seçiniz</option>
                                    <option value={1}>Aktif</option>
                                    <option value={2}>Pasif</option>
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default DanceTypeUpdate
