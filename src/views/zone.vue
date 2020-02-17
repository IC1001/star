<template>
  <div class="zoneC">
    <head-bar></head-bar>
    <div id="zoneBG">
      <img src="@a/slide/xx.png" alt="">
    </div>
    <!-- <div id="blackM"></div> -->
    <div class="zoneUser">
      <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="avatar"
        :width="300"
        :height="300"
        url="/set_portrait"
        :params="params"
        :headers="{Authorization : 'Bearer ' + token}"
        img-format="png">
      </my-upload>
    <!-- <img :src="imgDataUrl"> -->
      <div class="portrait">
        <img src="@a/icon/user.png" v-if="!zoneData.portrait" class="rAvatar">
        <img :src="baseUrl+zoneData.portrait" v-else class="rAvatar" @click="setAvatar"> 
        <div>{{zoneData.name}}
          <span @click="set_sex">
            <i class="el-icon-male blue" v-show="zoneData.sex == 1"></i>
            <i class="el-icon-female pink" v-show="zoneData.sex == 0"></i>
          </span>
        </div>
        
        <div  v-if="user == zoneData.name"></div>
        <div class="follow_btn" v-else @click="setFollow">{{follow_status}}</div>          
      </div>
      <!-- <div id="follow">+ 关注</div> -->
      <!-- <div class="friends">
        <div>关注：{{zoneData.follow}}</div>
        <div>粉丝：{{zoneData.fans}}</div>
      </div> -->

         
    </div>

    <div class="zoneShow">
      <div v-for="(item,index) in titles" :key="index" class="zoneNav" @click="toThis(item,index)" 
      :class="{zoneNav_actived:index === clickIndex}">
      
        {{item}}
        <span v-show="item == '关注'">{{zoneData.follow}}</span>
        <span v-show="item == '粉丝'">{{zoneData.fans}}</span>
      </div>
      <div class="album_title" v-show="clickIndex == 0">
        <span>共{{zone_album.length}}个相册</span>
        <span @click="editAlbum" v-if="zoneData.id == loginData.id && !isedit" class="setting">
          <i  class="el-icon-setting"></i>编辑
        </span>
        <span @click="isedit=false" v-if="isedit" class="setting">
          <i class="el-icon-check"></i>完成
        </span>
      </div>
    </div>

  <!-- <show-item :showData="zone_album"  v-if="clickIndex== 0"> -->
    <albumZ :show="zone_album" v-if="clickIndex== 0" :isedit="isedit"></albumZ>
    <show-item :showData="like_collect_data"  v-if="clickIndex== 1||2">
      <div slot="title"></div>
    </show-item>
    <friend :friendData="follow_fans_data" v-if="clickIndex == 3||4"></friend>
    <!-- <friend :friendData="fans_data" v-show="clickIndex == 4"></friend> -->
    <!-- <friend :friendData="fans_data" v-if="clickIndex== 4"></friend> -->
    <div @click="clickUpLoad" class="upload" v-if="zoneData.id == loginData.id"><i  class="el-icon-upload2"></i>上传图片</div>
    <!-- <div @click="clickUpLoad" class="editAlbum"><i  class="el-icon-upload2"></i>编辑相册</div> -->
    <up-load v-if="isUpload" @closeBar="closeBar"></up-load>    
  </div>
</template>

<script>
import HeadBar from "@c/common/head-bar"
import albumZ from "@c/content/albumZ"
import myUpload from 'vue-image-crop-upload'
import ShowItem from "@c/content/show-item"
import friend from "@c/content/friend"
import UpLoad from "@c/common/upload"
export default {
  data(){
    return {
      baseUrl:'/portrait/',
      zoneData: this.$store.state.zoneData,
      zone_album: this.$store.state.user_album,
      loginData:this.$store.state.loginData,
      test:1,
      avatar:false,
      token: localStorage.token,
      user: localStorage.user,
      follow_status:'+ 关注Ta',
      titles:['相册','喜欢','收藏','关注','粉丝'],
      clickIndex:0,
      query_nav:this.$route.query.nav,
      isUpload:false,
      isedit:false,
      // follow_data:this.$store.state.friends.follow_users,
      // fans_data:this.$store.state.friends.fans_users
    }
  },
  components:{
    HeadBar,albumZ,myUpload,ShowItem,friend,UpLoad
  },
  computed:{
    like_collect_data(){
      if(this.clickIndex == 1){
        return this.$store.state.like_collect_data.like_album_data
      }else if(this.clickIndex == 2){
        return this.$store.state.like_collect_data.collect_album_data
      }
    },
    // follow_data(){
    //   return this.follow_data
    // },
    // fans_data(){
    //   return this.fans_data
    // },
    follow_fans_data(){
      if(this.clickIndex == 3){
        return this.$store.state.friends.follow_users
      }else if(this.clickIndex == 4){
        return this.$store.state.friends.fans_users
      }      
    },

    // friend_data(){
    //   if(this.clickIndex == 3){
    //     return this.$store.state.friends.follow_data
    //   }else if(this.clickIndex == 4){
    //     return this.$store.state.friends.fans_data
    //   }
    // },
    // follow_data(){
    //   return this.$store.state.friends.follow_data
    // },
    // fans_data(){
    //   return this.$store.state.friends.fans_data
    // }
  },
  methods:{
    editAlbum(){
      this.isedit = true
    },
    clickUpLoad(){
      this.isUpload = true
    },
    closeBar(){
      this.isUpload = false
    },
    set_sex(){
        this.$alert('你要修改性别吗?', '确认提示', {
          confirmButtonText: '确定',
          callback: action => {
              // this.current = index
              this.axios.post('set_sex',{
                sex: this.zoneData.sex,
                id:this.loginData.id
              }).then(res=>{
                this.sex =  res.data
                window.location.reload()
              })

          }
        });      
    },
    setAvatar(){
      this.avatar = !this.avatar
    },
		cropSuccess(imgDataUrl, field){
      this.imgDataUrl = imgDataUrl;
    },
    toThis(item,index){
      this.clickIndex = index
    },
		cropUploadSuccess(jsonData, field){
      this.avatar = false
    },
    setFollow(){
      if(localStorage.token){
        if(this.follow_status.indexOf('+')!==-1){
          this.follow_status = '√ 已关注'
          this.axios.post('setFollow',{ 
              login_user:this.$store.state.loginData,
              zone_data:this.zoneData,
              follow_status:this.follow_status
            }
          )
          .then(res=>{
            this.zoneData.fans ++
            this.$store.commit('setFriendData',{
              fans_users: res.data,
              follow_users: this.$store.state.friends.follow_users
            })
            
            
          })
        }else{
          this.follow_status = '+ 关注Ta'
          this.axios.post('setFollow',{ 
              login_user:this.$store.state.loginData,
              zone_data:this.zoneData,
              follow_status:this.follow_status
            }
          )
          .then(res=>{
            this.zoneData.fans --
            this.$store.commit('setFriendData',{
              fans_users: res.data,
              follow_users: this.$store.state.friends.follow_users
            })
            
          })
        }
      }else{
        alert('请先登录')
      }
    }
  },
  created(){
    //请求数据
      this.axios.post('zone',{user:this.$route.query.user})
      .then(res=>{
        //用户
        this.$store.commit('setZoneData',res.data.user_info)   
        this.zoneData = this.$store.state.zoneData
        //相册
        this.$store.commit('setAlbumData',res.data.user_album)
        console.log(res.data.user_album);
 
        console.log(this.$store.state.user_album);

        
        this.zone_album =  this.$store.state.user_album
               console.log(this.zone_album);
        //like_collet
        this.$store.commit('setLCdata',res.data.like_collect)
        // this.like_collect_data =  this.$store.state.like_collect_data
        //friend_data
        this.$store.commit('setFriendData',res.data.friends)
      })
      .catch(function (err){
        console.log(err);              
      })
    // }
  },
  mounted(){
      //状态
      setTimeout(()=>{
        this.loginData = this.$store.state.loginData
        // console.log(this.loginData);
  
        if(this.$store.state.loginData.id !== this.zoneData.id){          
          if(this.$store.state.loginData.followed_user.split(',').indexOf(String(this.zoneData.id))!==-1){
            this.follow_status = '√ 已关注'      
          }
        }
      },220)
    },
  updated(){

  }
}
</script>

<style lang="less">
.zoneC{
  margin:auto;
}
.blue{
  color: #00BFFF;
}
.pink{
  color: #FFC1C1;
}
#zoneBG{
  margin-top: 40px;
  height: 320px;
  width: 100%;
  margin: 40px auto 0 auto;
  // min-width: 800px;
  // position: fixed;
  // top: 0;
  // left: 0;
  img{
    width: 100%;
    margin:auto;
    height: 100%;
    object-fit: cover;
  }
}
.zoneUser{
  height: 125px;
  position: relative;
  .portrait{
    position: absolute;
    top: -55px;
    left: calc(50% - 56px);
    height: 100px;
    color: black;
    font-size: 2em;
    div{
      text-align: center;
      margin-top: -10px;
    }
    .rAvatar{
      border-radius: 50%;
      cursor: pointer;
      // border:white 4px solid;
    }
    img{
      // position: absolute;
      height: 100px;
      width: 100px;
      border:white solid 6px;
    }
    .follow_btn{
      width: 75px;
      height: 25px;
      background-color: rgb(40, 40, 40);
      color: white;   
      border-radius: 0.2em;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
      margin:0px auto 0px auto;
      &:hover{
        font-weight: 600;
        background-color: rgb(100, 100, 100);
      }
    } 
  }

}
#blackM{
  position: fixed;
  height: 300px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4)
}

#follow{
  background-color: rgb(40, 40, 40);
  color: white;
  border-radius: 1em;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 336px;
  left: 35px;
  // width: 85px;
  // height: 85px;
}
.friends{
  position: absolute;
  top: 304px;
  left: 110px;
  height: 85px;
  font-size: 1.4em;
  color: white;  
}

.zoneShow{
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // display: flex;
  // align-items: center;
  width: 70%;
  margin:0px auto 0 auto;
  font-size: 18px;
  font-weight: 600;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-bottom: 1.35em;
  position: relative;
  // margin-left: calc(50% - 120px);
  // background-color: rgb(255,255,255);
  // position: relative;
  // span{
  //   font-size: 1.8em;
  // }
  .album_title{
    position: absolute;
    bottom: -1.1em;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 20px;
    font-weight: normal;
    font-size: 0.8em;
    .setting{
      cursor: pointer;
      &:hover{
        color: #FF3030;
      }
    }
  }
  .zoneNav{
    padding:16px;
    cursor: pointer;
  }
  .zoneNav_actived{
    color: #2F4F4F;
    border-bottom: #2F4F4F solid 2px;
  }

}

  // .portrait{
  //    span{
  //      margin-left: 0;
  //    }
  // }
  .vue-image-crop-upload, .vue-image-crop-upload .vicp-wrap{
    z-index: 999;
  }
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
  cursor: pointer;
  &:hover{
    font-weight: 600;
    background-color: rgb(100, 100, 100);
  }
}
@media screen and (min-width: 0px ) and (max-width: 530px){
  .zoneShow{
    width: 98%;
    font-size: 16px;
  }
}
</style>