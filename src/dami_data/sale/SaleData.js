export const dataSource = [
    {
      id: 1,
      studentId: '1',
      credit: '1',
      price: '100',
      type: '1',
      date: '2022-12-06',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'studentId', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'studentId', defaultFlex: 2, header: 'Öğrenci' },
    { name: 'credit', defaultFlex: 3, header: 'Kredi' },
    { name: 'price', defaultFlex: 3, header: 'Fiyat' },
    { name: 'type', defaultFlex: 3, header: 'Tip' },
    { name: 'date', defaultFlex: 3, header: 'Tarih' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  