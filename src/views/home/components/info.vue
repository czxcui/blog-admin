<template>
  <div class="info">
    <div class="info-author">
      <el-image class="info-img" :src="url" fit="fit" />
      <div class="info-author-content">
        <div class="info-author-name">崔老爷 <sicon type="edit" color="rgb(136, 134, 134)"/></div>
        <div class="info-author-sign">前进！同志!</div>
      </div>
    </div>
    <div class="info-gits">
      <a href="https://github.com/czxcui" target="_blank"
        ><sicon type="github" size="50"
      /></a>

      <a href="https://gitee.com/cui122411" target="_blank"
        ><sicon type="gitee" size="50"
      /></a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const url = new URL("../../../assets/image/3.jpg", import.meta.url).href;
import lottie from 'lottie-web'
</script>

<style lang="less" scoped>
.info {
  // box-sizing: content-box;
  padding: 10px;
  width: 270px;
  background-color: white;
  height: 240px;
  box-shadow: 1px 1px 4px 1px rgb(233, 228, 228);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  margin-right: 16px;
  .info-author {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    .info-img {
      border-radius: 50%;
      height: 100px;
      width: 100px;
      border: 1px solid rgb(177, 171, 171);
      margin-right: 5px;
    }

    .info-author-content {
      width: 50%;

      .info-author-name {
        color: #475c6e;
        font-size: 25px;
        margin-bottom: 5px;
      }
      .info-author-sign {
        font-size: 15px;
      }
    }
  }
  .info-gits {
    display: flex;
    justify-content: space-evenly;
    a {
      color: black;
    }
  }
}
</style>