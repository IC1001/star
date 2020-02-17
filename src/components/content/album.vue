<template>
  <div id="album">
    <div class="shower">
      <div >
        <div class="rr">{{img.album_name}} ({{currentIndex+1}}/{{img.length}})</div> 
        <div style="display:flex;">
          <div class="albumLike">
            <img src="@a/like/liked.png" alt="已点赞"  v-if="islike" @click="cancelLike">
            <img src="@a/like/like.png" alt="点赞" v-else @click="likeThis">
            <span :class="{red_font:islike}">{{img.likes}}</span>
            <img src="@a/like/collected.png" alt="已收藏" v-if="iscollect" @click="cancelCollect">
            <img src="@a/like/collect.png" alt="收藏" v-else @click="collectThis">
          </div>
          <div class="album_date">{{img.date}}</div>
        </div>
        <!-- <div class="albumLike">
          <img src="@a/like/liked.png" alt="已点赞"  v-if="islike" @click="cancelLike">
          <img src="@a/like/like.png" alt="点赞" v-else @click="likeThis">
          <span :class="{red_font:islike}">{{img.likes}}</span>
        </div>
        <div class="albumLike">
          <img src="@a/like/collected.png" alt="已收藏" v-if="iscollect" @click="cancelCollect">
          <img src="@a/like/collect.png" alt="收藏" v-else @click="collectThis">
        </div> -->
      </div>
      <div class="showerInfo">
        <img :src="avatarUrl+img.portrait" alt="" style="  border-radius: 50%">
          <div>
            <span>{{img.user_name}}</span>
            <div  v-if="user == img.user_name"></div>
            <div class="follow" v-else @click="setFollow">{{follow_status}}</div>  
          </div>
        </div>
      <!-- <div class="showerInfo">2019-12-21</div> -->
    </div>
    <i class="el-icon-caret-left" id="prev" @click="prevImg"></i>
    <i class="el-icon-caret-right" id="next" @click="nextImg"></i>
    <div class="ablumimg">
      <div v-for="(item,index) in img.img" :key="index"> 
        <transition name="slide">     
          <img :src="baseUrl+item" alt="" v-show="currentIndex===index" 
          @click="changeDisplay(item)" class="img_slide">
        </transition>

        <div class="bottomInfo" v-show="currentIndex===index">
          <span>{{img.img_name[index]}}</span>
          <!-- <div>
            <div class="oIte"><img src="@a/like/like.png" alt="点赞"><div>{{img.likes}}</div></div>
          </div> -->

          <div class="auto_play" @click="auto_play">
            <span v-if="!play"><i class="el-icon-caret-right"></i>滚动播放</span>
            <span v-else><i class="el-icon-d-caret"></i>手动浏览</span>
          </div>
          <div class="imgList" @click="openList">图片列表<div><i class="el-icon-caret-right"></i></div></div>
          <div class="comment" @click="openComment" >
            <div><i class="el-icon-caret-left"></i></div>查看评论
          </div>    
        </div>  

      </div>
    </div>
    <div id="dialog_img"  v-if="isdisplay" >
      <div @click="isdisplay=false">
        <i class="el-icon-circle-close" id="back_i"></i>
      </div>
      <img :src="baseUrl+previewImg" alt="" >
    </div>
    <div id="PC"> 
    <el-drawer
      title="comment"
      :with-header="false"
      :visible.sync="drawer_comment"
      :direction="rtl"
      :modal="false"
      >
      <comment :commentData="img.comment" :img="img"></comment>

    </el-drawer> 
    </div> 
    <div id="mobile">
      <el-drawer
        title="comment"
        :with-header="false"
        :visible.sync="drawer_comment"
        direction="btt"
        :modal="false"
        size='50%'>
        <comment :commentData="img.comment" :img="img"></comment>

      </el-drawer> 
    </div>
    <div id="PC"> 
      <el-drawer
        title="imgList"
        :with-header="false"
        :visible.sync="drawer_list"
        :direction="ltr"
        :modal="false"
        >
        <imgList :imgListData="img" @onPreview="changeDisplay"></imgList>

      </el-drawer>  
    </div>
    <div id="mobile">
      <el-drawer
        title="imgList"
        :with-header="false"
        :visible.sync="drawer_list"
        direction="btt"
        :modal="false"
        size='50%'>
        <imgList :imgListData="img" @onPreview="changeDisplay"></imgList>

      </el-drawer>  
    </div>
  </div>
</template>

<script>
import comment from "@c/content/comment"
import imgList from "@c/content/imgList"
export default {
  name: 'album',
  data(){
    return{
      currentIndex:0,
      isdisplay:false,
      baseUrl:'/album/',
      avatarUrl:'/portrait/',
      islike:false,
      iscollect:false,
      follow_status:'+ 关注Ta',
      user: localStorage.user,
      drawer_comment:false,
      drawer_list:false,
      comment_data:'',
      ltr:'ltr',
      previewImg:'',
      play:false
    }
  }, 
  components:{
    comment,imgList
  },
  props:{
    img:{
      default(){

      }
    }
  },
  methods:{
    prevImg(){
      if(this.currentIndex == 0){
        this.currentIndex = this.img.img.length - 1
      }else{
        this.currentIndex --
      }
    },
    nextImg(){
      if(this.currentIndex+1 < this.img.length ){
        this.currentIndex ++
      }else{
        this.currentIndex = 0
      }
    },
    changeDisplay(item){
      this.isdisplay = true
      this.previewImg = item      
    },
    likeThis(){
      this.islike = true
      this.img.likes ++
      this.axios.post('setLike',{album_id:this.img.album_id,islike:this.islike})
      .then(res=>{
        console.log('success');

      })
    },
    cancelLike(){
      this.islike = false
      this.img.likes --
      this.axios.post('setLike',{album_id:this.img.album_id,islike:this.islike})
      .then(res=>{
        console.log('cancel success');

      })
    },
    collectThis(){
      this.iscollect = true
      this.img.collect ++
      this.axios.post('setCollect',{album_id:this.img.album_id,iscollect:this.iscollect})
      .then(res=>{
        console.log('success');

      })
    },  
    cancelCollect(){
      this.iscollect = false
      this.img.collect --
      this.axios.post('setCollect',{album_id:this.img.album_id,iscollect:this.iscollect})
      .then(res=>{
        console.log('cancel success');

      })
    },  
    setFollow(){
      if(localStorage.token){
        if(this.follow_status == '+ 关注Ta'){
          this.follow_status = '√ 已关注'
          this.axios.post('setFollow',{ 
              login_user: this.$store.state.loginData,
              zone_data: this.img.user,
              follow_status:this.follow_status
            }
          )
          .then(res=>{
            this.img.user.fans ++
          })
        }else{
          this.follow_status = '+ 关注Ta'
          this.axios.post('setFollow',{ 
              login_user:this.$store.state.loginData,
              zone_data: this.img.user,
              follow_status:this.follow_status
            }
          )
          .then(res=>{
            this.img.user.fans --
          })
        }
      }else{
        alert('请先登录')
      }
    },
    openList(){
      this.drawer_list = true
    },
    openComment(){
      this.drawer_comment = true
    },
    auto_play(){
      this.play = !this.play
      var gdbf = setInterval(()=>{
        if(this.play == true){          
          this.nextImg()
        }else{
          clearInterval(gdbf)
        }        
      },3000)
    }
  },
  mounted(){
    if(localStorage.token){
    setTimeout(()=>{      
      //login 
      if(this.$store.state.zoneData.like_album.split(',').indexOf(String(this.img.album_id))!==-1){
        this.islike = true        
      }
      if(this.$store.state.zoneData.collect_album.split(',').indexOf(String(this.img.album_id))!==-1){
        this.iscollect = true
      }
      if(this.$store.state.loginData.id !== this.img.user_id){          
        if(this.$store.state.loginData.followed_user.split(',').indexOf(String(this.img.user_id))!==-1){
          this.follow_status = '√ 已关注'      
        }
      }
    },100) }   
  },
  // beforUpdate(){         
  //   setTimeout(()=>{      
  //     //login 
  //     if(this.$store.state.zoneData.like_album.split(',').indexOf(String(this.img.album_id))!==-1){
  //       this.islike = true        
  //     }
  //     if(this.$store.state.zoneData.collect_album.split(',').indexOf(String(this.img.album_id))!==-1){
  //       this.iscollect = true
  //     }
  //     if(this.$store.state.loginData.id !== this.img.user_id){          
  //       if(this.$store.state.loginData.followed_user.split(',').indexOf(String(this.img.user_id))!==-1){
  //         this.follow_status = '√ 已关注'      
  //       }
  //     }
  //   },100)
  // } 
}
</script>

<style lang="less">
@keyframes slideLeft{
  0% {left: -10%;z-index: -1;}
  100% {left:0; z-index:11;}
}
@keyframes slideRight{
  0% {right: -10%;z-index: -1;}
  100% {right: 0;z-index:11;}
}
@keyframes slideto{
  from{transform: scale(0.1);opacity: 0.5;}
  to {transform: scale(1);opacity: 1;}
}
.slide-enter-active {
  transition: all .5s ease;
}
.slide-enter{
  opacity:0.5;
}
#dialog_img{
  div{
    position: fixed;
    width:100%;
    height:100%;    
    z-index: 9998;
    top: 0;
    left: 0;
    background-color: rgba(10, 10, 10, 0.4);
    cursor: pointer;
    #back_i{
      position: fixed;
      top: 3%;
      right: 3%;
      font-size: 40px;
      color: white;
      opacity: 0.8;
      &:hover{
        opacity: 1;
      }
    }
  }
  img{
    position: fixed;
    width:88%;
    height:88%;    
    z-index: 9999;
    top: 6%;
    left: 6%;
    object-fit: contain;
  }
}
#mobile{
  display: none;
}
#album{

  width: 68%;
  min-width: 68%;
  height: 45em;
  margin:0 auto;
  // min-width: 990px;
  margin-top: 150px;
  position: relative;

  .shower{
    // background-color: rgba(0,0,0,0.1);
    position: absolute;
    // margin-top: -4.2em;
    top: -4.2em;
    color: white;
    width: 100%;
    font-size: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .albumLike{
      margin: 0 0px 0 0px;
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      img{
        width: 15px;
        height: 15px;
        margin-left: 8px;  
        margin-right: 2px;   
        cursor: pointer;   
      }
      .red_font{
        color: #FF3030;
        font-weight: 600;
      }
    }
      .album_date{
        // position: absolute;
        // right: 0;
        // bottom: -2em;
        display: flex;
        align-items: center;
        margin: 0 0px 0 8px;
        color: white;
        opacity: 0.4;
        font-size: 0.9em;
        font-weight: normal;
      }
    .rr{
      font-size: 1.5em;
    }
    .showerInfo{
      display: flex;
      img{
        right: 70px;
        top: 4px;
        width: 45px;
        height: 45px;
        position: absolute;
        // margin-right: 5px;
      }
      span{
        margin-bottom: 6px;
        font-size: 14px;
      }
    .follow{
      width:65px;
      height: 25px;
      background-color: rgb(40, 40, 40);
      color: white;   
      border-radius: 0.2em;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
      &:hover{
        font-weight: 600;
        background-color: rgb(100, 100, 100);
      }
    } 
    }  
  }
  .ablumimg{
    position: relative;
    // position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
    // top: 30px;
    .album_tips{
      color: white;
      font-size: 45px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
      overflow: hidden;
    }
    .img_slide{
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
      cursor: pointer;
      z-index: 11;
      // animation: slideLeft 0.5s cubic-bezier(0,0,0.28,1);
      // transition: all 0.5s cubic-bezier(0.5,0.7,0,0.)	
    }
    .bottomInfo{
      background-color: rgba(0,0,0,0.2);
      position: absolute;
      bottom: 0em;
      color: white;
      width: 100%;
      height: 2em;
      line-height: 2em;
      font-size: 1.2em;
      white-space: 2px;
      z-index: 19;
      display: flex;
      justify-content: space-between;
      div{
        display: flex;
      }
      span{
        margin-left: 10px;
      }
      .auto_play{
        position: absolute;
        right: 0;
        bottom: -2em;
        color: white;
        opacity: 0.15;
        font-size: 0.9em;
        font-weight: normal;
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
      .imgList{
        width: 30px;
        height: 100px;
        line-height: 25px;
        text-align: center;
        position: fixed;
        left: 0em;
        top: calc(49% - 33px);
        color: white;
        opacity: 0.8;
        font-weight: normal;
        background-color: rgb(40, 40, 40); 
        border-radius: 0.2em;
        font-size: 14px;
        display: flex;
        align-items: center;
        
        cursor: pointer;
        padding-left: 1px;

        // div{
        //   display: flex;
        //   flex-direction: column;
        // }
        &:hover{
          font-weight: 600;
          background-color: rgb(100, 100, 100);
        }        
      }
      .comment{
        width: 30px;
        height: 100px;
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
        cursor: pointer;
        &:hover{
          font-weight: 600;
          background-color: rgb(100, 100, 100);
        }
      }
  }
  }
.el-drawer__body{
  height: 100%;
  overflow-y: scroll;
  background-color: rgba(240,240,240,0.8);
}
  #prev{
    position: absolute;
    top: calc(49% - 33px);
    left: -0.9em;
    width: 60px;
    height: 60px;
    font-size: 66px;
    opacity: 0.1;
    color: rgb(240, 240, 240);
    z-index: 99;
    &:hover{
      opacity: 0.8;
    }

  }
  #next{
    position: absolute;
    top: calc(49% - 33px);
    right: -0.8em;
    width: 60px;
    height: 60px;
    font-size: 66px;
    opacity: 0.2;
    color: rgb(240, 240, 240);
    z-index: 99;
    &:hover{
      opacity: 0.8;
    }
  }
}
  @media screen and (min-width:0px) and (max-width:530px){
    #album{
      height: 32em;
      width: 80%;
      #prev{
        left: 0;
        top: 75%
      }
      #next{
        right: 0;
        top: 75%
      }
      .shower{
        .showerInfo{
          img{
            width: 35px;
            height: 35px;
            right: 60px;
          }
        }
      }
    }
    #PC{
      display: none;
    }
    #mobile{
      display: block;
    }
    
  }
@media screen and  (min-width:530px) and (max-width: 1025px) {
  #album{
    height: 380px;
  }
}
@media (min-width: 1026px) and (max-width: 1200px) {
  #album{
    height: 400px;
  }
}
@media (min-width: 1201px) and (max-width: 1280px) {
  #album{
    height: 477px;
  }
}

@media (min-width: 1281px) and (max-width: 1440px) {
  #album{
    height: 520px;
  }
}
@media (min-width: 1441px) and (max-width: 1680px) {
  #album{
    height: 600px;
  }
}
// @media (min-height: 600px) and (max-height: 720px) {
//   #album{
//     height: 200px;
//   }
// }
</style>