<template>
  <div style="height: 100%;width: 100%">
    <a-row type="flex" style="height: 100%;width: 100%;">
      <chat-side/>
      <chat-list/>
      <chat-main/>
    </a-row>
  </div>
</template>

<script>
import chatSide from "@/components/ChatSide";
import chatList from "@/components/list_components/ChatList";
import chatMain from "@/components/main_components/ChatMain";

import SocketUtil from "@/js/SocketUtil"
import MessageCodec from "@/js/MessageCodec"

export default {
  name: "Index",
  components:{
    chatSide,
    chatList,
    chatMain
  },
  data(){
    return{
      socketUtil: null
    }

  },
  created() {
    // let socket = new SocketUtil('127.0.0.1',8077)
    // socket.send('委屈手动阀而且二委屈恶趣味个')
    let codec = new MessageCodec()
    codec.encode()
  }
}
</script>


<style scoped>

</style>