const Message = require("@/js/tcpMessage/Message");

class ChatMessage extends Message {

    constructor(content, sender, receiver) {
        //content: msgType:contentType:xxxx
        super(new Date().getTime(),0,Number(content.split(':')[0]),Number(content.split(':')[1]));
        this.content = content.split(':')[2]
        this.sender = sender;
        this.receiver = receiver;
    }

    static JSON(chatMessage){
        return JSON.stringify(chatMessage)
    }

    static PARSE(message){
        return new ChatMessage(message.content,message.sender,message.receiver)
    }

}

module.exports = ChatMessage