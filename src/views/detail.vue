<template>
  <div >
    <head-bar></head-bar>
    <div id="detail">
      <div class="title">
        {{detailData.title}}
      </div>
      <div class="infomation">
        <img :src="'/portrait/'+detailData.portrait" @click="toZone">
        <span class="infomation2">
          <div>{{detailData.name}}</div>
          <div class="infomation3">
            <span>{{detailData.blog_date}}</span>
            <span>阅读：{{detailData.views}}</span>
          </div>
        </span>       
      </div>
      <div class="content" v-html="detailData.content">
        {{detailData.content}}
      </div>
    </div>
    <div class="comment">
      <div class="write">
        <el-dialog
          title="写下你的评论"
          :visible.sync="iswrite"
          width="60%"
          :before-close="handleClose">
          <editor-bar v-model="writeData"  class="editor-bar"></editor-bar>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="iswrite = false">取 消</el-button>
            <el-button type="primary" @click.native="submitComment">发 表</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="watch">
        <div class="watch_title">
          <span class="xspan">
            <i class="el-icon-s-comment"></i>
            全部评论 {{detailData.comments}}
          </span>
          <el-button  icon="el-icon-edit" @click="reply(0,0)"  size="small"  type="primary">评论</el-button>
        </div>
        <div v-for="item in commentData" :key="item.comment_id" class="comment_item">
          <div class="infomation">
            <img :src="'/portrait/'+item.user_portrait" @click="toZone2(item.user_name)">
            <span class="infomation2">
              <div>{{item.user_name}}</div>
              <div class="infomation3">
                <!-- <span>阅读：{{detailData.views}}</span> -->
                <span>{{item.c_date}}</span>
              </div>
            </span>
          </div>  
          <div class="c_content" v-html="item.c_content">{{item.c_content}}</div>       
          <div class="c_content">
            <el-button icon="el-icon-s-comment" @click="reply(item.comment_id,0)"  size="mini">回复</el-button>
            <!-- 子回复 -->
            <div class="child_comment">
              <div v-for="item2 in commentChildData[item.comment_id]" :key="item2.comment_id" class="comment_item">
                <div class="infomation">
                  <img :src="'/portrait/'+item2.user_portrait" @click="toZone2(item2.user_name)">
                  <span class="infomation2">
                    <div>
                      {{item2.user_name}}
                      <span class="atClass" @click="toZone2(item2.c_content.slice(1,item2.c_content.indexOf('&lt;')))">{{item2.c_content.slice(0,item2.c_content.indexOf('&lt;'))}}</span>
                    </div>
                    <div class="infomation3">
                      <!-- <span>阅读：{{detailData.views}}</span> -->
                      <span>{{item2.c_date}}</span>
                    </div>
                  </span>
                  
                </div>  
                
                <div class="c_content" v-html="item2.c_content.slice(item2.c_content.indexOf('&lt;'))">{{item2.c_content.slice(item2.c_content.indexOf('&lt;'))}}</div>  
                <div class="c_content">
                  <el-button icon="el-icon-s-comment" @click="reply(item.comment_id,item2.user_name)"  size="mini">回复</el-button>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div v-if="commentData.length == 0" class="no_comment">
          暂无评论
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HeadBar from "@c/common/head-bar"
import EditorBar from '@c/wangEditor/index'

export default {
  name: 'detail',
  data(){
    return{
      img:this.$store.state.detail_data,
      detailData:{},
      commentData:[],
      writeData:'',
      iswrite:false,
      p_c_id: 0,
      commentChildData:{},
      atName:''
    }
  },
  components: {
    HeadBar,EditorBar
  },
  created(){
      this.axios.post('detail',{id:this.$route.query.id})
      .then(res=>{
        // this.$store.commit('setDetailData',res.data)   
        this.detailData = res.data.detail
        this.commentData = res.data.comment     
        this.detailData.views += 1
        this.commentChildData = res.data.child
      })
      .catch(function (err){
        console.log(err);              
      })
  },
  mounted(){

  },
  methods:{
    toZone(){
      let ownzone = this.$router.resolve({path:'/zone' , query:{user: this.detailData.name}})
      window.open(ownzone.href,'_blank')        
    },
    toZone2(name){
      let ownzone = this.$router.resolve({path:'/zone' , query:{user: name}})
      window.open(ownzone.href,'_blank')        
    },
    reply(id,name){
      console.log(this.$store.state.loginData);
      
      if(this.$store.state.loginData==''){
        this.$message({
          type:'warning',
          message:'登录才能评论'
        })
        return
      }
      this.p_c_id = id
      if(name !== 0){
        this.atName = '@' + name
      }
      
      this.iswrite = true
    },
    submitComment(){
      if(this.writeData.length < 2){
        this.$message({
          type:'warning',
          message:'评论字数不能少于2！'
        })
        return
      }
      if(this.atName !== ''){
        this.writeData = this.atName + this.writeData
      }
      console.log(this.writeData);
      
      this.axios.post('comment',{
        blog_id: this.detailData.blog_id,
        user_id: this.$store.state.loginData.id,
        user_name: this.$store.state.loginData.name,
        user_portrait:this.$store.state.loginData.portrait,
        c_content: this.writeData,
        p_c_id: this.p_c_id,
        atName: this.atName,
        comments: this.detailData.comments
      })
      .then(res=>{
        this.iswrite = false
        this.detailData.comments ++
        if(this.p_c_id === 0){
          this.commentData.unshift(res.data)
        }else{
          this.commentChildData[this.p_c_id].unshift(res.data)
        }
        
      })
    }
  }
}
</script>

<style lang="less">
.atClass{
  color: #409eff;
  cursor: pointer;
  margin-left: 2px;
}
.child_comment{
  .comment_item{
    border-bottom: 1px solid rgba(40, 40, 40, 0.3);
    padding-bottom: 30px;
    .c_content{
      margin-top: 10px;
      margin-left: 50px;
      img{
        object-fit: contain;
      }
    }
  }  
}
.editor-bar{
  margin-top: 20px;
  width: 100%;
  left: 0;
  height: 100%;
}
#detail{
  
  width: 60%;
  height: 100%;
  margin:auto;
  background-color: #fff;
  margin-top: 70px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.1);
  .title{
    font-weight: 600;
    font-size: 30px;
  }

  .content{
    font-size: 18px;
    margin: auto;
    img{
      width: 80%;
      height: 360px;
      object-fit: contain;
      margin-left: 10%;
    }
  }

}
.comment{
  width: 63%;
  height: 100%;
  margin:auto;
  margin-top: 10px;
  .write{
    font-size: 18px;
    font-weight: 600;

  }
  .watch{
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.1);
    background-color: #fff;
    .no_comment{
      height: 200px;
      text-align: center;
      line-height: 200px;
      font-size: 20px;
      color: gray;

    }
    .watch_title{
      height: 30px;
      .xspan{
        font-size: 18px;
        margin-right: 20px;
      }

    }
    .comment_item{
      border-bottom: 1px solid rgba(40, 40, 40, 0.3);
      padding-bottom: 30px;
      .c_content{
        margin-top: 10px;
        margin-left: 50px;
        img{
          object-fit: contain;
        }
      }
    }
  }
}
.infomation{
  display: flex;
  margin-top: 14px;
  cursor: pointer;
  img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .infomation2{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    .infomation3{
      color: gray;
      font-size: 12px;
      span{
        margin-right: 10px;
      }
    }
  }

}
</style>