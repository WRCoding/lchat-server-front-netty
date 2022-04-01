import MainSend from "@/js/main_send/MainSend";

const SQL = require('../SQL')
import offLineMessage from "@/js/OffLineMessage";
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
        console.log('sessionSql: ',sessionsSql)
        this.chatDB.queryData(sessionsSql,callback)
    }

    time(val){
        let temp = dayjs(val)
        if (temp.isToday()) {
            return temp.format('HH:mm')
        }else {
            return temp.format('YYYY-MM-DD')
        }
    }

    getOffLineMsg(lid,callback){
        offLineMessage.getOffLineMsg(lid).then(response => {
            let result = response.data
            let offLineMessages = result.data;
            console.log(result)
            if (result.code === 200){
                offLineMessage.confirm(lid)
                offLineMessages.forEach(message => {
                    MainSend.saveMsg(message)
                })
                setTimeout(()=>{
                    this.getSessions(lid, callback)
                },1000)
            }
        })
    }

}