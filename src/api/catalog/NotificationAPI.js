import ApiManager from "../ApiManager";
import Swal from 'sweetalert2'
import { GetBasicSwal, GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import { ControlErrorMessage } from "src/definitions/Enums/ErrorEnums";



export async function GetAllNotifications() {
    try {
        const data = await ApiManager('notification/', {
            method: 'GET',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function AddNotifications(body) {
    try {
        const data = ApiManager('notification', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if (response.status = 200) {
                    GetBasicSwalUrl('Başarılı!', 'Bildirim başarıyla gönderildi.', 'success', 'catalog/notifications/list')
                }
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}