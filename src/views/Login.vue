<template>
  <div style="width: 100%;height: 100%;  -webkit-app-region: drag;display: flex;flex-direction: column">
    <div style="width: 100%;height: 30px;"></div>
    <div style="width: 100%;height: 50%;display: flex;justify-content: center;align-items: center">
      <a-avatar :size="120" icon="user"/>
    </div>
    <div
        style="width: 100%;height: 50%;display: flex;flex-direction: column;align-items: center">
      <a-input placeholder="账号" v-model="userName" style="width: 170px;"/>
      <a-input placeholder="密码" v-model="passWord" style="width: 170px;margin-top: 17px">
        <a-icon slot="suffix" type="right-circle" @click="login()"/>
      </a-input>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import user from '@/js/User'
import MessageCodec from "@/js/MessageCodec";
import SystemMessage from "@/js/tcpMessage/SystemMessage";
import Message from "@/js/tcpMessage/Message";
import SocketUtil from "@/js/SocketUtil";
export default {
  name: "Login",
  data() {
    return {
      userName: 'xw',
      passWord: '123456'
    }
  },
  methods: {
    login() {
      console.log('登录: ', this.userName, this.passWord)
      user.login({userName: this.userName, passWord: this.passWord}).then(response => {
        console.log('login response: ', response.data)
        let value = response.data
        if (value.code === 200) {
          let user = value.data
          this.$store.commit('setUser', user)
          let message = new SystemMessage(6,user.lid,'server')
          SocketUtil.send(MessageCodec.encode(message))
          ipcRenderer.send('login','data')
          ipcRenderer.on('success', ((event, arg) => {
            this.$router.push('/index')
          }))
        }
      })

    }
  }
}
</script>

<style scoped>

</style>