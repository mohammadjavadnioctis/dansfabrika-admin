export const dataSource = [
    {
      id: 1,
      date: '2022-12-06',
      courseId: '1',
      lessonId: '1',
      studentId: '1',
      action: 'Edit Delete',
    },
  ]
  
  export const defaultFilterValue = [
    { name: 'date', operator: 'startsWith', type: 'string' },
  ]
  
  export const columns = [
    { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    { name: 'date', defaultFlex: 2, header: 'Tarih' },
    { name: 'courseId', defaultFlex: 3, header: 'Kurs' },
    { name: 'lessonId', defaultFlex: 3, header: 'Ders' },
    { name: 'studentId', defaultFlex: 3, header: 'Öğrenci' },
    { name: 'action', defaultFlex: 3, header: 'Aksiyon' },
  ]
  