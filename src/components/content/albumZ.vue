<template>
  <div class="albumZ">
    <div v-for="(item,index) in show" :key="index" class="showcardZ">
      <!-- 编辑状态 -->
      <div class="close_btn" v-if="isedit" @click="deleteAlbum(index)"><i class="el-icon-error"></i></div>
      <div class="Zcover" v-if="!item.cover" @click="toDetail(index)"><img src="@a/slide/10.png" class="showimg"></div>
      <div class="Zcover" @click="toDetail(index)" v-else><img v-lazy="baseUrl+item.cover" alt="" class="showimg"></div>

    <form  @submit.prevent="postChange(index)">  
      <div class="cardTitle"  v-if="isedit" >
        <input type="text" v-model="new_name[index]" :placeholder="item.album_name" style="width:70%;">
      </div>      
      <div class="cardTitle" @click="toDetail" v-if="!isedit">{{item.album_name}}</div>

      <div class="operation" v-if="isedit">      
        <el-button size="mini" native-type="submit">修改</el-button>
      </div>
      <div class="operation" v-else>
        <!-- <div class="oItem"><i class="el-icon-picture-outline-round"></i>{{item.img.length}}</div> -->
        <div class="oItem"><img src="@a/like/view.png" alt="浏览数"><div>{{item.views}}</div></div>
        <div class="oItem">
          <img src="@a/like/liked.png" alt="已点赞"  v-if="islike" @click="cancelLike">
          <img src="@a/like/like.png" alt="点赞" v-else @click="likeThis">
          
          <div :class="{red_font:islike}">{{item.likes}}</div>
        </div>
        <div class="oItem">
          <img src="@a/like/collected.png" alt="已收藏" v-if="iscollect" @click="cancelCollect">
          <img src="@a/like/collect.png" alt="收藏" v-else @click="collectThis">
        </div>
      </div>

      <div class="userInfo">
        <div v-if="isedit">
          <div class="type_btn" @click="changeType=true" v-if="!changeType">{{item.type}}</div>
          <span v-if="changeType">
              <select  v-model="newType[index]" class="upload_album">
                <option
                  v-for="item in type"
                  :key="item.value"
                  :value="item.value">
                  {{item.label}}
                </option>
              </select>
          </span>
        </div>
        <div v-else>{{item.type}}</div>
        <div>{{item.date}}</div>
      </div>
    </form>
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
      collect_album:'',
      type:[
        {label:'私密',value:'私密'},
        {label:'风景',value:'风景'},
        {label:'人像',value:'人像'},
        {label:'纪实',value:'纪实'},
        {label:'生态',value:'生态'},
        {label:'艺术',value:'艺术'},
      ],
      changeName:false,
      changeType:false,
      newType:[],
      new_name:[]
    }
  },
  computed:{
  },
  props:{
    show:{
      default(){

      }
    },
    isedit:{
      default(){

      }
    }
  },
  methods:{
    toDetail(index){
      this.show.views ++
      let routeUrl = this.$router.resolve({path:'/detail' , query:{id:this.show[index].album_id}})
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
        console.log('success');

      })
    },
    cancelLike(){
      this.islike = false
      this.show.likes --
      this.axios.post('setLike',{album_id:this.show.album_id,islike:this.islike})
      .then(res=>{
        console.log('cancel success');

      })
    },
    collectThis(){
      this.iscollect = true
      this.show.collect ++
      this.axios.post('setCollect',{album_id:this.show.album_id,iscollect:this.iscollect})
      .then(res=>{
        console.log('success');

      })
    },  
    cancelCollect(){
      this.iscollect = false
      this.show.collect --
      this.axios.post('setCollect',{album_id:this.show.album_id,iscollect:this.iscollect})
      .then(res=>{
        console.log('cancel success');

      })
    }, 
    deleteAlbum(index){
        this.$alert('你确定要删除此相册?', '提示框', {
          confirmButtonText: '确定',
          callback: action => {
            this.axios.post('del_album',{id:this.show[index].album_id})
            .then(res=>{
              this.show.splice(index,1)
            })   
          }
        });

    },
    postChange(index){
      if(this.newType[index] || this.new_name[index]){      
        this.axios.post('set_change',
        {
          name: this.new_name[index] || this.show[index].album_name,
          type: this.newType[index] || this.show[index].type,
          album_id: this.show[index].album_id
        })
        .then(res=>{
          this.show[index].album_name = this.new_name[index]
          this.show[index].type = this.newType[index]
          this.$message({
            message: '修改成功',
            type: 'success',
            center: true,
            duration:2000
          })
      
          
        })
      }else{
          this.$message({
            message: '无修改内容',
            center: true,
            duration:1000
          })        
      }
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
      },10)

    }
  }
}
</script>

<style lang="less">
.albumZ{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 68%;
    margin: auto;
}

.showcardZ{
  width: 220px;
  background-color: white;
  height: 240px;
  border-radius: 0.5rem;
  box-shadow: 0 3px 10px 1px rgba(97, 97, 97, 0.1);
  margin-top: 16px;
  margin-right: 16px;
  position: relative;
  .close_btn{
    position: absolute;
    top: -13px;
    right: -13px;
    cursor: pointer;
  }
  .red_font{
    color: #FF3030;
  }
  .Zcover{
    width: 98%;
    height: 50%;
    position: relative;
    padding: 3px;
    box-shadow: 0px 2px 2px #888888;
    border-bottom: 1px solid #8a8a8a;
    margin: auto;
    .showimg{
      width: 100%;
      height: 100%; 
      //竖图截取
      object-fit:cover;
      object-position: 0 0;
  }
  }
  .cardTitle{
    margin: 9px 6px 0 6px;
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
      }
    }
    .type_btn{
      background-color: #e8eef6;
      color: #3f87d9;
      cursor: pointer;
    }
  }

}
.isedit{
  background-color: #e8eef6;
  color: #3f87d9;
  cursor: pointer;
}
@media screen and (min-width: 0px ) and (max-width: 530px){
  .albumZ{
    width: 96%;
  }
  .showcardZ{
    width: 480px;
    height: 340px;
    font-size: 16px;
    margin-right: 0px;
    .cardTitle{
      margin-top: 20px;
    }
    .userInfo{
      margin-top: 20px;
    }
  }
}
</style>