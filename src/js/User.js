import request from './Request'

export default {
    login(data){
        return request({
            url: '/user/login',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: data
        })
    },
    search(data){
        return request({
            url: '/user/search?key='+data,
            method: 'get'
        })
    },
    addFriend(data){
        return request({
            url: '/user/addFriend',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: data
        })
    },
    //获取好友信息
    friends(data){
        return request({
            url: '/user/friends?lid='+data,
            method: 'get'
        })
    },
}