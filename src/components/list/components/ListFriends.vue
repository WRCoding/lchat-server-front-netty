<template>
  <div class="listFriendsBox">
    <!--好友列表-->
    <div v-for="friend in friends" class="listFriendsCard" @click="watchFriend(friend)">
      <div class="listFriendsAvatar">
        <a-avatar shape="square" :size="40"
                  :src="friend.avatar"/>
      </div>
      <div class="listFriendsInfo">
        <div style="width: 100%;height: 100%;display: flex;align-items: center;">
          <div class="listFriendsInfo-name">
            <div>{{friend.userName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/js/User";
import {eventBus} from "@/main";
export default {
  name: "ListFriends",
  data() {
    return {
      user: this.$store.getters.getUser,
      chatDB: this.$store.getters.getDB,
      friends: []
    }
  },
  created() {
    this.getFriends()
  },
  methods: {
    getFriends(){
      user.friends(this.user.lid).then(response => {
        let result = response.data.data
        console.log(result)
        this.friends = result
      })
    },
    watchFriend(value){
      eventBus.$emit('watchFriend',value)
    }
  }
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