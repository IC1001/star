<template>
  <div id="detail">
    <head-bar></head-bar>
    <album :img="img"></album>
  </div>
</template>

<script>
import ShowItem from "@c/content/show-item"
import HeadBar from "@c/common/head-bar"
import NavBar from "@c/common/nav-bar"
import album from "@c/content/album"
export default {
  name: 'detail',
  data(){
    return{
      img:this.$store.state.detail_data
    }
  },
  components: {
    HeadBar,NavBar,ShowItem,album
  },
  created(){
      this.axios.post('detail',{id:this.$route.query.id})
      .then(res=>{

        this.$store.commit('setDetailData',res.data)   
        this.img = this.$store.state.detail_data  
        console.log(this.img);
                   
      })
      .catch(function (err){
        console.log(err);              
      })
  }
}
</script>

<style>
#detail{
  width: 100%;
  min-width: 100%;
  height:1080px;

  /* min-width: 990px; */
  background-color: rgba(10,10,10,0.7);
  position: fixed;
  left: 0;
}
  /* @media screen and (min-width:0px) and (max-width:530px){
    #detail{
      width: 310px;
      height: 260px;
      margin-left:auto;
      margin-right:auto;
    }
  } */
</style>