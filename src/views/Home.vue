<template>
  <div class="home">
    <head-bar></head-bar>
    <nav-bar :titles="titles"></nav-bar>
    <slide-img />
    <show-item :showData="hotData"></show-item>
    <div @click="clickUpLoad" class="upload"><i  class="el-icon-upload2"></i>上传图片</div>
    <up-load v-if="isUpload" @closeBar="closeBar"></up-load>
  </div>
</template>

<script>
import HeadBar from "@c/common/head-bar"
import NavBar from "@c/common/nav-bar"
import SlideImg from "@c/content/slide-img"
import ShowItem from "@c/content/show-item"
import UpLoad from "@c/common/upload"
export default {
  name: 'home',
  data(){
    return{
      isUpload:false,
      titles:[
        {title:'风景',cTitles:[
          {ctitle:'自然风光',},{ctitle:'城市街景',},{ctitle:'夜景',}]},
        {title:'人像',cTitles:[
          {ctitle:'写真',},{ctitle:'城市街景',},{ctitle:'夜景',}]},
        {title:'纪实',cTitles:[
          {ctitle:'物语',},{ctitle:'情感',},{ctitle:'专题',}]},
        {title:'生态',cTitles:[
          {ctitle:'动物',},{ctitle:'植物',},{ctitle:'昆虫',}]},
        {title:'艺术',cTitles:[
          {ctitle:'黑白',},{ctitle:'设计',},{ctitle:'视觉',}]},
      ],
    }
  },
  components: {
    HeadBar,NavBar,SlideImg,ShowItem,UpLoad
  },
  computed:{
    hotData(){
      return this.$store.state.index_data
    }
  },
  methods:{
    clickUpLoad(){
      this.isUpload = true
    },
    closeBar(){
      this.isUpload = false
    }
  },
  created(){    
    this.axios.get('/index_data')
    .then(res=>{     
      this.$store.commit('setIndexData',res.data)
      this.hotData = this.$store.state.index_data
      
      
    })
  },

}
</script>

<style lang="less">
.upload{
  width: 50px;
  height: 80px;
  line-height: 25px;
  text-align: center;
  position: fixed;
  right: 0em;
  top: calc(49% - 33px);
  color: white;
  opacity: 0.8;
  font-weight: normal;
  background-color: rgb(40, 40, 40);
  color: white;   
  border-radius: 0.2em;
  font-size: 14px;
  display: flex;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  &:hover{
    font-weight: 600;
    background-color: rgb(100, 100, 100);
  }
}
</style>