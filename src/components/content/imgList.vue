<template>
  <div>
    <div v-for="(item,index) in imgListData.img" :key="index" class="list_item">
      <img v-lazy="baseUrl+item" alt="" @click="onPreview(item)"> 
      <div class="img_info">
        <div>{{imgListData.img_name[index]}}
          <i class="el-icon-edit" @click="change_img_name(index)" v-if="isLoginUser"></i>
        </div>
        <div>
          <span @click="set_cover(item)" v-if="isLoginUser">
            <i class="el-icon-picture-outline-round"></i>
            设为封面            
          </span>
          <i class="el-icon-delete" v-if="isLoginUser"  @click="delete_img(index)"></i>
        </div>
      </div>
    </div>
        <!-- 修改图片名字 -->
        <div v-if="changeBar" class="changeBG">
          <div class="changeBar">
            <input type="text" v-model="change_value" :placeholder="'请设置图片新名称..'">
            <div class="change_btn">
              <el-button size="mini" type="primary" @click.native="post_img_name">确定</el-button>
              <el-button size="mini" type="info" @click.native="changeBar=false">取消</el-button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      baseUrl:'/album/',
      changeBar:false,
      isLoginUser:false,
      change_value:'',
      current:'',
      visible: false,
    }
  },
  props:{
    imgListData:{
      default(){

      }
    }
  },
  methods:{
    onPreview(item){
      this.$emit('onPreview',item)
    },
    set_cover(item){
        this.$alert('设置此张图片为相册封面?', '确认提示', {
          confirmButtonText: '确定',
          callback: action => {
              // this.current = index
              this.axios.post('set_cover',{
                item: item,
                data: this.imgListData,
              }).then(res=>{
                this.$message({
                  type: 'success',
                  message: `已设置成功`,
                  duration:1500
                });
              })

          }
        });
    },
    change_img_name(index){
      this.changeBar = true
      this.current = index
    },
    post_img_name(){
      
      this.axios.post('change_img_name',{
        albumData:  this.imgListData,
        change_value: this.change_value,
        index: this.current
      }).then(res=>{
        this.changeBar=false
        this.imgListData.img_name[this.current]=res.data
        this.change_value = ''
	      this.$message({
          showClose: true,
          type:success,
          message: '修改成功',
          duration:1500
        })
      })
    },
    delete_img(index){
        this.$alert('确定要删除此张图片?', '确认提示', {
          confirmButtonText: '确定',
          callback: action => {
              this.current = index
              this.axios.post('delete_img',{
                index: this.current,
                albumData: this.imgListData,
              }).then(res=>{
                this.imgListData.img.splice(index,1)
                this.imgListData.img_name.splice(index,1)
                this.visible = false
                this.$message({
                  type: 'info',
                  message: `已成功删除`,
                  duration:1500
                });
              })

          }
        });

    }
  },
  beforUpadate(){

  },
  mounted(){
    if(localStorage.token){
      if(this.$store.state.loginData.name == this.$store.state.detail_data.user_name){
        this.isLoginUser = true
      }
    }
  }


}
</script>

<style lang="less">
.list_item{
  // padding: 10px;
  cursor: pointer;
  width:90%;
  margin: 20px auto;
  box-shadow: 1px 1px 11px 2px rgba(97, 97, 97, 0.15);
  padding: 10px;
  &:hover{
    box-shadow: 0px 0px 12px 3px rgba(97, 97, 97, 0.3);
  }

  img{
    width: 100%;
  }
  .img_info{
    display: flex;
    justify-content: space-between;
   
    span{
      margin-left: 4px;  
      &:hover{
        color: #00BFFF;
      }   
    }

    .el-icon-delete{
      margin-left: 4px;
      &:hover{
        color: #FF3030;
      }      
    }      
    }
}
.changeBG{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.4);
  z-index: 998;
  .changeBar{
    height: 16%;
    width: 90%;
    position: absolute;
    left:4%;
    top: calc(50% - 70px);    
    z-index: 999;
    background-color: rgb(250, 250, 250);
    
    border-radius: 0.6em;
    transform: translateY(-50%);
    transition: all 0.6s;
 
    input{
      width: 80%;
      height: 30px;
      margin-left: 9%;
      margin-top: 38px;
      border: #1E90FF solid 0.1px;
      font-size: 1.1em;
      // border-radius: 0.2em;
      padding:5px 0 5px 10px;
      &:focus{
        border: #00BFFF solid 0.2px;
      }

    }
    .change_btn{
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  }

}
</style>