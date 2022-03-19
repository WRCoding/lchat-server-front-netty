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
      <div ref="areatext" contenteditable="true" class="area-text">
        sadasdasd
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "MainSend"
}
</script>

<style>
.area-text {
  padding: 10px;
  border: solid 0;
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: rgb(245, 245, 245);
  resize: none;
  outline: none;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
}
.sendBox{
  width: 100%;
  height: 150px
}
</style>