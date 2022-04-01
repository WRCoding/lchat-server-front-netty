<template>
  <div class="sideContainer">
    <a-avatar shape="square" size="large"
              :src="user.avatar"
              style="margin-top: 55px" @click="showUserInfo()"/>

    <div class="options" v-bind:class="{'options-click': currentOption === 'session'}" style="width: 30px;height: 30px; margin-top: 40px;" @click="triggerOption('session')">
      会话
    </div>

    <div class="options" v-bind:class="{'options-click': currentOption === 'friends'}" style="width: 30px;height: 30px; margin-top: 20px;" @click="triggerOption('friends')">
      好友
    </div>

    <div class="options" v-bind:class="{'options-click': currentOption === 'group'}" style="width: 30px;height: 30px; margin-top: 20px;" @click="triggerOption('group')">
      群聊
    </div>

    <!--个人信息-->
    <a-drawer
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onClose"
    >
      <template slot="title">
        <span><b>个人信息</b></span>
        <span class="logoutBtn" @click="logout()"><a-icon type="logout"/>退出登录</span>
      </template>
      <a-card hoverable style="width: 100%;">
        <img
            slot="cover"
            alt="example"
            :src="user.background"
            height="200px"
            width="200px"
            @click="showModal('backGround')"
        />
        <a-card-meta>
          <template slot="title">
            <span v-if="!isEditName" @click="getEditName()">{{ user.userName }}</span>
            <span v-if="isEditName"><a-input
                v-model="name"
                placeholder=""
                :max-length="25"
                v-if="isEditName"
                auto-focus
                @pressEnter="removeEditName()"
            /></span>
          </template>
          <template slot="description">
              <span v-if="user.description == null && !isEditDesc" style="color: rgb(165, 194, 97)"
                    @click="getEditDesc()">编辑个性签名</span>
            <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
                <span v-if="desc" slot="title" class="numeric-input-title">
                  {{ desc }}
                </span>
              <a-input
                  v-model="desc"
                  placeholder="个性签名"
                  :max-length="25"
                  v-if="isEditDesc"
                  auto-focus
                  @pressEnter="removeEditDesc()"
              />
            </a-tooltip>
            <!--              <span v-if="isEditDesc" @change="removeEdit()"><a-input placeholder="个性签名"/></span>-->
            <span v-if="user.description != null && !isEditDesc"
                  @click="getEditDesc()">{{ user.description }}</span>
          </template>
          <a-avatar
              slot="avatar"
              :src="user.avatar"
              @click="showModal('avatar')"
          />
        </a-card-meta>
      </a-card>
      <a-result>
        <template slot="title">
          <span>你已经加入{{ user.days }}天</span>
        </template>
        <template #icon>
          <a-icon type="smile" theme="twoTone"/>
        </template>
        <template #extra>
        </template>
      </a-result>
    </a-drawer>
    <a-modal v-model="openModel" :title="modalTitle" :footer="null">
      <a-tooltip placement="left">
        <template slot="title">
          <span>点击上传{{ flag ? '背景图' : '头像' }}</span>
        </template>
        <div class="modal-div">
          <a-input type="file" id="upload" style="display:none;" accept="image/gif,image/jpeg,image/png,image/jpg"
                   @change="freshImg"/>
          <img
              :class="{'modal-background' : flag,'modal-avatar' : !flag}"
              alt="example"
              :src="imageUrl"
              height="100%"
              width="100%"
              @click="openFile()"
          />
        </div>
      </a-tooltip>
    </a-modal>

  </div>
</template>

<script>
import {eventBus} from "@/main";
import user from '@/js/User'

export default {
  name: "ChatLeft",
  data(){
    return{
      currentOption: 'session',
      visible: false,
      isEditName: false,
      isEditDesc: false,
      desc: '',
      name: '',
      modalTitle: '',
      openModel: false,
      flag: true, //判断modal的圆角是background还是avatar,true为background
      imageUrl: '',
    }
  },
  created() {
    eventBus.$on('toChatSide',(value) =>{
      this.currentOption = 'session'
      eventBus.$emit('toChatList',value)
    })
  },
  methods: {
    //触发选项
    triggerOption(value){
      this.currentOption = value
      //更换至会话，好友或者群聊选项
      eventBus.$emit('changeOption',value)
      console.log(value)
    },
    showUserInfo() {
      this.visible = true
    },
    onClose() {
      this.visible = false;
      this.isEditDesc = false;
      this.isEditName = false
    },
    logout() {
      // ipcRenderer.send('logout', this.userInfo.lcid)
      // ipcRenderer.on('successLogout', (() => {
      //   this.$router.push('/')
      //   this.$store.commit('deleteInfo')
      // }))
    },
    showModal(flag) {
      console.log(flag)
      if (flag === 'backGround') {
        this.imageUrl = this.user.background
        this.modalTitle = '上传背景图'
        this.flag = true
      } else if (flag === 'avatar') {
        this.imageUrl = this.user.avatar
        this.modalTitle = '上传头像'
        this.flag = false
      }
      this.openModel = true
    },
    getEditName() {
      this.name = this.user.userName
      this.isEditName = true
    },
    removeEditName() {
      this.isEditName = false;
      if (this.name !== this.user.userName) {
        this.user.userName = this.name
        this.updateInfo()
      }
      this.name = ''
    },
    getEditDesc() {
      this.desc = this.user.description
      this.isEditDesc = true;
    },
    removeEditDesc() {
      this.isEditDesc = false;
      if (this.desc !== this.user.description) {
        this.user.description = this.desc
        this.updateInfo()
      }
      this.desc = ''
    },
    updateInfo() {
      let formData = new FormData()
      formData.append('lid', this.user.lid)
      formData.append('name', this.user.userName)
      formData.append('desc', this.user.description)
      user.update(formData).then(response => {
        let result = response.data
        if (result.code === 200) {
          this.$message.success('更新成功');
          let newInfo = result.data
          console.log('newInfo: ',newInfo)
          this.$store.commit('setUser',newInfo)
        }
      })
    },
    openFile() {
      document.getElementById('upload').click()
    },
    freshImg(e) {
      let _this = this;
      _this.imgObj = e.target.files['0'];               //得到上传的第一个文件
      console.log(e.target.files['0'])
      let fr = new FileReader();                        //异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
      fr.onload = function () {
        _this.imageUrl = fr.result;                       // 图片文件赋值给图片标签路径
      }
      fr.readAsDataURL(_this.imgObj);                   //将读取到的文件编码成Data URL
      let formData = new FormData()
      formData.append('file', _this.imgObj)
      formData.append('lid', this.user.lid)
      formData.append('flag', this.flag)
      user.uploadFile(formData).then(response => {
        let result = response.data
        if (result.code === 200) {
          let newInfo = result.data
          console.log('newInfo: ',newInfo)
          this.$store.commit('setUser',newInfo)
        }
      })
    },
  },
  beforeDestroy() {
    eventBus.$off('toChat')
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  }
}
</script>

<style>

.sideContainer {
  width: 65px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(222, 221, 221);
  -webkit-app-region: drag
}

.options:hover{
  cursor: pointer;
  user-select: none;
  color: rgb(87, 190, 106);
}

.options-click{
  color: rgb(87, 190, 106);
}

.modal-div {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.modal-avatar {
  border-radius: 50%;
  cursor: pointer;
}

.modal-background {
  border-radius: 10%;
  cursor: pointer;
}
.logoutBtn {
  cursor: pointer;
  margin-left: 24%;
  color: rgb(255, 77, 79)
}

</style>