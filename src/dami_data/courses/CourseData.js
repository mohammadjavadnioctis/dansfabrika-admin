export const dataSource = [
    {
      id: 1,
      danceTypeId: '1',
      danceLevelId: '1',
      capacity: '1',
      trainerId: '1',
      description: 'Açıklama',
      startDate: '2022-12-06',
      endDate: '2022-12-06',
      courseType: '1',
      onSale: '1',
      image: '1',
      price: '1',
      status: '1',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'danceTypeId', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'danceTypeId', defaultFlex: 2, header: 'Dans Tipi' },
    { name: 'danceLevelId', defaultFlex: 3, header: 'Dans Leveli' },
    { name: 'capacity', defaultFlex: 3, header: 'Kapasite' },
    { name: 'trainerId', defaultFlex: 3, header: 'Eğitmen' },
    { name: 'description', defaultFlex: 2, header: 'Açıklama' },
    { name: 'startDate', defaultFlex: 3, header: 'Başlangıç Tarihi' },
    { name: 'endDate', defaultFlex: 3, header: 'Bitiş Tarihi' },
    { name: 'courseType', defaultFlex: 3, header: 'Kurs Tipi' },
    { name: 'onSale', defaultFlex: 2, header: 'Satış Durumu' },
    { name: 'image', defaultFlex: 3, header: 'Resim' },
    { name: 'price', defaultFlex: 3, header: 'Fiyat' },
    { name: 'status', defaultFlex: 3, header: 'Statü' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  