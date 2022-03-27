const SQL = require('../SQL')
const SingleChat = require("@/js/single/SingleChat");
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const isToday = require('dayjs/plugin/isToday');
const isYesterday = require('dayjs/plugin/isYesterday');
dayjs.locale('zh-cn')
dayjs.extend(isYesterday)
dayjs.extend(isToday)
export default class Session{
    constructor(db) {
        this.chatDB = db
    }

    getSessions(lid,callback){
        let sessionsSql = SQL.getSessionsSql(lid);
        this.chatDB.queryData(sessionsSql,callback)
    }

    time(val){
        let temp = dayjs(val)
        if (temp.isToday()) {
            return temp.format('HH:mm')
        } else if (temp.isYesterday()) {
            return temp.format('昨天 HH:mm')
        } else {
            return temp.format('YYYY-MM-DD HH:mm')
        }
    }

}