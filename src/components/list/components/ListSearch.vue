<template>
  <div class="listSearchBox">
    <a-input-search placeholder="搜索" style="width: 200px"/>
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
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
    <!--添加好友的modal    -->
    <a-modal v-model="addUserVisible" :footer="null" centered>
      <a-input
          v-model="key"
          placeholder="名称或者ID"
          style="width: 200px"
          @change="searchUser()"
      >
      </a-input>
      <a-card style="margin-top: 7px;overflow-y: auto;max-height: 430px">
        <a-list item-layout="horizontal" :data-source="searchUserList">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" @click="addFriend(item.lid)">
              <a-icon type="user-add"/>
            </a>
            <a-list-item-meta
                :description=item.description
            >
              <a slot="title">{{ item.userName }}</a>
              <a-avatar
                  slot="avatar"
                  :src=item.avatar
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
import user from "@/js/User";
import {eventBus} from "@/main";
export default {
  name: "ListSearch",
  data(){
    return{
      currentLid: this.$store.getters.getUser.lid,
      addUserVisible: false,
      key: '',
      searchUserList: []
    }
  },
  methods: {
    //打开搜索modal
    handleMenuClick(data){
      if (data.key === 'addUser') {
        this.addUserVisible = true
      }
    },
    //搜索用户
    searchUser() {
      let key = this.key.trim()
      if (key.length === 0) {
        this.searchUserList = []
      }
      if (key.length > 0) {
        user.search(this.key).then((response) => {
          if (response.data.code === 200) {
            console.log(response.data)
            this.searchUserList = response.data.data
          }
        })
      }
    },
    //添加好友
    addFriend(data){
      let param = {"lid":this.currentLid,"friendLid":data}
      user.addFriend(param).then(response => {
        let friends = response.data.data
        console.log('addFriend: ',friends)
        let newFriend = friends.filter(friend => {
          return friend.lid === data
        })
        eventBus.$emit('newFriend',newFriend)
        //todo 更新本地好友数据库
      })
    }
  }
}
</script>

<style>
.listSearchBox {
  background-color: rgb(247, 247, 247);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag
}
</style>