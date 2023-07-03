import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { cilPlus } from '@coreui/icons'
import { GridLinkDelete, GridLinkUpdate, gridStyle } from 'src/definitions/GridLink'
import { IconDatatableHead, SpanDatatableHead } from 'src/definitions/DatatableHeader'
import { downloadExcel } from "react-export-table-to-excel"
import { FaFileExcel } from "react-icons/fa";
import { BASE_URL } from 'src/config/Config'
import { GetCourseNotifications, GetStudentNotifications } from 'src/api/catalog/NotificationAPI'
import useCourseData from 'src/definitions/SelectData/Course'
import useStudentData from 'src/definitions/SelectData/Student'
import Select from 'react-select';
import { GetNotificationStatusName, GetNotificationTypeName } from 'src/definitions/Enums/NotificationEnums'

const defaultFilterValue = [
  { name: 'type', operator: 'startsWith', type: 'string' },
  { name: 'title', operator: 'startsWith', type: 'string' },
  { name: 'message', operator: 'startsWith', type: 'string' },
  { name: 'status', operator: 'startsWith', type: 'string' },
]

const title = [
  { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
  {
    name: 'type', defaultFlex: 3, header: 'Tip', render: ({ data }) => (
      GetNotificationTypeName(data.status) 
    )
  },
  { name: 'title', defaultFlex: 3, header: 'Başlık' },
  { name: 'message', defaultFlex: 3, header: 'Mesaj' },
  {
    name: 'status', defaultFlex: 3, header: 'Durum', render: ({ data }) => (
      GetNotificationStatusName(data.status) 
    )
  },
]

const Notifications = () => {

  // Export Excel
  const exportHeader = ["id", "name", "email", "role", "status"];

  function HandleDownloadExcel() {
    downloadExcel({
      fileName: "Bildirimler",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: exportHeader,
        body: notifications,
      },
    });
  }

  const [notifications, setNotifications] = useState([]);

  const courses = useCourseData();
  const students = useStudentData();

  const [selectedType, setSelectedType] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.danceType.name + course.danceLevel.name + course.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption.value);
    setSelectedId('');
    setNotifications([]);
  };

  const handleSelectionChange = (selectedOption) => {
    setSelectedId({ value: selectedOption.value, label: selectedOption.label});
  
    if (selectedOption) {
      if (selectedType === 'course') {
        GetCourseNotifications(selectedOption.value)
          .then((response) => {
            setNotifications(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (selectedType === 'student') {
        GetStudentNotifications(selectedOption.value)
          .then((response) => {
            setNotifications(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  console.log(selectedId)

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark">
              <CFormLabel className="mt-1 text-light">Bildirimler</CFormLabel>

              <CButton
                className="float-end bg-light text-dark"
                href={BASE_URL + 'catalog/notifications/add'}
              >
                <IconDatatableHead icon={cilPlus}></IconDatatableHead>
                <SpanDatatableHead text={'Bildirim Ekle'}></SpanDatatableHead>
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <label htmlFor="typeSelect">Tip Seçiniz</label>
                  <Select
                    className='mt-2'
                    value={selectedType}
                    onChange={handleTypeChange}
                    options={[
                      { value: 'course', label: 'Kurs' },
                      { value: 'student', label: 'Öğrenci' },
                    ]}
                  />
                </CCol>

                <CCol sm="6">
                  {selectedType === 'course' && (
                    <div>
                      <label>Kurs Seçiniz:</label>
                      <Select
                        className='mt-2'
                        value={(selectedId != null) ? selectedId : ""}
                        onChange={handleSelectionChange}
                        options={filteredCourses.map((course) => ({
                          value: course.id,
                          label: course.danceType.name + ' ' + course.danceLevel.name + ' ' + course.trainer.name,
                        }))}
                      />
                    </div>
                  )}

                  {selectedType === 'student' && (
                    <div>
                      <label>Öğrenci Seçiniz:</label>
                      <Select
                        className='mt-2'
                        value={(selectedId != null) ? selectedId : ""}
                        onChange={handleSelectionChange}
                        options={filteredStudents.map((student) => ({
                          value: student.id,
                          label: student.name + ' ' + student.email,
                        }))}
                      />
                    </div>
                  )}
                </CCol>
              </CRow>
            </CCardBody>

            <CCardBody>
              <CButton className="float-middle bg-light text-dark" onClick={HandleDownloadExcel}>
                <FaFileExcel></FaFileExcel>
                <span>Export Excel</span>
              </CButton>

              {notifications.length > 0 ? (
                <ReactDataGrid
                  idProperty="id"
                  style={gridStyle}
                  columns={title}
                  pagination
                  dataSource={notifications}
                  defaultLimit={10}
                  defaultFilterValue={defaultFilterValue}
                />
              ) : (
                <h3 className='mt-3 text-danger text-center'>Veri Yok</h3>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Notifications
