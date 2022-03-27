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
        <span style="display: flex;flex-direction: row;justify-content: center;align-items: center">
          <a-spin v-if="map.has(message.msgSeq)" style="padding: 7px;margin-bottom: 10px">
            <a-icon slot="indicator" type="loading" style="font-size: 14px;" spin/>
          </a-spin>
          <a-icon v-if="errorMap.has(message.msgSeq)" type="exclamation-circle"
                  style="padding: 10px;margin-bottom: 10px;color: red"/>
          <p v-if="message.contentType === 1"
             v-bind:class="{'text-left': message.sender === friend.lid,'text-right':message.sender === user.lid }">{{
              message.content
            }}</p>
          <img v-if="message.contentType === 2"
               v-bind:class="{'chatRecord-left-img': message.sender === friend.lid,'chatRecord-right-img':message.sender === user.lid }"
               src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"
               class="chatRecord-right-img" alt="-"/>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import {eventBus} from "@/main";
import SocketUtil from "@/js/SocketUtil";
import SingleChat from "@/js/single/SingleChat";



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
      emitter: SocketUtil.getEmitter()
    }
  },
  created() {
    console.log('left: ', this.friend)
    SingleChat.getMsgFromDB(this.user.lid, this.friend.lid, (records) => {
      if (records.length > 0) {
        this.chatRecords = records
      }
      console.log('getMsgFromDB: ', this.chatRecords)
    })
    this.emitter.on('addSingleRecord', (message) => {
      let send = message.sender === this.friend.lid || message.sender === this.user.lid
      console.log('send: ',send)
      let receive = message.receiver === this.friend.lid || message.receiver === this.user.lid
      console.log('receive: ',receive)
      if (send && receive) {
        let map = this.chatRecords.map(record => record.msgSeq);
        let exist = map.some(element => {
          if (element === message.msgSeq) {
            return true
          }
        })
        if (!exist) {
          this.chatRecords.push(message)
          console.log('addSingleRecord: ', this.chatRecords)
        }
      }
    })
  },
  methods: {
    time(val) {
      return SingleChat.time(val)
    }
  },
  computed: {
    map() {
      return this.$store.state.map
    },
    errorMap() {
      return this.$store.state.errorMap
    }
  }
}
</script>

<style>

.loading {
  width: 15px;
  height: 15px;
  border: 1px solid rgb(84, 146, 226);
  border-top-color: transparent;
  border-radius: 100%;
  margin-right: 7px;
  margin-top: 10px;
  animation: circle infinite 0.90s linear;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}


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
  /*position: relative;*/
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