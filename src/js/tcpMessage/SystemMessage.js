const Message = require("@/js/tcpMessage/Message");

class SystemMessage extends Message {

    constructor(msgType, sender, receiver) {
        super(new Date().getTime(),2,msgType,0);
        this.sender = sender;
        this.receiver = receiver;
    }

    static PARSE(message){
        return new SystemMessage(message.msgType,message.sender,message.receiver)
    }

}

module.exports = SystemMessage