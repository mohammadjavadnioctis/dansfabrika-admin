import axios from 'axios'
import { API_URL } from 'src/config/Config'
import { cookies } from 'src/definitions/Cookies/NewCookies'


const ApiManager = axios.create({
    baseURL: API_URL + 'v1/',
    responseType:'json',
    withCredentials:true,
    headers: {
        'Authorization': `Bearer ${cookies.get('jwt')}`
    }
})

export default ApiManager