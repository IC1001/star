<template>
  <div class="zoneC">
    <head-bar></head-bar>
    <!-- <div id="blackM"></div> -->
    <div class="zoneUser">
      <my-upload field="img"
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
        <img :src="'/portrait/'+zoneData.user.portrait"  class="rAvatar" @click="setAvatar">
        <!-- <img :src="baseUrl+zoneData.portrait" v-else class="rAvatar" @click="setAvatar">  -->
        <div>
          <span>{{zoneData.user.name}}</span>
          <span @click="set_sex">
            <i class="el-icon-male blue" v-show="zoneData.user.sex == 1"></i>
            <i class="el-icon-female pink" v-show="zoneData.user.sex == 0"></i>
          </span>
        </div>
        <div class="user_intro" >
          <i class="el-icon-edit-outline" @click="setIntro" v-if="own"></i>
          {{zoneData.user.intro == null ? '暂无介绍' : zoneData.user.intro}}
        </div>
        <el-dialog title="修改介绍" :visible.sync="isSetIntro">
          <el-input v-model="intro" placeholder="自我介绍"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isSetIntro = false">取 消</el-button>
            <el-button type="primary" @click="submitSet">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
    <!-- 我发布的 -->
    <div class="show2">
      <div class="show2_title"><i class="el-icon-document-copy"></i>文章列表</div>
      <div class="show_item" v-for="item in zoneData.blog" :key="item.blog_id" @click="toDetail(item.blog_id)">
        <div class="title">
          {{item.title}}
        </div>
        <div class="noimg" v-if="item.cover == 'noimg'">
          {{item.front_content}}
        </div>
        <div class="intro" v-else>
          <div class="hasimg">{{item.front_content}}</div>
          <div class="cover"><img :src="item.cover" alt="封面"></div>
        </div>
        <div class="card_info">
          <span><i class="el-icon-s-comment"></i>{{item.comments}}</span>
          <span><i class="el-icon-view"></i>{{item.views}}</span>
          <span><i class="el-icon-date"></i>{{item.blog_date}}</span>
        </div>        
      </div>
      <div class="show_item" v-if="zoneData.blog.length == 0 ">
        <div class="title">
          暂无文章
        </div>
      </div>
    </div>

  
  </div>
</template>

<script>
import EditorBar from '@c/wangEditor/index'
import HeadBar from "@c/common/head-bar"
import myUpload from 'vue-image-crop-upload'

export default {
  data(){
    return {
      baseUrl:'/portrait/',
      zoneData: {},
      avatar:false,
      token: localStorage.token,
      isSetIntro:false,
      intro:'',
      own:false
    }
  },
  components:{
    HeadBar,myUpload,EditorBar
  },
  created(){ 
    this.axios.post('zone',{name:this.$route.query.user})
    .then(res=>{
      this.zoneData = res.data
    })
  },
  mounted(){
    setTimeout(()=>{
      if(this.$store.state.loginData.id === this.zoneData.user.id){
        this.own = true
      }
    },200)

  },
  methods:{
    toDetail(id){
      let routeUrl = this.$router.resolve({path:'/detail' , query:{id:id}})
      window.open(routeUrl.href,'_blank')      
    },
    set_sex(){
      if(this.$store.state.loginData.id === this.zoneData.user.id){
        this.$alert('你要修改性别吗?', '确认提示', {
          confirmButtonText: '确定',
          callback: action => {
              // this.current = index
              this.axios.post('set_sex',{
                sex: this.zoneData.user.sex
              }).then(res=>{
                this.sex =  res.data
                window.location.reload()
              })

          }
        }) 
      }

    },
    setAvatar(){
      if(this.$store.state.loginData.id === this.zoneData.user.id){
        this.avatar = !this.avatar
      }
    },
    setIntro(){
      if(this.$store.state.loginData.id === this.zoneData.user.id){
        this.isSetIntro = true
      }
    },
    submitSet(){
      if(this.intro === this.zoneData.user.intro){
        this.isSetIntro = false
      }else{
        this.axios.post('/set_intro',{intro:this.intro})
        .then(res=>{
          this.zoneData.user.intro = res.data
          this.isSetIntro = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      }
    },
		cropUploadSuccess(jsonData, field){
      this.avatar = false
      this.zoneData.user.portrait = jsonData.protrait_URL
      // window.location.href = this.$route.path + '?user=' +  this.$route.query.user
    }
  }
}
</script>

<style lang="less">

.zoneC{
  margin:auto;
  .show2{
    width: 60%;
    margin: auto;
    margin-top: 10px;

    .show2_title{
      i{
        margin-right: 4px;
      }
      font-size: 20px;
      margin-bottom: 10px;
    }
    .show_item{
      padding: 12px;
      margin-bottom:10px;
      background-color: white;
      border: 0;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,.1);
      border-radius: 6px;
      cursor: pointer;
      &:hover{
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
      }
      .title{
        word-wrap: break-word;
        word-break: break-all;  
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 6px;
      }
      .noimg{
        width:100%;
        height: 66px;
        color: gray;
        font-size: 14px;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;       
        line-height: 30px;       
      }
      .intro{
        width: 100%;
        display: flex;
        .hasimg{
          width: 64%;
          height: 96px;
          color: gray;
          font-size: 14px;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;       
          line-height: 30px; 
        }
        .cover{
          width: 36%;
          img{
            width: 100%;
            height: 96px;
            object-fit: none;
          }
        }
      }
      .card_info{
        display: flex;
        color: rgba(60, 60, 60, 0.45);

      
        span{
          margin-right: 10px;
          i{
            margin-right: 4px;
          }
        }
      }
    }
  }
}
.blue{
  color: #00BFFF;
}
.pink{
  color: #FFC1C1;
}
.zoneUser{
  margin-top: 120px;
  height: 125px;
  position: relative;

  .portrait{
    position: absolute;
    top: -55px;
    left: calc(50% - 56px);
    height: 100px;
    color: black;
    font-size: 2em;
    cursor: pointer;
    .user_intro{
      margin-left: -14px;
      margin-top: 10px;
      text-align: center;
      font-size: 14px;
      color: rgb(60,60,60);

    }
    div{
      text-align: center;
      margin-top: -10px;
    }
    .rAvatar{
      border-radius: 50%;
      cursor: pointer;
    }
    img{
      height: 100px;
      width: 100px;
    }
  }

}
</style>