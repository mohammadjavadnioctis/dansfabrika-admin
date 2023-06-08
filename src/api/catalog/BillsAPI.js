import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import { ControlErrorMessage } from "src/definitions/Enums/ErrorEnums";



export async function GetAllBills() {
    try {
        const data = await ApiManager('bills/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteBill(id) {
    try {
        Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: 'Evet, eminim',
            cancelButtonText: 'İptal Et'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = ApiManager('bills/' + id, {
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

export async function AddBill(body) {
    try {
        const data = ApiManager('bills', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Gelir veya gider başarıyla eklendi', 'success', 'catalog/bills/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}

export async function GetByIdBill(id) {
    try {
        const data = await ApiManager('bills/'+id, {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function UpdateBill(body) {
    try {
        const data = ApiManager('bills', {
            method: 'PUT',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Gelir veya gider başarıyla güncellendi', 'success', 'catalog/bills/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}