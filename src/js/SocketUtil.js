import MessageCodec from "@/js/MessageCodec";

const EventEmitter = window.require('events').EventEmitter;
const emitter = new EventEmitter();
const net = window.require('net')
import store from "../store/index";
import SystemMessage from "@/js/tcpMessage/SystemMessage";
import MainSend from "@/js/main_send/MainSend";

/**
 * socket工具类
 */
class SocketUtil {

    static socket;

    static {
        this.socket = this.init()
        this.monitor()
        this.receive()
    }


    //等待队列
    static unAckMap = new Map()
    static errorMap = new Map()
    static retransmissionMap = new Map()
    static trigger = false


    constructor() {
    }

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
     * @param message,msgSeq
     */
    static send(message) {
        this.socket.write(MessageCodec.encode(message))
        //只有聊天消息才做处理,系统消息直接发送
        if (message.type === 0) {
            let key = message.msgSeq
            this.unAckMap.set(key, message)
            store.commit('setMap', this.unAckMap)
            this.retransmissionMap.set(key, 4)
            if (!this.trigger) {
                this.trigger = true
                setInterval(() => {
                    for (let k of this.retransmissionMap.keys()) {
                        let value = this.retransmissionMap.get(k);
                        value = value - 1;
                        console.log('id: ' + k + ' msg: ' + this.unAckMap.get(k))
                        if (value === 0 && this.unAckMap.has(k)) {
                            let errorMsg = this.unAckMap.get(k)
                            this.unAckMap.delete(k)
                            this.errorMap.set(k, errorMsg)
                            console.log('interval: ', this.unAckMap)
                            store.commit('setMap', this.unAckMap)
                            store.commit('setErrorMap', this.errorMap)
                            this.retransmissionMap.delete(k)
                        } else {
                            this.retransmissionMap.set(k, value)
                        }
                        // emitter.emit('unAckMap',this.unAckMap)
                    }

                }, 1000)
            }
        }
    }

    static getEmitter() {
        return emitter
    }

    /**
     * 接收消息
     */
    static receive() {
        this.socket.on('data', (buffer) => {
            let message = MessageCodec.decode(buffer)
            let id = message.msgSeq
            console.log('receive: ',message)
            if (message.msgType === 8) {
                console.log('receive: ', this.unAckMap.has(id))
                this.unAckMap.delete(id)
                this.retransmissionMap.delete(id)
                console.log('receive: ', this.unAckMap)
                store.commit('setMap', this.unAckMap)
            } else if (message.type === 0) {
                emitter.emit('addSingleRecord',message)
                MainSend.saveMsg(message)
                let sender = message.sender
                let receiver = message.receiver
                let systemMessage = new SystemMessage(id, 8, receiver, sender);
                console.log('ack msg: ',systemMessage)
                this.send(systemMessage)
            }
        })
    }

    static monitor() {

    }


}

export default SocketUtil