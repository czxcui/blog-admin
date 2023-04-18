<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left" ref="leftImgAnim">
        <img src="@/assets/image/img2.png" class="people" alt="people" />
        <img src="@/assets/image/img1.png" class="sphere" alt="sphere" />
      </div>
      <div class="login-right">
       
        <LoginForm />
    
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import LoginForm from "./components/LoginForm.vue";

let leftImgAnim = ref(null);

//挂载左边图片的上下移动
let mountAnimClass = () => {
  leftImgAnim.value.childNodes.forEach((element) => {
    if (/sphere/.test(element.className)) {
      element.classList.add("s-other-animtion");
    } else {
      element.classList.add("p-other-animtion");
    }
  });
};
onMounted(() => {
  mountAnimClass();
});
</script>

<style lang="less" scoped>
@import "./style/index.less";
</style>