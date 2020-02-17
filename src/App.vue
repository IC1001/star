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
@media screen and (min-width:0px) and (max-width:530px){
  #app{
   min-width: 300px;
   font-size: 12px;

  }
}
</style>
