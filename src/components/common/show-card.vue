<template>
  <div class="showcard">
    <div class="cover" @click="toDetail"><img v-lazy="baseUrl+show.cover" alt="" class="showimg"></div>
    <div class="cardTitle" @click="toDetail">{{show.album_name}}</div>
    <div class="operation">
      <div class="oItem"><img src="@a/like/view.png" alt="浏览数"><div>{{show.views}}</div></div>
      <div class="oItem">
        <img src="@a/like/liked.png" alt="已点赞"  v-if="islike" @click="cancelLike">
        <img src="@a/like/like.png" alt="点赞" v-else @click="likeThis">
        
        <div :class="{red_font:islike}">{{show.likes}}</div>
      </div>
      <div class="oItem">
        <img src="@a/like/collected.png" alt="已收藏" v-if="iscollect" @click="cancelCollect">
        <img src="@a/like/collect.png" alt="收藏" v-else @click="collectThis">
      </div>
    </div>
    <div class="userInfo">
      <div class="who" @click="toZone">
        <img src="@a/icon/user.png" v-if="!show.portrait" >
        <img v-lazy="avatarUrl+show.portrait" alt="" v-else>
        {{show.user_name}}
      </div>
      <div>{{show.date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'show-card',
  data(){
    return{
      username:'',
      baseUrl:'/album/',
      avatarUrl:'/portrait/',
      islike:false,
      iscollect:false,
      like_album:'',
      collect_album:''
    }
  },
  computed:{
  },
  props:{
    show:{
      default(){

      }
    }
  },
  methods:{
    toDetail(){
      this.show.views ++
      let routeUrl = this.$router.resolve({path:'/detail' , query:{id:this.show.album_id}})
      window.open(routeUrl.href,'_blank')
    },
    toZone(){      
      let routeUrl = this.$router.resolve({path:'/zone' , query:{user:this.show.user_name}})
      window.open(routeUrl.href,'_blank')
    },
    likeThis(){
      this.islike = true
      this.show.likes ++
      this.axios.post('setLike',{album_id:this.show.album_id,islike:this.islike})
      .then(res=>{
      this.islike = true
      })
    },
    cancelLike(){
      this.islike = false
      this.show.likes --
      this.axios.post('setLike',{album_id:this.show.album_id,islike:this.islike})
      .then(res=>{
        this.islike = false
      })
    },
    collectThis(){
      this.iscollect = true
      this.show.collect ++
      this.axios.post('setCollect',{album_id:this.show.album_id,iscollect:this.iscollect})
      .then(res=>{
        this.iscollect = true
      })
    },  
    cancelCollect(){
      this.iscollect = false
      this.show.collect --
      this.axios.post('setCollect',{album_id:this.show.album_id,iscollect:this.iscollect})
      .then(res=>{
        this.iscollect = false
      })
    },  
  },
  beforeUpdate(){
    if(localStorage.token){ 
      setTimeout(()=>{
        if(this.$store.state.zoneData.like_album){
          if(this.$store.state.zoneData.like_album.split(',').indexOf(String(this.show.album_id))!==-1){
            this.islike = true        
          }
          if(this.$store.state.zoneData.collect_album.split(',').indexOf(String(this.show.album_id))!==-1){
            this.iscollect = true
          }
        }
      },120)

    } 
  },
  mounted(){  
    
    if(localStorage.token){ 
      setTimeout(()=>{
        if(this.$store.state.zoneData.like_album){
          if(this.$store.state.zoneData.like_album.split(',').indexOf(String(this.show.album_id))!==-1){
            this.islike = true        
          }
          if(this.$store.state.zoneData.collect_album.split(',').indexOf(String(this.show.album_id))!==-1){
            this.iscollect = true
          }
        }
      },200)

    }
  }
}
</script>

<style lang="less">
.showcard{
  width: 220px;
  background-color: white;
  height: 240px;
  border-radius: 0.5rem;
  box-shadow: 0 3px 10px 1px rgba(97, 97, 97, 0.1);
  margin-top: 16px;
  margin-right: 16px;
  .red_font{
    color: #FF3030;
  }
  .cover{
    width: 100%;
    height: 50%;
    position: relative;
        // padding: 1px;
    cursor: pointer;
    margin:auto;
    .showimg{
      width: 100%;
      height: 100%;
      //竖图截取
      object-fit:cover;
      object-position: 0 0;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
  }
  }
  .cardTitle{
    margin: 9px 0px 0 6px;
  }
  .operation{
    display: flex;
    justify-content: space-between;
    margin: 9px 6px 0 6px;
    .oItem{
      display: flex;
      align-items: center;
      color: #8a8a8a;
      opacity: 0.8;
      div{
        width: 6px;
      }
      img{
        width: 25px;
        height: 100%;
        padding-right: 4px;
        cursor: pointer;
      }
    }
    

  }
  .userInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 9px 6px 0 6px;
    padding-top: 9px;
    border-top: rgba(100, 100, 100, 0.1) solid 1px;
    font-size: 14px;
    color: #8a8a8a;
    .who{
      display: flex;
      align-items: center;
      img{
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

}
  @media screen and (min-width:0px) and (max-width:530px){
    .showcard{
      width: 310px;
      height: 260px;
      margin-left:auto;
      margin-right:auto;
    }
  }
</style>