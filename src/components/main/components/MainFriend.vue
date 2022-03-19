<template>
  <!-- 聊天区-->
  <div class="friendBox" style="display: flex;flex-direction: column">
    <template v-if="show">
      <div style="width: 100%;height: 30px;"></div>
      <div style="width: 100%;height: 50%;display: flex;justify-content: center;align-items: center">
        <a-avatar shape="square" :size="170" :src="friend.avatar"/>
      </div>
      <div style="width: 100%;height: 50%;display: flex;flex-direction: column;align-items: center">
        <h1>{{ friend.userName }}</h1>
        <h1>{{friend.description}}</h1>
        <div class="toChatBtn" @click="toChat">发消息</div>
      </div>
    </template>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: "MainFriend",
  data(){
    return{
      friend: {},
      show:false
    }
  },
  created() {
    eventBus.$on('friendInfo',(value) => {
      this.show = true;
      this.friend = value;
    })
  },
  methods: {
    toChat(){
      eventBus.$emit('toChatSide',this.friend)
    }
  }
}
</script>

<style>
.friendBox {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 243, 243);
  /*background-color: red;*/
  border-bottom: 1px solid rgb(224, 224, 224);
  overflow-y: auto;
  user-select: none;
}
.toChatBtn{
  width: 120px;
  font-size: 17px;
  border: 1px solid;
  padding: 10px;
  border-radius: 7px;
  background-color: rgb(88, 190, 106);
  color: rgb(213, 239, 218);
}
</style>