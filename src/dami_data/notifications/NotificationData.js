export const dataSource = [
  {
    id: 1,
    notification_type: 'John McQueen',
    to: 'mackquin@hotmail.com',
    message: '123546',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 2,
    notification_type: 'John McQueen',
    to: 'mackquin@hotmail.com',
    message: '123546',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 3,
    notification_type: 'John McQueen',
    to: 'mackquin@hotmail.com',
    message: '123546',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
  {
    id: 4,
    notification_type: 'John McQueen',
    to: 'mackquin@hotmail.com',
    message: '123546',
    created_date: '2022-12-06',
    action: 'Edit Delete',
  },
]

export const defaultFilterValue = [
  { name: 'notification_type', operator: 'startsWith', type: 'string' },
  { name: 'to', operator: 'startsWith', type: 'string' },
]

export const columns = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  { name: 'notification_type', defaultFlex: 3, header: 'Bildirim Tipi' },
  { name: 'to', defaultFlex: 3, header: 'Kime' },
  { name: 'message', defaultFlex: 3, header: 'Mesaj' },
  { name: 'created_date', defaultFlex: 3, header: 'Gönderim Tarihi' },
  { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
]
