const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db =  {};


db.sqliteDB = function (file){
    db.database = new sqlite3.Database(file)

    db.exist = fs.existsSync(file)
    if (!db.exist){
        console.log("create db file")
        fs.openSync(file, 'w')
    }
    console.log('open db file success')
    //创建好友表
    db.database.serialize(() => {
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
        db.database.run(sql,() => {
        })
    })
    //创建消息表
    db.database.serialize(() => {
        let sql = `
            CREATE TABLE IF NOT EXISTS "chat_message" (
              "msgSeq" INTEGER NOT NULL,
              "from" text,
              "to" text,
              "message" text,
              "msgType" text,
              "type" text
            );
        `
        db.database.run(sql,() => {
        })
    })
    //群聊成员信息
    db.database.serialize(() => {
        let sql = `
            CREATE TABLE IF NOT EXISTS "lchat_group_member" (
              "group_id" text,
              "group_member_lcid" text,
              "username" text,
              "avatar" text
            );
        `
        db.database.run(sql,() => {
        })
    })
    //
    db.database.serialize(() => {
        let sql = `
            CREATE TABLE IF NOT EXISTS "lchat_group_info" (
              "group_creator" text,
              "group_id" text,
              "group_name" text,
              "group_owner" text
            );
        `
        db.database.run(sql,() => {
        })
    })
};

db.printErrorInfo = function (err){
    console.log("Error message: " + err)
}

db.sqliteDB.prototype.createTable =  (sql) => {
    db.database.serialize(() => {
        db.database.run(sql,(err) => {
            if (null != err){
                db.printErrorInfo(err)

            }
        })
    })
}

db.sqliteDB.prototype.insertDataBatch = (sql, object) => {
    console.log('我被执行啦')
    db.database.serialize(() => {
        const stmt = db.database.prepare(sql);
        for (let i = 0; i<object.length; ++i){
            stmt.run(object[i])
        }
        stmt.finalize()
    })
}

db.sqliteDB.prototype.insertData = (sql, object) => {
    db.database.serialize(() => {
        const stmt = db.database.prepare(sql);
        stmt.run(object)
        stmt.finalize()
    })
}

db.sqliteDB.prototype.queryData = (sql, callback) => {
    db.database.serialize(() => {
        db.database.all(sql, (err, rows) => {
            if (null != err){
                db.printErrorInfo(err)
                return
            }
            if (callback){
                callback(rows)
            }
        })
    })
}

db.sqliteDB.prototype.executeSql = (sql) => {
    db.database.run(sql, (err) => {
        if (null != err){
            db.printErrorInfo(err)
        }
    })
}

db.sqliteDB.prototype.close = () => {
    db.database.close()
}


exports.sqliteDB = db.sqliteDB

