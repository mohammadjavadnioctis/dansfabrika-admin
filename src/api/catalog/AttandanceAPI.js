import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import { ControlErrorMessage } from "src/definitions/Enums/Error-Enums";


export async function GetAllAttendances() {
    try {
        const data = await ApiManager('attendance/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteAttendance(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('attendance/' + id, {
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

export async function AddAttendance(body) {
    try {
        const data = ApiManager('attendance', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Yoklama başarıyla eklendi', 'success', 'catalog/attendances/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function GetByIdAttendance(id) {
    try {
        const data = await ApiManager('attendance/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateAttendance(body) {
    try {
        const data = ApiManager('attendance', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Yoklama başarıyla güncellendi', 'success', 'catalog/attendances/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}