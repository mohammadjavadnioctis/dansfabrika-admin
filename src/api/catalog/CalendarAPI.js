import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";


export async function GetAllCalendars() {
    try {
        const data = await ApiManager('calendar/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteCalendar(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('calendar/' + id, {
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

export async function AddCalendar(body,formData) {
    try {
        const data = ApiManager('calendar', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    formData.append("id", response.data.id)
                    AddCalendarImages(formData)
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function AddCalendarImages(formData) {
    try {
        const data = ApiManager('calendar', {
            method: 'PATCH',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Resim başarıyla eklendi.', 'success', 'catalog/calendars/list')
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

export async function GetByIdCalendar(id) {
    try {
        const data = await ApiManager('calendar/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateCalendar(body) {
    try {
        const data = ApiManager('calendar', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Takvim başarıyla güncellendi', 'success', 'catalog/calendars/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}