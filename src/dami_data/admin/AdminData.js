export const dataSource = [
  {
    id: 1,
    name: 'John McQueen',
    email: 'mackquin@hotmail.com',
    password: '123546',
    role: 'Admin',
    status: 'Aktif',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 2,
    name: 'Ali McQueen',
    email: 'mackquin@hotmail.com',
    password: '123546',
    role: 'Admin',
    status: 'Aktif',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 3,
    name: 'Esma McQueen',
    email: 'mackquin@hotmail.com',
    password: '123546',
    role: 'Admin',
    status: 'Aktif',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 4,
    name: 'Ahmet McQueen',
    email: 'mackquin@hotmail.com',
    password: '123546',
    role: 'Admin',
    status: 'Aktif',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
]

export const defaultFilterValue = [
  { name: 'name', operator: 'startsWith', type: 'string' },
  { name: 'email', operator: 'startsWith', type: 'string' },
]

export const columns = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'name', defaultFlex: 2, header: 'Ad' },
  { name: 'email', defaultFlex: 3, header: 'Email' },
  { name: 'password', defaultFlex: 3, header: 'Şifre' },
  { name: 'role', defaultFlex: 3, header: 'Role' },
  { name: 'status', defaultFlex: 3, header: 'Statü' },
  { name: 'created_date', defaultFlex: 3, header: 'Oluşturma Tarihi' },
  { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
]
