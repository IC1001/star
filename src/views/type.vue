<template>
  <div>
    <head-bar></head-bar>
    <nav-bar :titles="titles"></nav-bar>
    <show-item :showData="typeData"><div slot="title">{{title}}</div></show-item>
    <up-load v-if="isUpload" @closeBar="closeBar"></up-load>
  </div>
</template>

<script>
import ShowItem from "@c/content/show-item"
import HeadBar from "@c/common/head-bar"
import NavBar from "@c/common/nav-bar"
import UpLoad from "@c/common/upload"
export default {
  name: 'type',
  data(){
    return{
      isUpload:false,
      titles:[
        {title:'首页'},
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
      temp:{}
    }
  },
  components: {
    HeadBar,NavBar,ShowItem,UpLoad
  },
  computed:{
    typeData(){
      return this.$store.state.type_data
    },
    title(){
      return this.$route.params.title
    }
  },
  methods:{
    clickUpLoad(){
      this.isUpload = true
    },
    closeBar(){
      this.isUpload = false
    },
  },
  created() {
    let title = this.$route.params.title
    this.axios.post('/type'+title,{title:title})
    .then(res=>{          
      this.$store.commit('setTypeData',res.data)
      this.mark = index
    })
  }

}
</script>

<style>

</style>