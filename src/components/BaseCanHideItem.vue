<template>
  <div class="can-hide-item" :class="{hide: !show, searchItem: !hideSearch}">
    <div class="item-top">
      <div class="item-title">
        {{ label }}
      </div>
      <div class="show-hide-icon" @click="show = !show"></div>
    </div>
    <transition name="fade">
      <div class="content" v-show="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    hideSearch: {
      type: Boolean,
      default: false,
    },
    defaultShow: {
      type: Boolean,
      default: true,
    },
  },
  name: "BaseCanHideItem",
  data() {
    return {
      show: this.defaultShow,
    }
  },
  // beforeMount() {
  //   this.show = this.defaultShow;
  // }
}
</script>
<style scoped lang="scss">
.item-top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin-right: 7px;
  font-size: 18px;
  line-height: 22px;
}

.item-title {
  margin-right: 11px;
}
.show-hide-icon {
  cursor: pointer;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border-left: 9px solid white;
  border-right: 9px solid white;
  border-top: 9px solid #D9D9D9;
  transition: all linear 0.5s;
}

.content {

  overflow: hidden;
  //background: red;
  height: max-content;
  margin-bottom: 40px;
}

.hide {
  .show-hide-icon {
    transform: rotate(-90deg);
  }

}

//.hideContent {
//  animation: hideAnimation 1s ease 0s  forwards;
//  //width: 0;
//}
//@keyframes hideAnimation {
//  0% {
//    height: max-content;
//  }
//  100% {
//    height: 0;
//  }
//}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
