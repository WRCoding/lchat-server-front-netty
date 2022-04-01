import request from './Request'

export default {
    getOffLineMsg(lid){
        return request({
            url: '/message/offLine/' + lid,
            method: 'get'
        })
    },
    confirm(lid){
        return request({
            url: '/message/confirm/' + lid,
            method: 'get'
        })
    }
}