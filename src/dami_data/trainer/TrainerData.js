export const dataSource = [
    {
      id: 1,
      name: 'Test',
      birthday: '2022-12-06',
      email: 'test@gmail.com',
      phone: '54300000',
      password: '1',
      image: '1',
      description: '1',
      status: 'Aktif',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'name', defaultFlex: 2, header: 'Ad' },
    { name: 'birthday', defaultFlex: 3, header: 'Doğum Tarihi' },
    { name: 'email', defaultFlex: 3, header: 'Email' },
    { name: 'phone', defaultFlex: 3, header: 'Telefon' },
    { name: 'password', defaultFlex: 3, header: 'Şifre' },
    { name: 'image', defaultFlex: 3, header: 'Resim' },
    { name: 'description', defaultFlex: 3, header: 'Açıklama' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  