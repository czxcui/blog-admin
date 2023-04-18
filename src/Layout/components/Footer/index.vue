<template>
  <div class="footer-box">
    <span>2023 @ Cuiyaoye</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer-box {
 
  width: 98%;
  text-align: center;
  margin: 10px 0;

  
  span {

    width: 80px;
    font-size: 13px;
    color: #a7a3a3;
    white-space: normal;
    vertical-align: middle;
  }
  span::before {
    margin-right: 25px;

    vertical-align: middle;
    display: inline-block;
    content: " ";
    height: 1px;
    width: 35%;
    background-color: #dcdfe6;
  
  }
  span::after {
 
    margin-left: 25px;
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 1px;
    width: 35%;
    background-color: #dcdfe6;
    
  }
}
</style>