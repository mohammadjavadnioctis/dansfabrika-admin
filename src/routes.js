import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Admin
const Admins = React.lazy(() => import('./views/catalog/admins/list/Admins'))
const AddAdmin = React.lazy(() => import('./views/catalog/admins/add/AddAdmin'))

//Notification
const Notifications = React.lazy(() => import('./views/catalog/notifications/list/Notifications'))
const AddNotification = React.lazy(() =>
  import('./views/catalog/notifications/add/AddNotification'),
)

// Packages
const Packages = React.lazy(() => import('./views/catalog/packages/list/Packages'))
const AddPackage = React.lazy(() => import('./views/catalog/packages/add/AddPackage'))

// Calendars
const Calendars = React.lazy(() => import('./views/catalog/calendars/list/Calendars'))
const AddCalendar = React.lazy(() => import('./views/catalog/calendars/add/AddCalendar'))

// Sliders
const Sliders = React.lazy(() => import('./views/catalog/sliders/list/Sliders'))
const AddSlider = React.lazy(() => import('./views/catalog/sliders/add/AddSlider'))

// Dance Types
const DanceTypes = React.lazy(() => import('./views/catalog/danceTypes/list/DanceTypes'))
const AddDanceType = React.lazy(() => import('./views/catalog/danceTypes/add/AddDanceType'))

// Dance Levels
const DanceLevels = React.lazy(() => import('./views/catalog/danceLevels/list/DanceLevels'))
const AddDanceLevel = React.lazy(() => import('./views/catalog/danceLevels/add/AddDanceLevel'))

// Trainers
const Trainers = React.lazy(() => import('./views/catalog/trainers/list/Trainers'))
const AddTrainer = React.lazy(() => import('./views/catalog/trainers/add/AddTrainer'))

// Courses
const Courses = React.lazy(() => import('./views/catalog/courses/list/Courses'))
const AddCours = React.lazy(() => import('./views/catalog/courses/add/AddCourse'))

// Sales
const Sales = React.lazy(() => import('./views/catalog/sales/list/Sales'))
const AddSale = React.lazy(() => import('./views/catalog/sales/add/AddSale'))

// CourseStudents
const CourseStudents = React.lazy(() =>
  import('./views/catalog/courseStudents/list/CourseStudents'),
)
const AddCourseStudent = React.lazy(() =>
  import('./views/catalog/courseStudents/add/AddCourseStudent'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/catalog', name: 'Seçim', element: Admins, exact: true },
  { path: '/catalog/admins/list', name: 'Adminler', element: Admins },
  { path: '/catalog/admins/add', name: 'Admin Ekle', element: AddAdmin },
  { path: '/catalog/notifications/list', name: 'Bildirimler', element: Notifications },
  { path: '/catalog/notifications/add', name: 'Bildirim Ekle', element: AddNotification },
  { path: '/catalog/packages/list', name: 'Paketler', element: Packages },
  { path: '/catalog/packages/add', name: 'Paket Ekle', element: AddPackage },
  { path: '/catalog/calendars/list', name: 'Takvim', element: Calendars },
  { path: '/catalog/calendars/add', name: 'Takvim Ekle', element: AddCalendar },
  { path: '/catalog/sliders/list', name: 'Sliderlar', element: Sliders },
  { path: '/catalog/sliders/add', name: 'Slider Ekle', element: AddSlider },
  { path: '/catalog/danceTypes/list', name: 'Dans Tipleri', element: DanceTypes },
  { path: '/catalog/danceTypes/add', name: 'Dans Tipi Ekle', element: AddDanceType },
  { path: '/catalog/danceLevels/list', name: 'Dans Levelleri', element: DanceLevels },
  { path: '/catalog/danceLevels/add', name: 'Dans Leveli Ekle', element: AddDanceLevel },
  { path: '/catalog/trainers/list', name: 'Eğitmenler', element: Trainers },
  { path: '/catalog/trainers/add', name: 'Eğitmen Ekle', element: AddTrainer },
  { path: '/catalog/courses/list', name: 'Kurslar', element: Courses },
  { path: '/catalog/courses/add', name: 'Kurs Ekle', element: AddCours },
  { path: '/catalog/sales/list', name: 'Satışlar', element: Sales },
  { path: '/catalog/sales/add', name: 'Satış Ekle', element: AddSale },
  { path: '/catalog/courseStudents/list', name: 'Öğrenci Kursları', element: CourseStudents },
  { path: '/catalog/courseStudents/add', name: 'Öğrenci Kursu Ekle', element: AddCourseStudent },
]

export default routes
