<template>
  <div>
    <div v-for="(item,index) in commentData" :key="index" >
			<div class="commentItem">
				<div class="commentInfo">
          <img src="@a/icon/user.png" v-if="!item.portrait" class="cAvatar">
					<img v-lazy="avatarUrl+item.portrait" v-else class="cAvatar">
					<span>{{item.from_name}}</span>
          <span style="margin-left:20px;color:grey;font-size:15px;">{{item.date}}</span>
          
				</div>
        <div class="commentContent">{{item.content}}</div>
			</div>
		</div>
      <div class="writeComment">
        <input type="text" placeholder="说出你的想法..." v-model="comment_data">
        <el-button type="primary" @click="submitComment">发送</el-button>
      </div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			avatarUrl:'/portrait/',
			comment_id:'',
			comment_Data:[]
					
		}
	},
	props:{
		commentData:{
			default(){

			}
    },
    img:{
			default(){

			}      
    }
  },
  methods:{
    submitComment(){
      console.log(!this.$store.state.loginData);
      
      if(!this.$store.state.loginData){
        this.$message({
          message: '请先登录！',
          type: 'warning'          
        })    
        return    
      }
      if(this.comment_data==undefined){
        this.$message({
          message: '评论内容不能少于2个字！',
          type: 'warning'          
        })
        return
      }
      this.axios.post('setComment',{
        content: this.comment_data,
        album_id: this.img.album_id,
        user_id: this.img.user_id,
        from_id: this.$store.state.loginData.id,
        from_name: this.$store.state.loginData.name,
        portrait: this.$store.state.loginData.portrait
      })
      .then(res=>{
        this.commentData.push({
          content: this.comment_data,
          album_id: this.img.album_id,
          user_id: this.img.user_id,
          from_id: this.$store.state.loginData.id,
          from_name: this.$store.state.loginData.name,
          portrait: this.$store.state.loginData.portrait})
        
      })
    }
  }
}
</script>

<style lang="less">
	.commentItem{
    padding:20px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
		.commentInfo{
      display: flex;
      align-items: center;
			.cAvatar{
				width: 30px;
				height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

    }      
      .commentContent{
        word-wrap: break-word;
        padding-left: 40px;


      }
  }
  .writeComment{
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: rgb(250, 250, 250);
    // width: 576px;
    // min-width: 200px;
    // justify-content: center;
    padding:20px;
    bottom: 0;
    input{
      height: 40px;
      width: 17rem;

    }
    button{
      margin-left:10px;
      height: 40px;
      width: 65px;
      text-align: center;
    }
  }
</style>