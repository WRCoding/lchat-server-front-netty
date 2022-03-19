<template>
  <div style="height: 100%;width: 100%;display: flex;flex-direction: column">
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
    let chatDB = new ChatDB(this.user.userName+'.db')
    this.$store.commit('setDB',chatDB)
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