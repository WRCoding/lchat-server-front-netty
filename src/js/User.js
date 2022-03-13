import request from './Request'

export default {
    login(data){
        return request({
            url: '/user/login',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: data
        })
    }
}