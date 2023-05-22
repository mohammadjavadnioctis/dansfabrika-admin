import axios from 'axios'
import { cookies } from 'src/definitions/Cookies/NewCookies'


const ApiManager = axios.create({
    baseURL: 'http://api.dansfabrika.com/v1/',
    responseType:'json',
    withCredentials:true,
    headers: {
        'Authorization': `Bearer ${cookies.get('jwt')}`
    }
})

export default ApiManager