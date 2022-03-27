

const getGroupMessageSql = `SELECT * from chat_message WHERE "to" = '?'`

const insertMsgSql = `insert into chat_message values (?,?,?,?,?,?,1)`

let queryMsgSql = `
      SELECT
        * 
      FROM
        chat_message 
        WHERE
        (sender = '?' and receiver = '#') 
        OR (sender = '#' and receiver = '?')  
        ORDER BY
        msgSeq ASC
  `

const sessionSql = `
SELECT chat_friend.lid,username as userName,avatar,msgSeq,content as nowMsg,contentType from (SELECT
 MAX( msgSeq ) AS msgSeq,lid,content,contentType
FROM
 (
 SELECT
  MAX( msgSeq ) AS msgSeq,
  sender as lid,
  content,
  contentType 
 FROM
  chat_message 
 WHERE
  receiver = '?' 
 GROUP BY
  sender UNION ALL
 SELECT
  MAX( msgSeq ) AS msgSeq,
  receiver as lid,
  content,
  contentType 
 FROM
  chat_message 
 WHERE
  sender = '?' 
 GROUP BY
 receiver
 ) as temp GROUP BY lid) as temp LEFT JOIN chat_friend on temp.lid = chat_friend.lid
`



module.exports = class SQL {

    static deleteFriendSql = `delete from chat_friend`
    static insertFriendSql = `insert into chat_friend values (?,?,?,?,?)`

    constructor() {
    }

    //todo 后续这里的SQL把用户信息也带上
    static getSessionsSql(userId) {
        return sessionSql.replaceAll('?', userId)
    }
    groupMessageSql(groupId) {
        return getGroupMessageSql.replaceAll('?', groupId)
    }

    static getInsertMsgSql(){
        return insertMsgSql
    }

    static getQueryMsgSql(sender,receiver){
        queryMsgSql = queryMsgSql.replaceAll('?', sender)
        queryMsgSql = queryMsgSql.replaceAll('#', receiver)
        console.log('queryMsgSql: ',queryMsgSql)
        return queryMsgSql;
    }

}