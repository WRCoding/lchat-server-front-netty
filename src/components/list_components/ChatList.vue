<template>
  <a-col flex="260px" class="listContainer">
    <list-search/>
    <list-session/>
  </a-col>
</template>

<script>
import listSearch from "@/components/list_components/ListSearch";
import listSession from "@/components/list_components/ListSession";
export default {
  name: "ChatList",
  components: {
    listSearch,
    listSession
  }
}
</script>

<style>
.listContainer {
  height: 100%;
  border-right: 1px solid rgb(224, 224, 224)
}
</style>