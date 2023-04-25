export const dataSource = [
    {
      id: 1,
      courseId: '2022-12-06',
      day: '7',
      startTime: '2022-12-06',
      endTime: '2022-12-06',
      status: 'Aktif',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'courseId', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'courseId', defaultFlex: 2, header: 'Kurs' },
    { name: 'day', defaultFlex: 3, header: 'Gün' },
    { name: 'startTime', defaultFlex: 3, header: 'Başlangıç Tarihi' },
    { name: 'endTime', defaultFlex: 3, header: 'Bitiş Tarihi' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  