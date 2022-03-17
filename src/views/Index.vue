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
import chatList from "@/components/list/ChatList";
import chatMain from "@/components/main/ChatMain";

import SocketUtil from "@/js/SocketUtil"
import MessageCodec from "@/js/MessageCodec"
import ChatMessage from "@/js/message/ChatMessage";

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
    let socket = new SocketUtil('127.0.0.1',8077)
    //content: msgType:contentType:xxxx
    let content = '0:1:sdadasdasd'
    let message = new ChatMessage(content,'xw','xl')
    socket.send(MessageCodec.encode(message))
    socket.receive((data) => {
      // console.log('index: ',MessageCodec.decode(data))
      MessageCodec.decode(data)
    })
  }
}
</script>


<style scoped>

</style>