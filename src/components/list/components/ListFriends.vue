<template>
  <div class="listFriendsBox">
    <!--会话列表-->
    <div class="listFriendsCard">
      <div class="listFriendsAvatar">
        <a-avatar shape="square" :size="40"
                  src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"/>
      </div>
      <div class="listFriendsInfo">
        <div style="width: 100%;height: 100%;display: flex;align-items: center;">
          <div class="listFriendsInfo-name">
            <div>🍪</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListFriends"
}
</script>

<style>
.listFriendsBox {
  background-color: rgb(247, 247, 247);
  height: 100%;
  overflow-y: auto;
}

.listFriendsCard {
  width: 100%;
  height: 60px;
  background-color: rgb(247, 247, 247);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.listFriendsAvatar {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.listFriendsInfo {
  width: 80%;
  height: 100%;
  display: flex;
}


.listFriendsInfo-name {
  width: 40%;
  font-size: 20px;
  /*font-weight: bolder;*/
  display: flex;
  justify-content: flex-start;
  margin-left: 3px;
}

</style>