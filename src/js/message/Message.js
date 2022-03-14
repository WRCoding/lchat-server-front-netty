/**
 * 消息实体
 */
module.exports = class Message {

    constructor(seqId,type,msgType,contentType) {
        this.seqId = seqId;
        this.msgType = msgType;
        this.contentType = contentType;
        this.type = type;
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
