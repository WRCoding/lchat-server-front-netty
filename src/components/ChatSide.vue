<template>
  <a-col flex="65px" class="sideContainer">
    <a-avatar shape="square" size="large"
              :src="user.avatar"
              style="margin-top: 55px"/>

    <div class="options" v-bind:class="{'options-click': currentOption === 'session'}" style="width: 30px;height: 30px; margin-top: 40px;" @click="triggerOption('session')">
      会话
    </div>

    <div class="options" v-bind:class="{'options-click': currentOption === 'friends'}" style="width: 30px;height: 30px; margin-top: 20px;" @click="triggerOption('friends')">
      好友
    </div>

    <div class="options" v-bind:class="{'options-click': currentOption === 'group'}" style="width: 30px;height: 30px; margin-top: 20px;" @click="triggerOption('group')">
      群聊
    </div>

  </a-col>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: "ChatLeft",
  data(){
    return{
      user: {},
      currentOption: 'session'
    }
  },
  created() {
    this.user = this.$store.getters.getUser
  },
  methods: {
    //触发选项
    triggerOption(value){
      this.currentOption = value
      //更换至会话，好友或者群聊选项
      eventBus.$emit('changeOption',value)
      console.log(value)
    }

  }
}
</script>

<style>

.sideContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(222, 221, 221);
  -webkit-app-region: drag
}

.options:hover{
  cursor: pointer;
  user-select: none;
  color: rgb(87, 190, 106);
}

.options-click{
  color: rgb(87, 190, 106);
}

</style>