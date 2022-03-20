const SQL = require('../SQL')
module.exports = class Session{
    constructor(db) {
        this.chatDB = db
        console.log('Session : ',this.chatDB)
    }

    getSessions(lid,callback){
        let sessionsSql = SQL.getSessionsSql(lid);
        this.chatDB.queryData(sessionsSql,callback)
    }

}