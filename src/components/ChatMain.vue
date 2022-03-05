<template>
  <a-col flex="auto" class="mainContainer" style="">
    <div class="mainBox">
      <!--标题区-->
      <div class="mainTitleBox">
        <div class="mainTitleName">
          <div style="font-size: 18px">ink</div>
        </div>
        <div style="width:65%;"></div>
        <div class="mainTitleOperation">
          <a-icon type="ellipsis" @click="showDrawer"/>
        </div>
      </div>
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
                       class="chat-img">
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
      <!-- 发送消息区-->
      <div style="width:100%;height: 200px;background-color: rgb(243, 243, 243);">
        <!--表情,文件 -->
        <div style="width: 100%;height: 50px;display: flex;align-items: flex-start">
          <a-icon type="smile" style="font-size: 23px;padding: 17px"/>
          <a-icon type="folder" style="font-size: 23px;padding: 17px"/>
        </div>
        <!--发送区 -->
        <div style="width: 100%;height: 150px;">

        </div>
      </div>
    </div>
    <a-drawer
        title="Basic Drawer"
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </a-col>
</template>

<script>
export default {
  name: "ChatMain",
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
}
</script>

<style scoped>

.mainContainer {
  background-color: rgb(243, 243, 243);
  height: 100%
}

.mainBox {
  display: flex;
  flex-direction: column;
  height: 100%
}

.mainTitleBox {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(224, 224, 224);
  -webkit-app-region: drag
}

.mainTitleName {
  width: 30%;
  font-size: 14px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px
}

.mainTitleOperation {
  width: 5%;
  font-size: 28px;
  margin-right: 3px
}

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