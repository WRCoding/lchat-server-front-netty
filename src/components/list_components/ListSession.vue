<template>
  <div class="listSessionBox">
    <!--会话列表-->
    <div class="listSessionCard">
      <div class="listSessionAvatar">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
      </div>
      <div class="listSessionInfo">
        <div style="width: 100%;height: 50%;display: flex;align-items: center;">
          <div class="listSessionInfo-name">
            <div>win</div>
          </div>
          <div style="width:40%;"></div>
          <div class="listSessionInfo-time">00:18</div>
        </div>
        <div class="listSessionInfo-text">
          <div>Linux</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
export default {
  name: "ListSession",
  data(){
    return{

    }
  },
  created() {
      eventBus.$on('newFriend', data => {
        console.log('newFriend: ',data)
      })
  },
  methods:{

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
  justify-content: center
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