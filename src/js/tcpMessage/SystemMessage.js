const Message = require("@/js/tcpMessage/Message");

class SystemMessage extends Message {

    constructor(msgSeq, msgType, sender, receiver) {
        super(msgSeq, 2, msgType, 0);
        this.sender = sender;
        this.receiver = receiver;
    }


    static PARSE(message) {
        return new SystemMessage(message.msgSeq, message.msgType, message.sender, message.receiver)
    }

}

module.exports = SystemMessage