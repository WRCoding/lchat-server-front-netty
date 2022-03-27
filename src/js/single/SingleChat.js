import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const isToday = require('dayjs/plugin/isToday');
const isYesterday = require('dayjs/plugin/isYesterday');
dayjs.locale('zh-cn')
dayjs.extend(isYesterday)
dayjs.extend(isToday)
import SQL from "@/js/SQL";
import store from "@/store";

export default class SingleChat{

    static {
        this.db = store.state.db
    }

    constructor() {
    }

    static time(val) {
        let temp = dayjs(val)
        if (temp.isToday()) {
            return temp.format('HH:mm')
        } else if (temp.isYesterday()) {
            return temp.format('昨天 HH:mm')
        } else {
            return temp.format('YYYY-MM-DD HH:mm')
        }
    }

    static getMsgFromDB(sender, receiver, callback) {
        let queryMsgSql = SQL.getQueryMsgSql(sender, receiver);
        let db = store.getters.getDB
        db.queryData(queryMsgSql, callback)
    }
}