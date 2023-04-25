export const dataSource = [
    {
      id: 1,
      name: 'Test',
      status: 'Aktif',
      createdDate: '2022-12-06',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'name', defaultFlex: 2, header: 'Ad' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'createdDate', defaultFlex: 3, header: 'Oluşturulma Tarihi' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  