import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import axios from "axios";

export async function GetAllSliders() {
    try {
        const data = await ApiManager('slider/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteSlider(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('slider/' + id, {
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

export async function AddSlider(body,formData) {
    try {
        const data = ApiManager('slider', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                     
                    formData.append("id", response.data.id)
                    AddSliderImages(formData)

                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}


export async function AddSliderImages(formData) {
    try {
        const data = ApiManager('slider', {
            method: 'PATCH',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Resim başarıyla eklendi.', 'success', 'catalog/sliders/list')
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


export async function GetByIdSlider(id) {
    try {
        const data = await ApiManager('slider/' + id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateSlider(body) {
    try {
        const data = ApiManager('slider', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Slider başarıyla güncellendi', 'success', 'catalog/sliders/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', error.response.data.message[0], 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}