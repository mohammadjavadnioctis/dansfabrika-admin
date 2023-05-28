import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AdminLogin } from 'src/api/auth/LoginAPI'


// erenbas.info@gmail.com
// teteet

const Login = () => {

  const [username, setUsername] = useState("osman@gmail.com")

  const [password, setPassword] = useState("testtest")
  
  const [validated, setValidated] = useState(false)

  const body ={
    username:username,
    password:password
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true) 
    }
    else{
      AdminLogin(body)
      setValidated(false)
    }
    event.preventDefault()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // 10 saniye
  
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="row needs-validation my-form"
                    id='my-form'
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Giriş</h1>
                    <p className="text-medium-emphasis">
                      Kullanıcı adı ve şifrenizle giriş yapabilirsiniz..
                    </p>
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" value={"osman@gmail.com"} onChange={e => setUsername(e.target.value)} name='username' autoComplete="username" required />
                      <CFormFeedback invalid>Lütfen kullanıcı bilgilerinizi kontrol ediniz.</CFormFeedback>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={"testtest"}
                        onChange={e => setPassword(e.target.value)}
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                      <CFormFeedback invalid>Lütfen şifrenizi kontrol ediniz.</CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="dark"
                          className="px-4"
                          type="submit" 
                        >
                          Giriş Yap
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Şifremi unuttum?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-black py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center container d-flex align-items-center justify-content-center">
                  <CImage
                    className="bg-white"
                    src={require('../../../assets/images/dansfabrika_logo.jpg')}
                    height={50}
                  ></CImage>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
