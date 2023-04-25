export const dataSource = [
    {
      id: 1,
      name: 'Test',
      description: 'lorem ipsum dolar sit amet',
      price: '1',
      credit: '1',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'name', defaultFlex: 2, header: 'Ad' },
    { name: 'description', defaultFlex: 3, header: 'Açıklama' },
    { name: 'price', defaultFlex: 3, header: 'Fiyat' },
    { name: 'credit', defaultFlex: 3, header: 'Kredi' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  