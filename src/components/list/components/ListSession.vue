<template>
  <div class="listSessionBox">
    <!--会话列表-->
    <div v-for="item in sessionList" class="listSessionCard" @click="toChat">
      <div class="listSessionAvatar">
        <a-avatar shape="square" :size="40"
                  :src="item.avatar"/>
      </div>
      <div class="listSessionInfo">
        <div style="width: 100%;height: 50%;display: flex;align-items: center;">
          <div class="listSessionInfo-name">
            <div>{{ item.userName }}</div>
          </div>
          <div style="width:40%;"></div>
          <div class="listSessionInfo-time">{{ item.msgSeq }}</div>
        </div>
        <div class="listSessionInfo-text">
          <div>{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import Session from "@/js/list_session/Session";

export default {
  name: "ListSession",
  data() {
    return {
      sessionList: [],
      sessionDB: new Session(this.$store.getters.getDB)
    }
  },
  created() {
    eventBus.$on('newFriend', data => {
      console.log('newFriend: ', data)
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
      eventBus.$emit('toSingleChatMain',value)
    })
  },
  methods: {
    toChat() {
      // eventBus.$on('toChat', (value) => {
      //   console.log('ListSession: ', value)
      //   this.sessionList.unshift(value)
      // })

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
  width: 20%;
  font-size: 13px;
  font-weight: lighter;
  color: rgb(172, 172, 172)
}
</style>