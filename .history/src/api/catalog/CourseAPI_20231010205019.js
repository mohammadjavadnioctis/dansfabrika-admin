import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import { ControlErrorMessage } from "src/definitions/Enums/ErrorEnums";


export async function GetAllCourses() {
    try {
        const data = await ApiManager('course/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteCourse(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('course/' + id, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (response.status = 200) {
                            GetBasicSwal('Başarılı!', 'İşlem başarıyla silindi', 'success')
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
                    })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export async function AddCourse(body,formData) {
    try {
        const data = ApiManager('course', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    console.log(response);
                    formData.append("id", response.data.id);
                    AddCourseImages(formData);
                 
                } 
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function AddCourseImages(formData) {
    try {
        const data = ApiManager('course', {
            method: 'PATCH',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Kurs başarıyla eklendi', 'success', 'catalog/courses/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message), 'error')
            })

    } catch (error) {
        console.log(error)
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function GetByIdCourse(id) {
    try {
        const data = await ApiManager('course/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateCourse(body) {
    try {
        const data = ApiManager('course', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Kurs başarıyla güncellendi', 'success', 'catalog/courses/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}