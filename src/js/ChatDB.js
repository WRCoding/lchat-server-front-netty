const fs = window.require('fs');
const sqlite3 = window.require('sqlite3').verbose();

module.exports = class ChatDB {
    constructor(file) {
        if (!fs.existsSync(file)){
            console.log("create db file")
            fs.openSync(file, 'w')
        }
        this.db = new sqlite3.Database(file)
        this.init()
    }

    createTable(sql){
        this.db.serialize(() => {
            this.db.run(sql,(err) => {
                if (null != err){
                    console.log("createTable Error tcpMessage: " + err)
                }
            })
        })
    }

    insertDataBatch(sql,object){
        this.db.serialize(() => {
            const stmt = this.db.prepare(sql);
            for (let i = 0; i<object.length; ++i){
                stmt.run(object[i])
            }
            stmt.finalize()
        })
    }

    insertData(sql,object){
        this.db.serialize(() => {
            const stmt = this.db.prepare(sql);
            stmt.run(object)
            stmt.finalize()
        })
    }

    queryData(sql,callback){
        this.db.serialize(() => {
            this.db.all(sql, (err, rows) => {
                if (null != err){
                    console.log("queryData Error tcpMessage: " + err)
                    return
                }
                if (callback){
                    callback(rows)
                }
            })
        })
    }

    executeSql(sql){
        this.db.run(sql, (err) => {
            if (null != err){
                console.log("executeSql Error tcpMessage: " + err)
            }
        })
    }

    close(){
        this.db.close()
    }

    init() {
        this.db.serialize(() => {
            //创建好友表
            let sql = `
            CREATE TABLE IF NOT EXISTS "chat_friend" (
              "lid" text NOT NULL,
              "username" blob,
              "avatar" text,
              "background" text,
              "description" text,
              PRIMARY KEY ("lid")
            );
        `
            this.db.run(sql,() => {
            })
            //消息表
            sql = `
            CREATE TABLE IF NOT EXISTS "chat_message" (
              "msgSeq" INTEGER NOT NULL,
              "sender" text,
              "receiver" text,
              "message" text,
              "msgType" text,
              "type" text
            );
        `
            this.db.run(sql,() => {
            });
            //群聊成员信息
            sql = `
            CREATE TABLE IF NOT EXISTS "chat_group_member" (
              "group_id" text,
              "group_member_lid" text,
              "username" text,
              "avatar" text
            );
        `
            this.db.run(sql,() => {
            });
            //群聊信息表
            sql = `
            CREATE TABLE IF NOT EXISTS "chat_group_info" (
              "group_creator" text,
              "group_id" text,
              "group_name" text,
              "group_owner" text
            );
        `
            this.db.run(sql,() => {
            })
        });
    }


}