<template>
  <!-- 聊天区-->
  <div class="mainChatBox">
    <!-- 每一块聊天记录-->
    <div v-for="message in chatRecords" class="mainChatCard">
      <!--时间div-->
      <div style="margin-bottom: 4px">
        <p style="color: rgb(170, 170, 170)">{{ time(message.msgSeq) }}</p>
      </div>
      <!-- 信息div-->
      <div
          v-bind:class="{'leftChatRecord': message.sender === friend.lid,'rightChatRecord':message.sender === user.lid }">
        <a-avatar shape="square" :size="40" :src="message.sender === user.lid ? user.avatar : friend.avatar"/>
        <span style="display: flex;flex-direction: column;align-items: flex-start">
          <p v-if="message.contentType === 1"
             v-bind:class="{'text-left': message.sender === friend.lid,'text-right':message.sender === user.lid }">{{ message.content }}</p>
          <img v-if="message.contentType === 2"
               v-bind:class="{'chatRecord-left-img': message.sender === friend.lid,'chatRecord-right-img':message.sender === user.lid }"
               src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"
               class="chatRecord-right-img"/>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import {eventBus} from "@/main";
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const isToday = require('dayjs/plugin/isToday');
const isYesterday = require('dayjs/plugin/isYesterday');
dayjs.locale('zh-cn')
dayjs.extend(isYesterday)
dayjs.extend(isToday)

export default {
  name: "MainChat",
  props: {
    friend: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      chatRecords: [],
      day: dayjs
    }
  },
  created() {
    console.log('left: ', this.friend)
    eventBus.$on('addSingleRecord', (message) => {
      this.chatRecords.push(message)
    })
  },
  methods: {
    time(val) {
      if (dayjs(val).isToday()) {
        return dayjs(val).format('HH:mm')
      } else if (dayjs(val).isYesterday()) {
        return dayjs(val).format('昨天 HH:mm')
      } else {
        return dayjs(val).format('YYYY-MM-DD HH:mm')
      }
    }
  },
}
</script>

<style>
.mainChatBox {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 243, 243);
  border-bottom: 1px solid rgb(224, 224, 224);
  overflow-y: auto
}

.mainChatCard {
  display: flex;
  flex-direction: column;
  margin-top: 7px
}

.leftChatRecord {
  display: flex;
  padding: 4px;
  margin-left: 10px
}

.rightChatRecord {
  display: flex;
  padding: 4px;
  margin-right: 7px;
  flex-direction: row-reverse
}


.text-left {
  font-weight: bold;
  border: 1px solid rgb(240, 240, 240);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  padding: 10px 10px;
  margin-left: 10px;
  display: inline-block;
  word-wrap: break-word;
  max-width: 230px;
  position: relative;
}

.text-left::after {
  content: ' ';
  display: inline-block;
  border: 6px solid transparent;
  border-right-color: rgb(255, 255, 255);
  position: absolute;
  top: 6px;
  left: -12px;
}

.text-right {
  font-weight: bold;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  padding: 10px 10px;
  background-color: rgb(152, 225, 101);
  margin-right: 10px;
  display: inline-block;
  word-wrap: break-word;
  max-width: 230px;
  position: relative;

}

.chatRecord-left-img {
  border-radius: 5px;
  display: inline-block;
  margin-left: 10px;
  width: 100px;
  height: 200px;
}

.chatRecord-right-img {
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
  width: 100px;
  height: 200px;
}

.text-right::after {
  white-space: pre-line;
  content: ' ';
  display: inline-block;
  border: solid 6px red;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-left-color: rgb(152, 225, 101);
  position: absolute;
  top: 6px;
  right: -12px;
}
</style>