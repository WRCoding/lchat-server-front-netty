const {map} = require("core-js/internals/array-iteration");
const ChatEvent = require("@/js/event/ChatEvent");

const net = window.require('net')

/**
 * socket工具类
 */
class SocketUtil {

    //等待队列
    unAckMap = new Map()
    date = new Date()
    event = false

    constructor(ip, port) {
        this.ip = ip
        this.port = port
        this.socket = this.init()
        this.chatEvent = new ChatEvent()
        this.monitor()
    }

    /**
     * 初始化socket
     * @returns {Socket}
     */
    init() {
        return net.createConnection({
            host: this.ip,
            port: this.port
        });
    }

    /**
     * 发送消息
     * @param message
     */
    send(message) {
        this.socket.write(message)
        let mSecond = this.date.getMilliseconds()
        let key = mSecond + ':' + 3
        this.unAckMap.set(key, message)
        console.log('map: ',this.unAckMap)
        if (!this.event){
            this.chatEvent.emit('data',1234)
            this.event = true
        }
        //todo 发送消息，同时加入map,
    }

    /**
     * 接收消息
     */
    receive(callback){
        this.socket.on('data', (message) => {
            return callback(message)
        })
    }

    monitor(){

    }
}

module.exports = SocketUtil