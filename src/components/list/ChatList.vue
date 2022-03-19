<template>
  <div class="listContainer">
    <list-search/>
    <list-session v-show="currentOption === 'session' "/>
    <list-friends v-show="currentOption === 'friends' "/>
  </div>
</template>

<script>
import listSearch from "@/components/list/components/ListSearch";
import listSession from "@/components/list/components/ListSession";
import listFriends from "@/components/list/components/ListFriends";
import {eventBus} from "@/main";
export default {
  name: "ChatList",
  components: {
    listSearch,
    listSession,
    listFriends
  },
  data(){
    return{
      currentOption: 'session'
    }
  },
  created() {
    eventBus.$on('changeOption',(value) => {
      this.currentOption = value
    })
    eventBus.$on('toChatList', (value) => {
      this.currentOption = 'session'
      eventBus.$emit('toListSession',value)
    })
  }
}
</script>

<style>
.listContainer {
  width: 265px;
  height: 100%;
  border-right: 1px solid rgb(224, 224, 224)
}
</style>