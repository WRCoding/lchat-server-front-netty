const Message = require("@/js/message/Message");

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

}

module.exports = ChatMessage