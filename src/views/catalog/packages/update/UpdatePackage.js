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
    CFormLabel,
} from '@coreui/react'
import { GetByIdPackage, UpdatePackage } from 'src/api/catalog/PackageAPI'
import { useParams } from 'react-router-dom'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'

const PackageUpdate = () => {

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [credit, setCredit] = useState(null)
    const [status, setStatus] = useState(null)

    const {id} = useParams()

    const [validated, setValidated] = useState(false)

    const body = {
        id: parseInt(id),
        name: name,
        description: description,
        price: parseFloat(price),
        credit: parseInt(credit),
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
            UpdatePackage(body)  // Ekleme fonksiyonu
        }
        event.preventDefault()
    }

    useEffect(() => {
        GetByIdPackage(id)
            .then(response => {
                setName(response.data.name)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setCredit(response.data.credit)
                setStatus(response.data.status)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <CContainer>
            <CCard>
                < CCardHeader className="bg-dark">
                    <span className='text-white'>Paket Güncelle</span>
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
                                <CFormInput onChange={e => setName(e.target.value)} value={(name!=null) ? name : ""} name='name' type="text" label="İsim" required />
                                <CFormFeedback invalid>Lütfen isim giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormInput onChange={e => setPrice(e.target.value)} value={(price!=null) ? price : ""} name='price' type="number" label="Fiyat" required />
                                <CFormFeedback invalid>Lütfen fiyat giriniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol sm="6">
                                <CFormInput onChange={e => setCredit(e.target.value)} value={(credit!=null) ? credit : ""} name='credit' type="number" label="Kredi" required />
                                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""}>
                                    <option value={0}>Seçiniz</option>
                                    {GetStatusOptions()}
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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

export default PackageUpdate
