<template>
  <div>
    <div v-for="(item,index) in friendData" :key="index" >
			<div class="friendItem">
				<div class="friendInfo" @click="toZone(index)">
					<img v-lazy="avatarUrl+item.portrait" alt="" class="friendAvatar">
					<span>{{item.name}}</span>
				</div>
				<div class="friend_btn"  @click="setFollow(index)" v-if="!isFollow[index]">{{follow}}</div>
				<div class="friend_btn"  @click="cancelFollow(index)" v-else>{{followed}}</div> 
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			avatarUrl:'/portrait/',
			follow:'+ 关注Ta',	
			followed:'√ 已关注',
			friend_id:'',
			friend_Data:[],
			isFollow:[]
					
		}
	},
	props:{
		friendData:{
			default(){

			}
		}
	},
	computed:{

	},
	methods:{
    setFollow(index){
      if(localStorage.token){
				if(this.friendData[index].id == this.$store.state.loginData.id){
	        this.$message({
						showClose: true,
						message: '不能关注自己噢'
        	})				
				}else{
					this.isFollow[index] = !this.isFollow
          this.axios.post('setFollow',{ 
              login_user:this.$store.state.loginData,
              zone_data:this.friendData[index],
              follow_status: '√ 已关注'
            }
          )
          .then(res=>{
							this.follow
					})
				}
      }else{
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning'
        })
      }
		},
		cancelFollow(index){
			if(localStorage.token){
				this.isFollow[index] = !this.isFollow
          this.axios.post('setFollow',{ 
              login_user:this.$store.state.loginData,
              zone_data:this.friendData[index],
              follow_status: '+ 关注Ta'
            }
          )
          .then(res=>{
						this.friendData.splice(index,1)
							// this.isFollow[index] = !this.isFollow[index]

						
					})
			}else{
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning'
        })
			}
		}
	},
    toZone(index){      
      let routeUrl = this.$router.resolve({path:'/zone' , query:{user:this.friendData[index].name}})
      window.open(routeUrl.href,'_blank')
    },
	// watch:{
	// 	friendData(newValue,oldValue){		
	// 	for(let i = 0;i<newValue.length;i++){
	// 		if(this.friend_id.indexOf(newValue[i].id)==-1){
	// 			this.friend_id += newValue[i].id+","
	// 			this.friend_Data.push(newValue[i])			
	// 		}
	// 	}
	// 	}

	// },
	beforeUpdate(){
			console.log(this.friendData);
			for(let i=0; i<this.friendData.length;i++){
				 
					if(this.$store.state.loginData.followed_user.indexOf(String(this.friendData[i].id))!==-1){
						// this.follow_status = '√ 已关注'      
						this.isFollow[i] = true
					}else{
						this.isFollow[i] = false
					}
			}

	},
	mounted(){
		setTimeout(()=>{
			console.log(this.friendData);
			
			for(let i=0; i<this.friendData.length;i++){
				 
					if(this.$store.state.loginData.followed_user.indexOf(String(this.friendData[i].id))!==-1){
						// this.follow_status = '√ 已关注'      
						this.isFollow[i] = true
					}else{
						this.isFollow[i] = false
					}
			}
		},100)
	},
}
</script>

<style lang="less">
	.friendItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:20px;
		width: 70%;
		margin: auto;
		.friendInfo{
			height: 60px;
			display: flex;
			align-items: flex-start;
			.friendAvatar{
				width: 60px;
				height: 60px;
				border-radius: 50%;
				margin-right: 10px;
			}
		}
    .friend_btn{
      width: 75px;
      height: 25px;
      background-color: rgb(40, 40, 40);
      color: white;   
      border-radius: 0.2em;
      font-size: 14px;
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