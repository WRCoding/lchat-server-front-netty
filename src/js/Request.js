const  axios = window.require('axios')
const BASE_URL = '/chat'

const request = axios.create({
    baseURL: BASE_URL
})

export default request