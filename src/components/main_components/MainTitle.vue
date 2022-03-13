<template>
  <!--标题区-->
  <div class="mainTitleBox">
    <div class="mainTitleName">
      <div style="font-size: 18px">ink</div>
    </div>
    <div style="width:65%;"></div>
    <div class="mainTitleOperation">
      <a-icon type="ellipsis" @click="showDrawer"/>
    </div>
    <a-drawer
        title="Basic Drawer"
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: "MainTitle",
  data() {
    return {
      visible: false,
      user: {}
    }
  },
  created() {
    this.user = this.$store.getters.getUser
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
}
</script>

<style>
.mainTitleBox {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(224, 224, 224);
  -webkit-app-region: drag
}

.mainTitleName {
  width: 30%;
  font-size: 14px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px
}

.mainTitleOperation {
  width: 5%;
  font-size: 28px;
  margin-right: 3px
}

</style>