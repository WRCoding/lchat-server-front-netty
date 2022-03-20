/**
 * 消息实体
 */
module.exports = class Message {

    constructor(msgSeq,type,msgType,contentType) {
        this.msgSeq = msgSeq;
        this.msgType = msgType;
        this.contentType = contentType;
        this.type = type;
    }

    static JSON(message){
        return JSON.stringify(message)
    }

    get getType() {
        return this.type;
    }

    get getMsgType() {
        return this.msgType;
    }

    get getContentType() {
        return this.contentType;
    }
}
