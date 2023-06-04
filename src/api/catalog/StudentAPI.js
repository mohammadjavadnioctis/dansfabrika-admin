import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import axios from "axios";

export async function GetAllStudents(params) {
    try {
        const data = await ApiManager('http://api.dansfabrika.com/v1/student', {
            method: 'GET',
            params: params
        })
        return data

    } catch (error) {
        console.log(error)
    }
}

export async function DeleteStudent(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('student/' + id, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (response.status = 200) {
                            GetBasicSwal('Başarılı!', 'İşlem başarıyla silindi', 'success')
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Başarısız!', error.response.data.message[0], 'error')
                    })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export async function AddStudent(body,formData) {
    try {
        const data = ApiManager('student', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    formData.append("id", response.data.id)
                    AddStudentImages(formData)
                }   
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}


export async function AddStudentImages(formData) {
    try {
        const data = ApiManager('student', {
            method: 'PATCH',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Resim başarıyla eklendi.', 'success', 'catalog/students/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message, 'error')
            })

    } catch (error) {
        console.log(error)
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}


export async function GetByIdStudent(id) {
    try {
        const data = await ApiManager('student/' + id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateStudent(body) {
    try {
        const data = ApiManager('student', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Öğrenci başarıyla güncellendi', 'success', 'catalog/students/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function UpdateStudentPassword(body) {
    try {
        const data = ApiManager('student/password', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Şifre başarıyla güncellendi', 'success', 'catalog/students/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}