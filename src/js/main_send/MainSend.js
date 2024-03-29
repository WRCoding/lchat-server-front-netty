const SQL = require("@/js/SQL");
import store from "../../store/index";

export default class MainSend {

    static {
        this.db = store.state.db
    }

    constructor() {

    }

    static paste(clipboard) {
        if (!clipboard.readImage().isEmpty()) {
            let image = clipboard.readImage()
            console.log(image.getSize())
            console.log(image.getAspectRatio())
            let width = image.getSize().width
            let height = image.getSize().height
            let ratio = image.getAspectRatio()
            if (ratio >= 1 && ratio <= 2) {
                width = 150
                height = 100
            } else if (ratio < 1) {
                width = 50
                height = 100
            } else {
                width = 100
                height = 50
            }
            let resizeImage = image.resize({width: width, height: height, quality: 'good'})
            console.log(resizeImage.getSize())
            return {thumbnail: image.toDataURL(), source: resizeImage.toDataURL(), size: {width, height}}
        } else {
            return undefined
        }
    }

    static content(event) {
        event.preventDefault()
        return event.target.innerText
    }

    static saveMsg(message) {
        let data = [message.msgSeq, message.sender, message.receiver, message.content, message.msgType, message.contentType]
        let insertMsgSql = SQL.getInsertMsgSql();
        let db = store.getters.getDB
        db.insertData(insertMsgSql, data)
    }


}