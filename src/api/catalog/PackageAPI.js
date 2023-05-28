import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";



export async function GetAllPackages() {
    try {
        const data = await ApiManager('package/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeletePackage(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('package/' + id, {
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

export async function AddPackage(body) {
    try {
        const data = ApiManager('package', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Admin başarıyla eklendi', 'success', 'catalog/packages/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function GetByIdPackage(id) {
    try {
        const data = await ApiManager('package/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdatePackage(body) {
    try {
        const data = ApiManager('package', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Admin başarıyla güncellendi', 'success', 'catalog/packages/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}