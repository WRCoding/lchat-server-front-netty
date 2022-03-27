import SQL from "@/js/SQL";
import store from "@/store";


export default class Friend {

    constructor() {
    }

    updateFriend(data) {
        let db = store.getters.getDB
        let friends = []
        for (let i = 0; i < data.length; i++) {
            let friend = [data[i].lid, data[i].userName, data[i].avatar, data[i].background, data[i].description]
            friends.push(friend)
        }
        let deleteFriendSql = SQL.deleteFriendSql;
        let insertFriendSql = SQL.insertFriendSql;
        db.executeSql(deleteFriendSql)
        db.insertDataBatch(insertFriendSql, friends)
    }
}