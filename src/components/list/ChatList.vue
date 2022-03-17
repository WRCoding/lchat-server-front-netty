<template>
  <a-col flex="260px" class="listContainer">
    <list-search/>
    <list-session v-if="currentOption === 'session' "/>
    <list-friends v-if="currentOption === 'friends' "/>
  </a-col>
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
  }
}
</script>

<style>
.listContainer {
  height: 100%;
  border-right: 1px solid rgb(224, 224, 224)
}
</style>