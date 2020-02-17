<template>
  <div id="a_user">
      <div v-for="(item,index) in data" :key="index" >
        <div class="userItem">
          <div class="userInfo">
            <img :src="avatarUrl+item.portrait" alt="" class="userAvatar" @click="toZone(index)">
            <div>{{item.name}}</div>
            <div class="user_btn"  @click="deleteUser(index)" >注销</div> 
          </div>
          <!-- <div class="user_btn"  @click="ban(index)" v-if="!isBan[index]">{{follow}}</div> -->
          
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      avatarUrl:'/portrait/',
    }
  },
  components:{
  },
  props:{
    data:{
      dafault(){
        
      }
    }
  },
  methods:{
    deleteUser(index){
      this.axios.post('deleteUser',index)
      .then(res=>{
        console.log('del success');
        
      })
    },
    toZone(index){      
      let routeUrl = this.$router.resolve({path:'/zone' , query:{user:this.data[index].name}})
      window.open(routeUrl.href,'_blank')
    },
  }
}
</script>

<style lang="less">
#a_user{
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin:20px auto;
}
.userItem{
  margin-right: 20px;
	.userAvatar{
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
  .user_btn{
      background-color: rgb(40, 40, 40);
      color: white;   
      border-radius: 0.2em;
      font-size: 14px;
      width: 60px;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
      &:hover{
        font-weight: 600;
        background-color: rgb(100, 100, 100);
      }
    }     
}
</style>