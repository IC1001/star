<template>
  <div class="home">
    <head-bar></head-bar>
    <div class="show">
      <div class="show_item" v-for="item in blogData" :key="item.blog_id" @click="toDetail(item.blog_id)">
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
    </div>
  </div>
</template>

<script>
import HeadBar from "@c/common/head-bar"
export default {
  name: 'home',
  data(){
    return{
      blogData:[]
    }
  },
  components: {
    HeadBar
  },
  methods:{
    toDetail(id){
      let routeUrl = this.$router.resolve({path:'/detail' , query:{id:id}})
      window.open(routeUrl.href,'_blank')      
    }
  },
  created(){    
    this.axios.get('/index_data')
    .then(res=>{     
      this.$store.commit('setIndexData',res.data)
      this.blogData = this.$store.state.index_data
      
    })
  }

}
</script>

<style lang="less">
.show{
  width: 60%;
  margin: auto;
  margin-top: 80px;
  .show_item{
    // height: 20vh;
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
    // background-color: white;
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
        width: 70%;
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
        width: 30%;
        img{
          width: 80%;
          height: 96px;
          object-fit: cover;
          margin-left: 10%;
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

</style>