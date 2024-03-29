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
import { ImageFormatterGeneral } from 'src/definitions/GridLink'
import { SetDateFormat } from 'src/definitions/DateFormat/GetDateFormat'
import { GetStatusOptions } from 'src/definitions/Enums/StatusEnums'
import { GetGenderOptions } from 'src/definitions/Enums/GenderEnums'


const StudentUpdate = () => {

    const [name, setName] = useState(null)
    const [identity, setIdentity] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [gender, setGender] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [credit, setCredit] = useState(null)
    const [score, setScore] = useState(null)
    const [status, setStatus] = useState(null)
    const [country, setCountry] = useState(null)

    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [chooseImage, setChooseImage] = useState(null) // only show person

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
        status: parseInt(status),
        country: country,
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
                setBirthday(SetDateFormat(response.data.birthday))
                setCredit(response.data.credit)
                setScore(response.data.score)
                setChooseImage(response.data.image)
                setStatus(response.data.status)
                setCountry(response.data.country)
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
                                <CFormSelect onChange={e => setGender(e.target.value)} name='gender' label="Cinsiyet:"  value={(gender != null) ? gender : ""} required>
                                    <option value={""} disabled>Seçiniz</option>
                                    {GetGenderOptions()}
                                </CFormSelect>
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
                                <CFormInput onChange={handleImageChange} name='image' type="file" label="Resim" />
                                <CFormFeedback invalid>Lütfen resim giriniz.</CFormFeedback>
                            </CCol>
                            <CCol sm="6">
                                <CFormSelect label="Statü:" onChange={e => setStatus(e.target.value)} value={(status != null) ? status : ""} name='status'>
                                    <option value={""}>Seçiniz</option>
                                    {GetStatusOptions()}
                                </CFormSelect>
                                <CFormFeedback invalid>Lütfen statü seçiniz.</CFormFeedback>
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
