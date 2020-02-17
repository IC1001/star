<template>
  <div id="btS">
    <div id="backTop" v-show="isBackTop" @click="backTop">
      <img src="@a/backTop.png" alt="回到顶部">
      <div>回到顶部</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isBackTop:false
    }
  },
  methods:{
    handleScroll(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      
      if(scrollTop > 1200){
        this.isBackTop = true
        
      }else{
        this.isBackTop = false
      }
    },
    backTop(){
      const backTopTime = setInterval(()=>{

        if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
          document.body.scrollTop -= 50 
          document.documentElement.scrollTop -= 50
        }else{
          clearInterval(backTopTime)
        }
      },1)
      // document.body.scrollTop = 0
      // document.documentElement.scrollTop = 0
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true); 
  }
}
</script>

<style>
#backTop{
  position: fixed;
  bottom: 0;
  right: 20px;
  text-align: center;
}
</style>