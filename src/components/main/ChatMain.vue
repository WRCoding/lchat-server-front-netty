<template>
  <div class="mainContainer" >
    <div class="mainBox">
      <main-title v-if="!isFriend" v-bind:name="name"/>
      <main-single-chat v-if="!isFriend && single" v-bind:friend="friend"/>
      <main-send v-if="!isFriend" v-bind:receiver="receiver"/>
      <main-friend v-show="isFriend"/>
    </div>
  </div>
</template>

<script>
import mainTitle from "@/components/main/components/MainTitle";
import mainSingleChat from "@/components/main/components/MainSingleChat";
import mainSend from "@/components/main/components/MainSend";
import mainFriend from "@/components/main/components/MainFriend";
import {eventBus} from "@/main";

export default {
  name: "ChatMain",
  components: {
    mainTitle,
    mainSingleChat,
    mainSend,
    mainFriend
  },
  data() {
    return {
      isFriend: false,
      single: false,
      name: 'Hadoop',
      friend: {},
      receiver: ''
    }
  },
  created() {
    //切换到查看好友信息
    eventBus.$on('watchFriend', (friend) => {
      this.isFriend = true;
      eventBus.$emit('friendInfo', friend)
    })
    eventBus.$on('toSingleChatMain', (friend) => {
      this.isFriend = false
      this.single = true
      this.name = friend.userName
      this.friend = friend
      this.receiver = friend.lid
    })
  },
  methods: {},
  beforeDestroy() {
    eventBus.$off('toChat')
  }
}
</script>

<style>

.mainContainer {
  background-color: rgb(243, 243, 243);
  width: calc(100% - 325px);
  height: 100%;
}

.mainBox {
  display: flex;
  flex-direction: column;
  height: 100%
}



</style>