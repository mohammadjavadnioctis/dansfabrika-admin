import React from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import jwtDecode from 'jwt-decode'
import { cookies } from 'src/definitions/Cookies/NewCookies'


const AppHeaderDropdown = () => {

  const token = cookies.get('jwt')

  const decodeToken = token ? jwtDecode(token) : null 

  const handleDeleteCookie = () => {
      cookies.remove('jwt')
      window.location.reload();
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {decodeToken && (
          <div style={{float:"left", marginRight:"15px", marginTop:"5px"}}>
            {decodeToken.name}
          </div>
        )}
        <CAvatar src={require('src/assets/images/user_icon.png')} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Hesabım</CDropdownHeader>
        <CDropdownItem href='#' onClick={handleDeleteCookie}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Çıkış Yap
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
