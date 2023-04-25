export const dataSource = [
    {
      id: 1,
      name: 'Test',
      identity: '1',
      email: '1',
      phone: '1',
      password: '1',
      image: '1',
      country: '1',
      gender: '1',
      birthday: '1',
      credit: '1',
      score: '1',
      referance: '1',
      referancedId: '1',
      code: '1',
      status: '1',
      createdDate: '2022-12-06',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'email', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'name', defaultFlex: 2, header: 'Ad' },
    { name: 'identity', defaultFlex: 3, header: 'Otomatik Artan' },
    { name: 'email', defaultFlex: 3, header: 'Email' },
    { name: 'phone', defaultFlex: 3, header: 'Telefon' },
    { name: 'password', defaultFlex: 3, header: 'Şifre' },
    { name: 'image', defaultFlex: 3, header: 'Resim' },
    { name: 'country', defaultFlex: 3, header: 'Ülke' },
    { name: 'gender', defaultFlex: 3, header: 'Cinsiyet' },
    { name: 'birthday', defaultFlex: 3, header: 'Doğum Tarihi' },
    { name: 'credit', defaultFlex: 3, header: 'Kredi' },
    { name: 'score', defaultFlex: 3, header: 'Skor' },
    { name: 'referance', defaultFlex: 3, header: 'Referans' },
    { name: 'referancedId', defaultFlex: 3, header: 'Referans Id' },
    { name: 'code', defaultFlex: 3, header: 'Kod' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'createdDate', defaultFlex: 3, header: 'Oluşturulma Tarihi' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  