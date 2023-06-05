import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Admin
const Admins = React.lazy(() => import('./views/catalog/admins/list/Admins'))
const AddAdmin = React.lazy(() => import('./views/catalog/admins/add/AddAdmin'))
const UpdateAdmin = React.lazy(() => import('./views/catalog/admins/update/UpdateAdmin'))

//Notification
const Notifications = React.lazy(() => import('./views/catalog/notifications/list/Notifications'))
const AddNotification = React.lazy(() =>
  import('./views/catalog/notifications/add/AddNotification'),
)

// Packages
const Packages = React.lazy(() => import('./views/catalog/packages/list/Packages'))
const AddPackage = React.lazy(() => import('./views/catalog/packages/add/AddPackage'))
const UpdatePackage = React.lazy(() => import('./views/catalog/packages/update/UpdatePackage'))

// Calendars
const Calendars = React.lazy(() => import('./views/catalog/calendars/list/Calendars'))
const AddCalendar = React.lazy(() => import('./views/catalog/calendars/add/AddCalendar'))
const UpdateCalendar = React.lazy(() => import('./views/catalog/calendars/update/UpdateCalendar'))

// Sliders
const Sliders = React.lazy(() => import('./views/catalog/sliders/list/Sliders'))
const AddSlider = React.lazy(() => import('./views/catalog/sliders/add/AddSlider'))
const UpdateSlider = React.lazy(() => import('./views/catalog/sliders/update/UpdateSlider'))

// Dance Types
const DanceTypes = React.lazy(() => import('./views/catalog/danceTypes/list/DanceTypes'))
const AddDanceType = React.lazy(() => import('./views/catalog/danceTypes/add/AddDanceType'))
const UpdateDanceType = React.lazy(() => import('./views/catalog/danceTypes/update/UpdateDanceType'))

// Dance Levels
const DanceLevels = React.lazy(() => import('./views/catalog/danceLevels/list/DanceLevels'))
const AddDanceLevel = React.lazy(() => import('./views/catalog/danceLevels/add/AddDanceLevel'))
const UpdateDanceLevel = React.lazy(() => import('./views/catalog/danceLevels/update/UpdateDanceLevel'))

// Trainers
const Trainers = React.lazy(() => import('./views/catalog/trainers/list/Trainers'))
const AddTrainer = React.lazy(() => import('./views/catalog/trainers/add/AddTrainer'))
const UpdateTrainer = React.lazy(() => import('./views/catalog/trainers/update/UpdateTrainer'))

// Courses
const Courses = React.lazy(() => import('./views/catalog/courses/list/Courses'))
const AddCours = React.lazy(() => import('./views/catalog/courses/add/AddCourse'))

// Sales
const Sales = React.lazy(() => import('./views/catalog/sales/list/Sales'))
const AddSale = React.lazy(() => import('./views/catalog/sales/add/AddSale'))
const UpdateSale = React.lazy(() => import('./views/catalog/sales/update/UpdateSale'))

// CourseStudents
const CourseStudents = React.lazy(() =>
  import('./views/catalog/courseStudents/list/CourseStudents'),
)
const AddCourseStudent = React.lazy(() =>
  import('./views/catalog/courseStudents/add/AddCourseStudent'),
)
const UpdateCourseStudent = React.lazy(() =>
  import('./views/catalog/courseStudents/update/UpdateCourseStudent'),
)

// Lessons
const Lessons = React.lazy(() => import('./views/catalog/lessons/list/Lessons'))
const AddLesson = React.lazy(() => import('./views/catalog/lessons/add/AddLesson'))
const UpdateLesson = React.lazy(() => import('./views/catalog/lessons/update/UpdateLesson'))

// Attendances
const Attendances = React.lazy(() => import('./views/catalog/attendances/list/Attendances'))
const AddAttendances = React.lazy(() => import('./views/catalog/attendances/add/AddAttendance'))

// Students
const Students = React.lazy(() => import('./views/catalog/students/list/Students'))
const AddStudents = React.lazy(() => import('./views/catalog/students/add/AddStudent'))
const UpdateStudent = React.lazy(() => import('./views/catalog/students/update/UpdateStudent'))

// Bills
const Bills = React.lazy(() => import('./views/catalog/bills/list/Bills'))
const AddBill = React.lazy(() => import('./views/catalog/bills/add/AddBill'))
const UpdateBill = React.lazy(() => import('./views/catalog/bills/update/UpdateBill'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/catalog', name: 'Seçim', element: Admins, exact: true },
  { path: '/catalog/admins/list', name: 'Adminler', element: Admins },
  { path: '/catalog/admins/add', name: 'Admin Ekle', element: AddAdmin },
  { path: '/catalog/admins/update/:id', name: 'Admin Güncelle', element: UpdateAdmin },
  { path: '/catalog/notifications/list', name: 'Bildirimler', element: Notifications },
  { path: '/catalog/notifications/add', name: 'Bildirim Ekle', element: AddNotification },
  { path: '/catalog/packages/list', name: 'Paketler', element: Packages },
  { path: '/catalog/packages/add', name: 'Paket Ekle', element: AddPackage },
  { path: '/catalog/packages/update/:id', name: 'Paket Güncelle', element: UpdatePackage },
  { path: '/catalog/calendars/list', name: 'Takvim', element: Calendars },
  { path: '/catalog/calendars/add', name: 'Takvim Ekle', element: AddCalendar },
  { path: '/catalog/calendars/update/:id', name: 'Takvim Güncelle', element: UpdateCalendar },
  { path: '/catalog/sliders/list', name: 'Sliderlar', element: Sliders },
  { path: '/catalog/sliders/add', name: 'Slider Ekle', element: AddSlider },
  { path: '/catalog/sliders/update/:id', name: 'Slider Güncelle', element: UpdateSlider },
  { path: '/catalog/danceTypes/list', name: 'Dans Tipleri', element: DanceTypes },
  { path: '/catalog/danceTypes/add', name: 'Dans Tipi Ekle', element: AddDanceType },
  { path: '/catalog/danceTypes/update/:id', name: 'Dans Tipi Güncelle', element: UpdateDanceType },
  { path: '/catalog/danceLevels/list', name: 'Dans Levelleri', element: DanceLevels },
  { path: '/catalog/danceLevels/add', name: 'Dans Leveli Ekle', element: AddDanceLevel },
  { path: '/catalog/danceLevels/update/:id', name: 'Dans Leveli Güncelle', element: UpdateDanceLevel },
  { path: '/catalog/trainers/list', name: 'Eğitmenler', element: Trainers },
  { path: '/catalog/trainers/add', name: 'Eğitmen Ekle', element: AddTrainer },
  { path: '/catalog/trainers/update/:id', name: 'Eğitmen Güncelle', element: UpdateTrainer },
  { path: '/catalog/courses/list', name: 'Kurslar', element: Courses },
  { path: '/catalog/courses/add', name: 'Kurs Ekle', element: AddCours },
  { path: '/catalog/sales/list', name: 'Satışlar', element: Sales },
  { path: '/catalog/sales/add', name: 'Satış Ekle', element: AddSale },
  { path: '/catalog/sales/update/:id', name: 'Satış Güncelle', element: UpdateSale },
  { path: '/catalog/courseStudents/list', name: 'Öğrenci Kursları', element: CourseStudents },
  { path: '/catalog/courseStudents/add', name: 'Öğrenci Kursu Ekle', element: AddCourseStudent },
  { path: '/catalog/courseStudents/update/:id', name: 'Öğrenci Kursu Güncelle', element: UpdateCourseStudent },
  { path: '/catalog/lessons/list', name: 'Dersler', element: Lessons },
  { path: '/catalog/lessons/add', name: 'Ders Ekle', element: AddLesson },
  { path: '/catalog/lessons/update/:id', name: 'Ders Güncelle', element: UpdateLesson },
  { path: '/catalog/attendances/list', name: 'Yoklama', element: Attendances },
  { path: '/catalog/attendances/add', name: 'Yoklama Ekle', element: AddAttendances },
  { path: '/catalog/students/list', name: 'Öğrenciler', element: Students },
  { path: '/catalog/students/add', name: 'Öğrenci Ekle', element: AddStudents },
  { path: '/catalog/students/update/:id', name: 'Öğrenci Güncelle', element: UpdateStudent },
  { path: '/catalog/bills/list', name: 'Gelir ve Giderler', element: Bills },
  { path: '/catalog/bills/add', name: 'Gelir ve Gider Ekle', element: AddBill },
  { path: '/catalog/bills/update/:id', name: 'Gelir ve Gider Güncelle', element: UpdateBill },
]

export default routes
