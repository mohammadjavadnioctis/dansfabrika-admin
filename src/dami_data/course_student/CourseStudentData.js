export const dataSource = [
    {
      id: 1,
      courseId: '1',
      studentId: '1',
      startDate: '1',
      endDate: '1',
      paidPrice: '1',
      date: '2022-10-16',
      status: '1',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'courseId', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'courseId', defaultFlex: 2, header: 'Kurs' },
    { name: 'studentId', defaultFlex: 3, header: 'Öğrenci' },
    { name: 'startDate', defaultFlex: 3, header: 'Başlangıç Tarihi' },
    { name: 'endDate', defaultFlex: 3, header: 'Bitiş Tarihi' },
    { name: 'paidPrice', defaultFlex: 3, header: 'Ödenen Fiyat' },
    { name: 'date', defaultFlex: 3, header: 'Tarih' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  