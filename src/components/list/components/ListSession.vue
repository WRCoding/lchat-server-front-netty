<template>
  <div class="listSessionBox">
    <!--会话列表-->
    <div v-for="item in sessionList" class="listSessionCard" @click="toChat(item)">
      <div class="listSessionAvatar">
        <a-avatar shape="square" :size="40"
                  :src="item.avatar"/>
      </div>
      <div class="listSessionInfo">
        <div style="width: 100%;height: 50%;display: flex;align-items: center;">
          <div class="listSessionInfo-name">
            <div>{{ item.userName }}</div>
          </div>
          <div style="width:30%;"></div>
          <div class="listSessionInfo-time">{{ time(item.msgSeq) }}</div>
        </div>
        <div class="listSessionInfo-text">
          <div>{{ item.nowMsg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import Session from "@/js/list_session/Session";
import SocketUtil from "@/js/SocketUtil";

export default {
  name: "ListSession",
  data() {
    return {
      sessionList: [],
      session: new Session(this.$store.getters.getDB),
      emitter: SocketUtil.getEmitter()
    }
  },
  created() {
    this.init()
    this.emitter.on('addSingleRecord', (message) => {
      let exist = this.sessionList.some(session => {
        if (session.lid === message.receiver || session.lid === message.sender) {
          session.msgSeq = message.msgSeq
          if (message.contentType === 1) {
            session.nowMsg = message.content
          } else {
            session.nowMsg = '[图片]'
          }
          return true
        }
      })
      if (!exist) {
        this.sessionList.unshift(message)
      }
      this.sessionList.sort((session_1, session_2) => {
        return session_2.msgSeq - session_1.msgSeq
      })
    })
    eventBus.$on('toListSession', (value) => {
      let exist = this.sessionList.some(session => {
        if (session.lid === value.lid) {
          return true
        }
      })
      if (!exist) {
        this.sessionList.unshift(value)
      }
      eventBus.$emit('toSingleChatMain', value)
    })
  },
  methods: {
    init() {
      let lid = this.$store.state.user.lid
      this.session.getOffLineMsg(lid, (data) => {
        console.log('getSession: ', data)
        this.sessionList = data
        this.sessionList.sort((session_1, session_2) => {
          return session_2.msgSeq - session_1.msgSeq
        })
      })
    },
    toChat(item) {
      eventBus.$emit('toSingleChatMain', item)
    },
    time(val) {
      return this.session.time(val)
    }
  },
  beforeDestroy() {
    eventBus.$off('toChat')
  }
}
</script>

<style>

.listSessionBox {
  background-color: rgb(247, 247, 247);
  height: 100%;
  overflow-y: auto;
}

.listSessionCard {
  width: 100%;
  height: 60px;
  background-color: rgb(247, 247, 247);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.listSessionCard:hover {
  cursor: pointer;
}


.listSessionAvatar {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.listSessionInfo {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column
}

.listSessionInfo-text {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  margin-left: 3px
}


.listSessionInfo-name {
  width: 40%;
  font-size: 14px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  margin-left: 3px
}

.listSessionInfo-time {
  width: 30%;
  font-size: 11px;
  font-weight: lighter;
  color: rgb(172, 172, 172)
}
</style>