<template>
  <!-- 聊天区-->
  <div class="mainChatBox">
    <!-- 每一块聊天记录-->
    <div class="mainChatCard" >
      <!--时间div-->
      <div style="margin-bottom: 4px">
        <p style="color: rgb(170, 170, 170)">00:77</p>
      </div>
      <!-- 信息div-->
      <div style="display: flex;padding: 4px;margin-left: 10px">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
        <span style="display: flex;flex-direction: column;align-items: flex-start">
                  <p style="color: rgb(170, 170, 170);margin: 0 0 0 14px;">ink</p>
                  <p class="text-left">ink</p>
                </span>
      </div>
    </div>
    <!--   -->
    <div style="display: flex;flex-direction: column;margin-top: 7px">
      <!--时间div-->
      <div style="margin-bottom: 4px">
        <p style="color: rgb(170, 170, 170)">00:77</p>
      </div>
      <!-- 信息div-->
      <div style="display: flex;padding: 4px;margin-left: 10px">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
        <span style="display: flex;flex-direction: column;align-items: flex-start">
                  <p style="margin: 0 0 0 14px;color: rgb(170, 170, 170)">ink</p>
                  <img src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"
                       class="chatRecord-left-img">
                </span>
      </div>
    </div>

    <div style="display: flex;flex-direction: column;margin-top: 7px">
      <!--时间div-->
      <div style="margin-bottom: 4px">
        <p style="color: rgb(170, 170, 170)">00:77</p>
      </div>
      <!-- 信息div-->
      <div style="display: flex;padding: 4px;margin-left: 10px;flex-direction: row-reverse">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
        <span style="display: flex;flex-direction: column;">
                  <p class="text-right">ink</p>
                </span>
      </div>
    </div>

    <div style="display: flex;flex-direction: column;margin-top: 7px">
      <!--时间div-->
      <div style="margin-bottom: 4px">
        <p style="color: rgb(170, 170, 170)">00:77</p>
      </div>
      <!-- 信息div-->
      <div style="display: flex;padding: 4px;margin-left: 10px;flex-direction: row-reverse">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
        <span style="display: flex;flex-direction: column;">
                  <p class="text-right">ink</p>
                </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainChat"
}
</script>

<style>
.mainChatBox {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 243, 243);
  border-bottom: 1px solid rgb(224, 224, 224);
  overflow-y: auto
}

.mainChatCard {
  display: flex;
  flex-direction: column;
  margin-top: 7px
}
</style>