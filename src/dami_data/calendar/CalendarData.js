export const dataSource = [
    {
      id: 1,
      queue: '1',
      name: 'Test',
      image: 'test',
      status: 'Aktif',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'queue', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'queue', defaultFlex: 2, header: 'Sıra' },
    { name: 'name', defaultFlex: 3, header: 'Ad' },
    { name: 'image', defaultFlex: 3, header: 'Resim' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  