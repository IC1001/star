<template>
  <div id="app">
    <router-view/>
    <backTop></backTop>
  </div>
</template>
<script>
import BackTop from '@c/common/backTop.vue'
export default {
  components:{
    BackTop
  }
}
</script>
<style lang="less">
#app{
  min-width: 1300px;
}
body{
  background-color: rgb(250, 250, 250);
  margin:0;
}
.beian {
  height: 40px;
  width: 68%;
  margin: auto;
  margin-top: 10px;
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  a{
    text-decoration:none;
    line-height: 40px;
  }
  img{
    line-height: 40px;
  }
}

@media screen and (min-width:0px) and (max-width:530px){
  #app{
   min-width: 300px;
   font-size: 12px;

  }
}
</style>
