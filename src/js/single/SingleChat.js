import dayjs from 'dayjs'

export default {
    time(val) {
        let temp = dayjs(val)
        if (temp.isToday) {
            return temp.format('HH:mm')
        } else if (temp.isYesterday) {
            return temp.format('昨天 HH:mm')
        } else {
            return temp.format('YYYY-MM-DD HH:mm')
        }
    }
}