const Message = require("@/js/tcpMessage/Message");

class ChatMessage extends Message {

    constructor(msgSeq,content, sender, receiver) {
        //content: msgType:contentType:xxxx
        super(msgSeq,0,Number(content.split(':')[0]),Number(content.split(':')[1]));
        this.content = content.split(':')[2]
        this.sender = sender;
        this.receiver = receiver;
    }

    static PARSE(message){
        return new ChatMessage(message.msgSeq, message.content,message.sender,message.receiver)
    }

}

module.exports = ChatMessage