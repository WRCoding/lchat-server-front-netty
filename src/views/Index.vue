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
import chatList from "@/components/ChatList";
import chatMain from "@/components/ChatMain";

export default {
  name: "Index",
  components:{
    chatSide,
    chatList,
    chatMain
  }
}
</script>

<style scoped>

</style>