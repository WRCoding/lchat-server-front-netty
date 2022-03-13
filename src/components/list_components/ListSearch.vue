<template>
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
</template>

<script>
export default {
  name: "ListSearch"
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