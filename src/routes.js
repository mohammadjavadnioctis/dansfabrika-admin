import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

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

// Dans Tipleri
const DanceTypes = React.lazy(() => import('./views/catalog/danceTypes/list/DanceTypes'))
const AddDanceType = React.lazy(() => import('./views/catalog/danceTypes/add/AddDanceType'))

// Dans Levelleri
const DanceLevels = React.lazy(() => import('./views/catalog/danceLevels/list/DanceLevels'))
const AddDanceLevel = React.lazy(() => import('./views/catalog/danceLevels/add/AddDanceLevel'))

// Eğitmenler
const Trainers = React.lazy(() => import('./views/catalog/trainers/list/Trainers'))
const AddTrainer = React.lazy(() => import('./views/catalog/trainers/add/AddTrainer'))

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
]

export default routes
