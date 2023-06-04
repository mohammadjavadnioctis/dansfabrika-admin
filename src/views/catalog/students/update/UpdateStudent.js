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
import { UpdateStudent, GetByIdStudent, AddStudentImages } from 'src/api/catalog/StudentAPI'
import { useParams } from 'react-router-dom'

const StudentUpdate = () => {

    const [name, setName] = useState(null)
    const [identity, setIdentity] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [gender, setGender] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [credit, setCredit] = useState(null)
    const [score, setScore] = useState(null)
    const [reference, setReference] = useState(null)
    const [reference_id, setReferenceId] = useState(null)
    const [status, setStatus] = useState(null)

    const { id } = useParams()
    const [image, setImage] = useState(null)

    const [validated, setValidated] = useState(false)

    const body = {
        id: parseInt(id),
        name: name,
        identity: identity,
        email: email,
        phone: phone,
        gender: parseInt(gender),
        birthday: birthday,
        credit: parseInt(credit),
        score: parseInt(score),
        reference: reference,
        reference_id: reference_id,
        status: status
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

            UpdateStudent(body)

            if (image) {
                AddStudentImages(formData)
            }

        }
        event.preventDefault()
    }

    useEffect(() => {
        GetByIdStudent(id)
            .then(response => {
                setName(response.data.name)
                setIdentity(response.data.identity)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setGender(response.data.gender)
                setBirthday(response.data.birthday)
                setCredit(response.data.credit)
                setScore(response.data.score)
                setReference(response.data.reference)
                setReferenceId(response.data.reference_id)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <CContainer>
            <CCard>
                <CCardHeader className="bg-dark">
                    <span className='text-white'>Öğrenci Güncelle</span>
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
                                <CFormInput type="text" onChange={e => setName(e.target.value)} value={(name != null) ? name : ""} name='name' label="İsim Ve Soyisim" required />
                                <CFormFeedback invalid>Lütfen isim ve soyisim giriniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormInput type="number" onChange={e => setIdentity(e.target.value)} value={(identity != null) ? identity : ""} name='identity' label="T.C. No: " required />
                                <CFormFeedback invalid>Lütfen tc giriniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4">
                            <CCol sm="6">
                                <CFormInput type="email" onChange={e => setEmail(e.target.value)} value={(email != null) ? email : ""} name='email' label="Email" required />
                                <CFormFeedback invalid>Lütfen email giriniz.</CFormFeedback>
                            </CCol>

                            <CCol sm="6">
                                <CFormInput type="number" onChange={e => setPhone(e.target.value)} value={(phone != null) ? phone : ""} name='phone' label="Telefon" required />
                                <CFormFeedback invalid>Lütfen telefon giriniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4">

                            <CCol sm="6">
                                <CFormInput type="text" onChange={e => setGender(e.target.value)} value={(gender != null) ? gender : ""} name='gender' label="Gender" required />
                                <CFormFeedback invalid>Lütfen gender giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormInput type="date" onChange={e => setBirthday(e.target.value)} value={(birthday != null) ? birthday : ""} name='birthday' label="Doğum Tarihi" required />
                                <CFormFeedback invalid>Lütfen doğum tarihinizi giriniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4">


                            <CCol sm="6">
                                <CFormInput type="text" onChange={e => setCredit(e.target.value)} value={(credit != null) ? credit : ""} name='credit' label="Kredi" required />
                                <CFormFeedback invalid>Lütfen kredi giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormInput type="text" onChange={e => setScore(e.target.value)} value={(score != null) ? score : ""} name='score' label="Skor" required />
                                <CFormFeedback invalid>Lütfen skor giriniz.</CFormFeedback>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4">


                            <CCol sm="6">
                                <CFormInput type="text" onChange={e => setReference(e.target.value)} value={(reference != null) ? reference : ""} name='reference' label="Referans" required />
                                <CFormFeedback invalid>Lütfen referans giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormSelect label="Referans Id Seçiniz:" onChange={e => setReferenceId(e.target.value)} value={(reference_id != null) ? reference_id : ""} name='reference_id'>
                                    <option value={0}>Seçiniz</option>
                                    <option value={1}>Aktif</option>
                                    <option value={-1}>Pasif</option>
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen referans seçiniz.</CFormFeedback>
                            </CCol>

                        </CRow>

                        <CRow className="mt-4">


                            <CCol sm="6">
                                <CFormInput onChange={e => setImage(e.target.files[0])} name='image' type="file" label="Resim" />
                                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='reference_id'>
                                    <option value={0}>Seçiniz</option>
                                    <option value={1}>Aktif</option>
                                    <option value={-1}>Pasif</option>
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

export default StudentUpdate
