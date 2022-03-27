<template>
  <!-- 发送消息区-->
  <div style="width:100%;height: 200px;background-color: rgb(243, 243, 243);">
    <!--表情,文件 -->
    <div style="width: 100%;height: 50px;display: flex;align-items: flex-start">
      <a-icon type="smile" style="font-size: 23px;padding: 17px"/>
      <a-icon type="folder" style="font-size: 23px;padding: 17px"/>
    </div>
    <!--发送区 -->
    <div class="sendBox">
      <div v-viewer="options" ref="areatext" contenteditable="true" class="area-text"
           v-on:keydown.meta.86="paste()" @keydown.enter="sendContent($event)">
        <template v-for="(image,index) in pasteImages">
          <img
              :src="image.source" class="image" :key="index"
              :data-src="image.thumbnail"
          >
        </template>
      </div>

    </div>
  </div>
</template>

<script>
import {clipboard} from "electron";
import MainSend from "@/js/main_send/MainSend";
import ChatMessage from "@/js/tcpMessage/ChatMessage";
import SocketUtil from "@/js/SocketUtil";
import MessageCodec from "@/js/MessageCodec";
import {eventBus} from "@/main";

export default {
  name: "MainSend",
  props: {
    receiver: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      db: this.$store.getters.getDB,
      options: {
        url: 'data-src',
      },
      pasteImages: [],
      emitter: SocketUtil.getEmitter()
    }
  },
  methods: {
    paste() {
      let pasteImage = MainSend.paste(clipboard);
      pasteImage !== undefined ? this.pasteImages.push(pasteImage) : ''
    },
    sendContent(event) {
      event.preventDefault()
      if (event.target.innerText.length > 0) {
        let content = MainSend.content(event);
        //content: msgType:contentType:xxxx
        content = '0:' + '1:' + content
        let message = new ChatMessage(new Date().getTime(),content, this.user.lid, this.receiver)
        SocketUtil.send(message)
        this.emitter.emit('addSingleRecord', message)
        MainSend.saveMsg(message)
        event.target.innerText = ''
        this.pasteImages = []
      }
    }
  }
}
</script>

<style>
.area-text {
  padding: 10px;
  border: solid 0;
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: rgb(242, 241, 241);
  resize: none;
  outline: none;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
}

.sendBox {
  width: 100%;
  height: 150px
}
</style>