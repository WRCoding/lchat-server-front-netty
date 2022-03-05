<template>
  <a-col flex="65px" class="sideContainer">
    <a-avatar shape="square" size="large"
              src="https://md-img-ink.oss-cn-shenzhen.aliyuncs.com/ink_41b984c89b0b11ec8ba4e674965fd9d8.png"
              style="margin-top: 60px"/>

    <div style="width: 30px;height: 30px;background-color: hotpink; margin-top: 40px;">

    </div>

    <div style="width: 30px;height: 30px;background-color: hotpink; margin-top: 20px;">

    </div>
    <div style="width: 30px;height: 30px;background-color: hotpink; margin-top: 20px;">

    </div>
    <div style="width: 30px;height: 30px;background-color: hotpink; margin-top: 20px;">

    </div>
  </a-col>
</template>

<script>
export default {
  name: "ChatLeft"
}
</script>

<style scoped>

.sideContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(222, 221, 221);
  -webkit-app-region: drag
}

</style>