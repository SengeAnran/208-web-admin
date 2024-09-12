
<template>
<div class="back-btn" @click="$router.back()">
  <i class="el-icon-arrow-left"></i>
  <span>返回</span>

</div>
</template>
<script>
export default {
  name: "BackBtn"
}
</script>


<style scoped lang="scss">
.back-btn{
  width: 66px;
  //display: inline-block;
  cursor: pointer;
  margin-top: 24px;
  display: flex;
  align-items: center;
  color: #636363;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  span {
    margin-left: 4px;
  }
  &:hover {
    color: #0A9FFD;
  }
}
</style>
