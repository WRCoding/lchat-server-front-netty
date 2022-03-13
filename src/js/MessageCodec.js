const buffer = window.require('Buffer')

/**
 * 消息编解码
 */
class MessageCodec {

    constructor() {
    }

    encode() {
        let buf = Buffer.from('aaaaa', 4)
        console.log('buf: ',buf.toString())
    }
}

module.exports = MessageCodec