import axios from 'axios'

const ApiManager = axios.create({
    baseURL: 'https://api.dansfabrika.com/v1/',
    responseType:'json',
    withCredentials:true,
})

export default ApiManager