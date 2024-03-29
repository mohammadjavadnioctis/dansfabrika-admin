import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibSlickpic,
  cilBell,
  cilBook,
  cilCalendar,
  cilCalendarCheck,
  cilClipboard,
  cilDescription,
  cilFactorySlash,
  cilInbox,
  cilLevelUp,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Genel İşlemler',
  },
  {
    component: CNavItem,
    name: 'Admin',
    to: '/catalog/admins/list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bildirimler',
    to: '/catalog/notifications/list',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Paketler',
    to: '/catalog/packages/list',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Takvim',
    to: '/catalog/calendars/list',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Slider',
    to: '/catalog/sliders/list',
    icon: <CIcon icon={cibSlickpic} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dans Türleri',
    to: '/catalog/danceTypes/list',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dans Seviyeleri',
    to: '/catalog/danceLevels/list',
    icon: <CIcon icon={cilLevelUp} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Eğitmenler',
    to: '/catalog/trainers/list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kurslar',
    to: '/catalog/courses/list',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Satışlar',
    to: '/catalog/sales/list',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kurslara Kayıtlı Öğrenciler',
    to: '/catalog/courseStudents/list',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kurs Haftalık Günleri',
    to: '/catalog/lessons/list',
    icon: <CIcon icon={cilFactorySlash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Yoklama',
    to: '/catalog/attendances/list',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Öğrenciler',
    to: '/catalog/students/list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Gelir ve Giderler',
    to: '/catalog/bills/list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
