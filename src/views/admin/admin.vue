<template>
  <div>
    <head-bar></head-bar>
    <nav-bar :titles="admin_title"></nav-bar>  
    <aAlbum v-show="this.$route.params.title == 'album'" :data="album_data"></aAlbum>
    <aUser v-show="this.$route.params.title == 'user'" :data="user_data"></aUser>
    <!-- <aUser v-show="this.$route.params.title == 'comment'" :data="user_data"></aUser> -->
    <aComment v-show="this.$route.params.title == 'comment'" :data2="comment_data"></aComment>

    <!-- <a-banner v-show="this.$route.params.title == '/banner'" :data="data.banner"></a-banner> -->
    <div id="adminBG" v-if="login">
      <div>
        <input type="password" v-model="password">
        <button @click="adminLogin">验证</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import NavBar from "@c/common/nav-bar"
import HeadBar from "@c/common/head-bar"
import aAlbum from "@v/admin/a_album"
import aUser from "@v/admin/a_user"
import aComment from "@v/admin/a_comment"
import aBanner from "@v/admin/a_banner"
export default {
  data(){
    return{
      admin_title:[
        {item:'全部相册',title:'album'},
        {item:'全部用户',title:'user'},
        {item:'全部评论',title:'comment'},
        // {item:'轮播数据',title:'/banner'},
      ],
      user_data:'',
      album_data:'',
      comment_data:'',
      login:true,
      password:'',
      xx:''
    }
  },
  components: {
    HeadBar,NavBar,aAlbum,aUser,aBanner,aComment
  },
  methods:{
    adminLogin(){
      this.axios.post('admin',{password:this.password})
      .then(res=>{
        this.user_data = res.data.user_data
        this.album_data = res.data.album_data
        this.comment_data = res.data.comment_data
        console.log(res.data.comment_data);
        console.log(res.data.album_data);
        
        this.login = false
        this.xx = this.$route.params.title        
      })
    }
  },
  beforeUpdate(){
    this.xx = this.$route.params.title
    
  }
}
</script>

<style lang="less">
#adminBG{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 999;
  div{
    background-color: #fff;
    color: #000;
    position: fixed;
    z-index: 1000;
    top: 48%;
    left: 48%;

  }
}
</style>