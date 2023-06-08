import { BASE_URL } from "src/config/Config";
import ApiManager from "../ApiManager";
import { GetBasicSwalUrl, GetSwal } from "src/definitions/Alert";
import { cookies, expireTime } from "src/definitions/Cookies/NewCookies";
import { ControlErrorMessage } from "src/definitions/Enums/ErrorEnums";

export async function AdminLogin(body) {
    try {
        const data = await ApiManager('auth/admin/login', {
            method: 'POST',
            data: body,
        })
            .then((response) => {
                if(response.status==201){
                    cookies.set("jwt",response.data.accessToken, { expires: expireTime, sameSite: 'none', secure: true })
                    GetBasicSwalUrl('Başarılı!', "Giriş başarılı.", 'success', 'dashboard')
                }
                else{
                    GetSwal('Başarısız!', 'Beklenmeyen hata!', 'error')
                }
                
            })
            .catch((error) => {
                GetSwal('Başarısız!', ControlErrorMessage(error.response.data.message[0]), 'error')
            })
    } catch (error) {
        GetSwal('Hata', error.response.data['message'], 'error')
    }
}