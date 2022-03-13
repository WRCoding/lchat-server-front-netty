const net = window.require('net')
/**
 * socket工具类
 */
class SocketUtil{
    constructor(ip, port) {
        this.ip = ip
        this.port = port
        this.socket = this.init()
        this.socket.on('data',(message)=>{
            console.log('receive data: ',message.toString())
        })
    }

    /**
     * 初始化socket
     * @returns {Socket}
     */
    init(){
        return net.createConnection({
            host: this.ip,
            port: this.port
        });
    }

    /**
     * 发送消息
     * @param message
     */
    send(message){
        this.socket.write(message)
    }
}

module.exports = SocketUtil