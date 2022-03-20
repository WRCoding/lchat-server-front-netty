const {map} = require("core-js/internals/array-iteration");
const ChatEvent = require("@/js/event/ChatEvent");

const net = window.require('net')

/**
 * socket工具类
 */
class SocketUtil {

    static socket;

    static {
        this.socket = this.init()
        this.monitor()
    }


    //等待队列
    static unAckMap = new Map()
    static event = false


    constructor() {}

    /**
     * 初始化socket
     * @returns {Socket}
     */
    static init() {
        return net.createConnection({
            host: '127.0.0.1',
            port: 8077
        });
    }

    /**
     * 发送消息
     * @param message
     */
    static send(message) {
        this.socket.write(message)
        let mSecond = new Date().getTime()
        console.log(mSecond)
        let key = mSecond + ':' + 3
        this.unAckMap.set(key, message)
        console.log('map: ',this.unAckMap)
        //todo 发送消息，同时加入map,
    }

    /**
     * 接收消息
     */
    static receive(callback){
        this.socket.on('data', (message) => {
            return callback(message)
        })
    }

    static monitor(){

    }
}

module.exports = SocketUtil