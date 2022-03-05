<template>
  <a-col flex="260px" class="listContainer">
    <div class="listSearchBox">
      <a-input-search placeholder="搜索" style="width: 200px"/>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="addUser">
            <a-icon type="user-add"/>
            添加好友
          </a-menu-item>
          <a-menu-item key="addGroup">
            <a-icon type="usergroup-add"/>
            创建群聊
          </a-menu-item>
        </a-menu>
        <a-button size="small" style="background-color: rgb(226, 226, 226);margin-left: 10px" icon="plus"/>
      </a-dropdown>
    </div>
    <div class="listSessionBox">
      <!--会话列表-->
      <div class="listSessionCard">
        <div class="listSessionAvatar">
          <a-avatar shape="square" :size="40"
                    src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
        </div>
        <div class="listSessionInfo">
          <div style="width: 100%;height: 50%;display: flex;align-items: center;">
            <div class="listSessionInfo-name">
              <div>win</div>
            </div>
            <div style="width:40%;"></div>
            <div class="listSessionInfo-time">00:18</div>
          </div>
          <div class="listSessionInfo-text">
            <div>Linux</div>
          </div>
        </div>
      </div>
    </div>
  </a-col>
</template>

<script>
export default {
  name: "ChatList"
}
</script>

<style scoped>
.listContainer {
  height: 100%;
  border-right: 1px solid rgb(224, 224, 224)
}

.listSearchBox {
  background-color: rgb(247, 247, 247);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag
}

.listSessionBox {
  background-color: rgb(247, 247, 247);
  height: 100%;
  overflow-y: auto;
}

.listSessionCard {
  width: 100%;
  height: 60px;
  background-color: rgb(247, 247, 247);
  display: flex;
  align-items: center;
  justify-content: center
}

.listSessionAvatar {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.listSessionInfo {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column
}
.listSessionInfo-text{
  width: 100%;height: 50%;display: flex;justify-content: flex-start;margin-left: 3px
}


.listSessionInfo-name{
  width:40%;font-size: 14px;font-weight:bolder;display:flex;justify-content: flex-start;margin-left: 3px
}

.listSessionInfo-time{
  width:20%;font-size: 13px;font-weight:lighter;color: rgb(172, 172, 172)
}
</style>