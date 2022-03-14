// const buffer = window.require('Buffer')

const ChatMessage = require("@/js/message/ChatMessage");

/**
 * 消息编解码
 */
class MessageCodec {

    constructor() {
    }

    static encode(message) {
        console.log('contentType: ',message.contentType)
        console.log('message: ',message)
        let messageJson = ChatMessage.JSON(message);
        let byteLength = Buffer.byteLength(messageJson,'utf-8');
        let buffer = Buffer.alloc(16 + byteLength)
        buffer.write('ink')
        buffer.writeInt8(1,3)
        buffer.writeInt32BE(0xFFFF,4)
        buffer.writeInt8(0,8)
        buffer.writeInt8(message.getContentType,9)
        buffer.writeInt8(message.getMsgType,10)
        buffer.writeInt8(message.getType,11)
        buffer.writeInt32BE(byteLength,12)
        buffer.write(messageJson,16)
        console.log('buffer: ',buffer)
        return buffer
    }
}

module.exports = MessageCodec