<template>
	<div>
		<div class="head">
			<div class="logo" @click="toHome">
      	<img src="@a/icon.png" alt="网站logo">
				<div class="color">星相册</div>
			</div>
			<div class="login" v-show="test">
        <img :src="avatarUrl+user.portrait"  class="avatar" @click="toOwnZone" v-if="user.portrait" >
        <!-- <img src="@a/icon/user.png" v-else class="avatar"> -->
        <div v-show="user" @click="toOwnZone">{{user.name}}</div>
        <div v-show="user" @click="exit">退出<i class="el-icon-caret-right"></i></div>
				<div @click="isLogin" v-show="!user"><i class="el-icon-user"></i>登录</div>
				<div @click="isRegister" v-show="!user"><i class="el-icon-circle-plus-outline"></i>注册</div>
			</div>
    </div>
    <!-- 登录框 -->
    <div id="login" v-if="clickLogin">
      <div class="lhead">
        <div id="star_img" ><img src="@a/icon/s5.png" alt=""></div>
				<div class="color">登录</div>
        <i class="el-icon-close rt" @click="closeLogin"></i>
      </div>
      <form @submit.prevent="toLogin">
        <div class="inputBar">    
          <div>
            <i class="el-icon-user-solid focus" ></i>      
            <input type="text" placeholder="用户名：" v-model="login.name">
          </div>
          <div>
            <i class="el-icon-lock focus" ></i>      
            <input type="password" placeholder="请输入密码" v-model="login.password">    
          </div>      
        </div>
        <div class="btn_bar">
          <button class="lbtn"  type="submit">登录</button>
          <button class="lbtn" @click="isRegister">前往注册</button>
        </div>
      </form>
    </div>
    <!-- 注册框 -->
    <div id="register" v-if="clickRegister">
      <div class="rhead">
        <!-- <img src="@a/icon.png" alt="网站logo"> -->
        <div id="star_img" ><img src="@a/icon/s4.png" alt=""></div>
				<div class="rtitle">注册</div>
        <i class="el-icon-close rt" @click="closeLogin"></i>
      </div>
      <form @submit.prevent="toRegister">
        <div class="inputBar">
          <div>
            <i class="el-icon-user-solid focus" ></i>
            <input type="text" placeholder="用户名：" 
            v-model="register.name" :class="{err_red:tips==1}">
          </div>
          <div>
            <i class="el-icon-lock focus" ></i>
            <input type="password" placeholder="请输入密码"  @input="tips=0"
            v-model="register.password" :class="{err_red:tips==2}">
          </div>
          <div>
            <i class="el-icon-finished focus" ></i>
            <input type="password" placeholder="请确认密码" @input="tips=0"
            v-model="verify" :class="{err_red:tips==2}">
          </div>
        </div>
        <div class="sex">
          <i class="el-icon-male" @click="sex=1" :class="{male:sex==1}"></i>
          <i class="el-icon-female" @click="sex=0" :class="{womale:sex==0}" ></i>
        </div>
        <div class="btn_bar">
          <button class="rbtn" @click="isLogin">已有账号,返回登录</button>
          <button class="rbtn"  type="submit">注册账号</button>
          
        </div>
      </form>
      <!-- <div class="rbtn2">or</div> -->
      
    </div>
    <div id="model" v-if="clickLogin || clickRegister">
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
    </div>
    
	</div>
</template>
  
<script>
export default {
  data(){
    return{
      clickLogin:false,
      clickRegister:false,
      login:{},
      register:{},
      status:'',
      user:'',
      avatarUrl:'/portrait/',
      adminPage:0,
      verify:'',
      tips:'',
      sex:1,
      test:false
      
    }
  },
  computed:{
    logined(){
      return false
    }
  },
  methods:{
    isLogin(){
      this.clickLogin = true
      this.clickRegister = false
    },
    isRegister(){
      this.clickRegister = true
      this.clickLogin = false
    },
    closeLogin(){
      this.clickLogin = false
      this.clickRegister = false
      this.tips = ''
    },
    toHome(){
      if(this.$route.path=='/'){
        this.adminPage++
        if(this.adminPage == 3 && this.$store.state.loginData.name == 'admin'){
          this.$router.push('/adminxx')
          this.axios.get('/admin')
        }else if(this.adminPage == 3 && this.$store.state.loginData.name == undefined){
          this.test = true
        }
      }else{
        this.$router.push('/')
      }
    },
    toLogin(){
      // this.$router.push('/login')
      if(this.login.name !== undefined || localStorage.token !== undefined){
        if(this.login.password == undefined && localStorage.token == undefined){
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          })        
          return   
        }
        this.axios.post('login',this.login)
        .then((res)=>{
          if(res.data == 'err'){
            this.$message({
              showClose: true,
              message: '用户名或密码错误',
              type: 'warning'
            })
            this.login.name = ''
            this.login.password = ''
            return
          }   
          if(res.data.token){
            this.$store.commit('setAlbumData',res.data.user_album)
            this.$store.commit('setZoneData',res.data.user_info)
            this.$store.commit('setLoginData',res.data.user_info)
            this.$store.commit('setLoginAlbum',res.data.user_album)
            this.clickLogin = false          
            this.user = res.data.user_info
            localStorage.user = res.data.user_info.name
            if(!localStorage.token){
              localStorage.token = res.data.token
              window.location.href = '/'
            }
            }
            
   
          })
      }else{
        this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        })          
      }

        

    },
    toRegister(){
      // this.$router.push('/register')
      if(this.register.name!==undefined&&this.register.password!==undefined && this.verify!==''){
        if(this.verify == this.register.password){
          this.register.sex = this.sex
          this.axios.post('register',this.register)
                .then((res)=>{          
                  if(res.data.token){
                    localStorage.token = res.data.token
                    this.clickRegister = false
                    // this.user = res.data.user_info.name
                    // this.toLogin()
                    // window.alert('欢迎你 ' + this.user)
                    window.location.href = '/'
                    
                  }else{
                    this.tips = 1
                    this.$message({
                      showClose: true,
                      message: '用户名已存在',
                      type: 'warning'
                    })
                  }
                })
                .catch(function(err){
                  console.log(err);
                  
                })   
        }else{
          this.tips = 2
          this.$message({
            showClose: true,
            message: '两次密码不一致',
            type: 'warning'
          })
        }
      }else{
        this.$message({
          showClose: true,
          message: '请先输入',
          type: 'warning'
        })        
      }

         
      
      
    },
    //个人空间
    toOwnZone(){
      let ownzone = this.$router.resolve({path:'/zone' , query:{user:this.user.name}})
      window.open(ownzone.href,'_blank')    
    },
    exit(){
      localStorage.removeItem('token')
      window.location.href = '/'
    }
  },
  created(){
    if(localStorage.token){
      this.toLogin()
      this.test = true
    }
  }

}
</script>

<style lang="less">
@ycolor:#fdd000;
@keyframes star {
  0%{
    top: 0;
    opacity: 1;
  }
  15%{
    top:1990px;
    left: -50%;
    opacity: 0;
  }
  100%{
    top: 2000px;
    left: 0;
    opacity: 0;
  }
}
@keyframes star2 {
  0%{
    top: 0;
    opacity: 1;
  }
  10%{
    top:1990px;
    left: 4%;
    opacity: 0;
  }
  100%{
    top: 2000px;
    left: 0;
    opacity: 0;
  }
}
@keyframes star3 {
  0%{
    top: 0;
    opacity: 1;
  }
  10%{
    top:1990px;
    left: -90%;
    opacity: 0;
  }
  100%{
    top: 2000px;
    left: 0;
    opacity: 0;
  }
}
#model{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background-color: rgba(10, 10, 10, 0.9);
  .star:nth-child(1){
    position: absolute;
    left: 30%;
    top: -50%;
    height: 200px;
    width: 1px;
    background: linear-gradient(-45deg, white, rgba(0, 0, 0, 0));
    border-radius: 999px;
    animation: star3 26s ease-out 3s infinite;
    transform:rotate(55deg);
  }
  .star:nth-child(2){
    position: absolute;
    left: 50%;
    top: -50%;
    height: 200px;
    width: 1px;
    background: linear-gradient(-45deg, white, rgba(0, 0, 0, 0));
    border-radius: 999px;
    animation: star 10s ease-out 9s infinite;
    transform:rotate(40deg);
  }
  .star:nth-child(3){
    position: absolute;
    left: 70%;
    top: -50%;
    height: 200px;
    width: 1px;
    background: linear-gradient(-45deg, white, rgba(0, 0, 0, 0));
    border-radius: 999px;
    animation: star2 15s ease-out 16s infinite;
    transform:rotate(30deg);
  }
  .star:nth-child(4){
    position: absolute;
    left: 90%;
    top: -50%;
    height: 200px;
    width: 1px;
    background: linear-gradient(-45deg, white, rgba(0, 0, 0, 0));
    border-radius: 999px;
    animation: star 18s ease-out 13s infinite;
    transform:rotate(50deg);
  }
  // .star:nth-child(5){
  //   position: absolute;
  //   left: 98%;
  //   top: -50%;
  //   height: 200px;
  //   width: 1px;
  //   background: linear-gradient(-45deg, white, rgba(0, 0, 0, 0));
  //   border-radius: 999px;
  //   animation: star 7s ease-out 1s infinite;
  //   transform:rotate(50deg);
  // }
}

.avatar{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}
#register{

  position: fixed;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  height: 300px;
  width: 400px;
  z-index: 9999;
  // background-color: rgba(10, 10, 10, 0.9);
  color: white;
  border-radius: 10px;
  #star_img{
    position: absolute;

    z-index: -1;
    top: -25px;
    left: -18%;
    img{
      width: 60px;
      height: 60px;
    }
  }
  .rhead{
    position: absolute;
    top: -10px;
    height: 15%;
    width: 100%;
    // background-color: rgba(40, 40, 40,0.9);
    display: flex;
		align-items: center;
		font-size: 1.5rem;
    color: rgb(245, 245, 245);
    // font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 20px;
   // padding: 10px;
    // line-height: 70px;
    .rtitle{
      border-bottom: #00CED1 solid 4px;
      padding-bottom: 10px;
    }
  }

  .inputBar{
    margin:60px 0 20px 0px;
    // text-align: center;
    div{
      position: relative;
      .focus{
        font-size: 16px;
        color: rgb(235, 235, 235);
        position: absolute;
        left: 2px;
        top: 16px;
        opacity: 1;
        &:hover{
          color: #00CED1;
        }
      }
      input{
        width: 100%;
        height: 30px;
        margin-top: 10px;
        padding-left: 25px;
        background-color: transparent;
        border: 0px;
        border-bottom: 1px solid #53868B;
        color: white;
        font-weight: 600;
        &:focus {
          border: 0;
          border-bottom: 1px solid #00CED1;
          outline: 0;
        }
      }
        .err_red{
          border-bottom: 1px solid #EE3B3B;
        }
      span{
        color: red;
      }
    }
  }
  .rt{
    position: absolute;
    right: -30px;
    opacity: 0.6;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
  .sex{
    display: flex;
    justify-content: space-around;
    i{
      cursor: pointer;
      font-size: 20px;
        &:first-child{
          &:hover{
            color: #00BFFF;
          }
        }
        &:last-child{
          &:hover{
            color: #FFC1C1;
          }
        }
    }
    .male{
      color: #00BFFF;
    }
    .womale{
      color: #FFC1C1;
    }
  }
  .btn_bar{
    display: flex;
    justify-content: space-around;
    width: 100%;
    .rbtn{
      background-color: transparent;
      color: rgb(235, 235, 235);
      // font-weight: 600;
      width: 40%;
      height: 30px;
      margin-top: 16px;
      font-size: 16px;
      
      cursor: pointer;    
      border: #00CED1 solid 1px;
      &:hover{
        border: #00F5FF solid 1px;
        color: rgb(255, 255, 255);
      }
    }
  }

}

#login{
  position: fixed;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  height: 300px;
  width: 400px;
  z-index: 9999;
  // background-color: rgba(10, 10, 10, 0.9);
  color: white;
  border-radius: 10px;
    #star_img{
      position: absolute;

      z-index: -1;
      top: -25px;
      left: -18%;
    img{
      width: 80px;
      height: 80px;
    }
  }
  .lhead{
    position: absolute;
    top: -10px;
    height: 15%;
    width: 100%;
    // background-color: rgba(40, 40, 40,0.9);
    display: flex;
		align-items: center;
		font-size: 1.5rem;
    color: rgb(245, 245, 245);
    // font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  .inputBar{
    margin:60px 0 20px 0px;
    div{
      position: relative;
      .focus{
        font-size: 16px;
        color: rgb(235, 235, 235);
        position: absolute;
        left: 2px;
        top: 16px;
        opacity: 1;
        &:hover{
          color: #00CED1;
        }
      }
      input{
        width: 100%;
        height: 30px;
        margin-top: 10px;
        padding-left: 25px;
        background-color: transparent;
        border: 0px;
        border-bottom: 1px solid #53868B;
        color: white;
        font-weight: 600;
        &:focus {
          border: 0;
          border-bottom: 1px solid #00CED1;
          outline: 0;
        }
      }
        .err_red{
          border-bottom: 1px solid #EE3B3B;
        }
      span{
        color: red;
      }
    }
  }
  .rt{
    position: absolute;
    right: -30px;
    opacity: 0.6;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
  .btn_bar{
    display: flex;
    justify-content: space-around;
    width: 100%;
    .lbtn{
      background-color: transparent;
      color: rgb(235, 235, 235);
      // font-weight: 600;
      width: 40%;
      height: 30px;
      margin-top: 16px;
      font-size: 16px;
      
      cursor: pointer;    
      border: #00CED1 solid 1px;
      &:hover{
        border: #00F5FF solid 1px;
        color: rgb(255, 255, 255);
      }
    }
  }
}
.head{
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgb(40, 40, 40);
	height: 50px;
	width: 100%;
	// min-width: 990px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 100;
	.logo{
		display: flex;
		align-items: center;
		font-size: 1.4rem;
		color: #fdd000;
		line-height: 70px;
    margin-left: 1%;
    cursor: pointer;
	}
	.login{
		// position: absolute;
    display: flex;
    align-items: center;
		color: white;
		font-size: 1rem;
    margin-right: 1%;
    cursor: pointer;
		div{
			margin-left: 20px;
			i{
				margin-right: 6px;
			}
		}
	}
}

  @media screen and (min-width:0px) and (max-width:530px){
    #login{
      width: 300px;
      left: 10%;
        #star_img{
          top: -25px;
          left: -22%;
        }
    }
    #register{
      width: 300px;
      left: 10%;
      #star_img{
        top: -25px;
        left: -22%;
      }    
    }
  }
</style>