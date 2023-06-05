import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";



export async function GetAllDanceTypes() {
    try {
        const data = await ApiManager('dance-type/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteDanceType(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('dance-type/' + id, {
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

export async function AddDanceType(body) {
    try {
        const data = ApiManager('dance-type', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Dans Tipi başarıyla eklendi', 'success', 'catalog/danceTypes/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function GetByIdDanceType(id) {
    try {
        const data = await ApiManager('dance-type/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateDanceType(body) {
    try {
        const data = ApiManager('dance-type', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Dans Tipi başarıyla güncellendi', 'success', 'catalog/danceTypes/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}