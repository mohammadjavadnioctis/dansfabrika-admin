import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";



export async function GetAllTrainers() {
    try {
        const data = await ApiManager('trainer/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteTrainer(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('trainer/' + id, {
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

export async function AddTrainer(body,formData) {
    try {
        const data = ApiManager('trainer', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    formData.append("id", response.data.id)
                    AddTrainerImages(formData)
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function AddTrainerImages(formData) {
    try {
        const data = ApiManager('trainer', {
            method: 'PATCH',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Resim başarıyla eklendi.', 'success', 'catalog/trainers/list')
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

export async function GetByIdTrainer(id) {
    try {
        const data = await ApiManager('trainer/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateTrainer(body) {
    try {
        const data = ApiManager('trainer', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Eğitmen başarıyla güncellendi', 'success', 'catalog/trainers/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}