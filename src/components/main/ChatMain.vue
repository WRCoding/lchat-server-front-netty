<template>
  <a-col flex="auto" class="mainContainer" style="">
    <div class="mainBox">
      <main-title/>
      <main-single-chat/>
      <main-send/>
    </div>

  </a-col>
</template>

<script>
import mainTitle from "@/components/main/components/MainTitle";
import mainSingleChat from "@/components/main/components/MainSingleChat";
import mainSend from "@/components/main/components/MainSend";
export default {
  name: "ChatMain",
  components: {
    mainTitle,
    mainSingleChat,
    mainSend
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

.mainContainer {
  background-color: rgb(243, 243, 243);
  height: 100%
}

.mainBox {
  display: flex;
  flex-direction: column;
  height: 100%
}






.text-left {
  font-weight: bold;
  border: 1px solid rgb(240, 240, 240);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  padding: 10px 10px;
  margin-left: 10px;
  display: inline-block;
  word-wrap: break-word;
  max-width: 230px;
  position: relative;
}

.text-left::after {
  content: ' ';
  display: inline-block;
  border: 6px solid transparent;
  border-right-color: rgb(255, 255, 255);
  position: absolute;
  top: 6px;
  left: -12px;
}

.text-right {
  font-weight: bold;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  padding: 10px 10px;
  background-color: rgb(152, 225, 101);
  margin-right: 10px;
  display: inline-block;
  word-wrap: break-word;
  max-width: 230px;
  position: relative;

}

.chat-img {
  border-radius: 5px;
  display: inline-block;
  margin-left: 10px;
  width: 100px;
  height: 200px;
}

.text-right::after {
  white-space: pre-line;
  content: ' ';
  display: inline-block;
  border: solid 6px red;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-left-color: rgb(152, 225, 101);
  position: absolute;
  top: 6px;
  right: -12px;
}

</style>