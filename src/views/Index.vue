<template>
  <div style="height: 100%;width: 100%;display: flex;flex-direction: row">
    <chat-side/>
    <chat-list/>
    <chat-main/>
  </div>
</template>

<script>
import chatSide from "@/components/ChatSide";
import chatList from "@/components/list/ChatList";
import chatMain from "@/components/main/ChatMain";

import SocketUtil from "@/js/SocketUtil"
import MessageCodec from "@/js/MessageCodec"
import ChatMessage from "@/js/tcpMessage/ChatMessage";
import ChatDB from "@/js/ChatDB";

export default {
  name: "Index",
  components:{
    chatSide,
    chatList,
    chatMain
  },
  data(){
    return{
      user: this.$store.getters.getUser,
      socketUtil: null
    }

  },
  created() {

  }
}
</script>


<style scoped>

</style>