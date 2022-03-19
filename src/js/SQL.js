const getSessionSql = `
SELECT
 MAX( msgSeq ) AS msgSeq,lid,message,msgType
FROM
 (
 SELECT
  MAX( msgSeq ) AS msgSeq,
  sender as lid,
  message,
  msgType 
 FROM
  chat_message 
 WHERE
  receiver = '?' 
 GROUP BY
  sender UNION ALL
 SELECT
  MAX( msgSeq ) AS msgSeq,
  receiver as lid,
  message,
  msgType 
 FROM
  chat_message 
 WHERE
  sender = '?' 
 GROUP BY
 receiver
 ) as temp GROUP BY lid
`

const getGroupMessageSql = `SELECT * from lchat_message WHERE "to" = '?'`

module.exports = class SQL {

    constructor() {
    }

    //todo 后续这里的SQL把用户信息也带上
    static getSessionsSql(userId) {
        return getSessionSql.replaceAll('?', userId)
    }
    groupMessageSql(groupId) {
        return getGroupMessageSql.replaceAll('?', groupId)
    }
}