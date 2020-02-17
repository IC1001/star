<template>
  <div>
    <div id="uploadBG"></div> 
    <div id="uploadBar">
      <div class="lhead">
        <img src="@a/icon/up.png" alt="上传图片">
				<div class="color">图片上传</div>
        <i class="el-icon-error" @click="closeBar"></i>
      </div>
      <div class="selectAlbum">
        <div>上传至相册：</div>
        <select  class="upload_album" v-model="album_name">
          <option 
            v-for="item in user_album"
            :key="item"
            :value="item">
            {{item.album_name}}
          </option>
        </select>
          <div class="newbtn" @click="createAlbum">新建相册</div>
          <transition name="el-zoom-in-top">
            <form class="newAlbum" v-if="iscreate" @submit.prevent="postCreate">
              <el-card>
              <label>相册名称：</label>
              <input type="text" v-model="newAlbum" placeholder="相册名称" class="upload_album">
              <div>
              <label>相册类型：</label>
              <select  v-model="newType" class="upload_album">
                <option
                  v-for="item in type"
                  :key="item.value"
                  :value="item.value">
                  {{item.label}}
                </option>
              </select>
              </div>
              <el-button type="primary" class="elbtn"  native-type="submit">创建</el-button>
              <el-button type="info" class="elbtn" @click="createAlbum">取消</el-button>
              </el-card>
            
            </form>  
            </transition>
          <div class="newbtn" @click="upload">上传</div>
        </div>     
      <!-- 上传 -->
      <el-upload
        :action="baseUrl" :data="{album_name:album_name.album_name}"
        list-type="picture-card" :headers="{Authorization : 'Bearer ' + token}"
        :auto-upload="true" id="el_upload" ref="upload" width="80px" :on-preview="handlePictureCardPreview"
        :on-success="upload_success" :before-upload="before_upload" :on-remove="handleRemove">
          <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <span v-for="(item,index) in upload_num" :key="index">
        <input type="text" placeholder="图片标题：" class="el_input" v-model="img_title[item]">
      </span>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      baseUrl:'/upload',
      token:localStorage.token,
      user_album:'',
      album_name:'',
      iscreate:false,
      newAlbum:'',
      newType:'',
      type:[
        {label:'私密',value:'私密'},
        {label:'风景',value:'风景'},
        {label:'人像',value:'人像'},
        {label:'纪实',value:'纪实'},
        {label:'生态',value:'生态'},
        {label:'艺术',value:'艺术'},
      ],
      setImgName:false,
      img_title:[],
      upload_num:0,
    };
  },
  methods: {
    handleRemove(file) {
      if(this.album_name.album_name==null){
        return
      }
      this.axios.post('cancel_upload',{
        file:file,
        album_name:this.album_name.album_name
      }).then(res=>{
        this.upload_num --
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    closeBar(){
      this.$emit('closeBar')
    },
    //新建相册
    createAlbum(){
      this.iscreate = !this.iscreate
    },
    postCreate(){      
      if(this.newAlbum.length>0 && this.newType.length>0){
        this.axios.post('create_album',{
          album_name:this.newAlbum, type:this.newType,
          name:this.$store.state.loginAlbum[0].user_name,
          token:localStorage.token
          }).then(res=>{    
            this.$store.commit('newAlbumData',res.data)
            this.iscreate = false
            this.user_album = this.$store.state.user_album
            this.album_name = res.data
            this.$forceUpdate()
          })
      }else{
        alert('相册名与类型不能为空！')
      }
      
    },
    setCoverThis(file){
      this.axios.post('setCover',file)
      .then(res=>{
        console.log(res);
        
      })
    },
    upload(){
      // console.log(this.$refs.upload_img.url);
      // console.log(file);

      let img_name = ''
      for(let i = 1; i <= this.upload_num; i++){
        if(this.img_title[i] == undefined){
          this.img_title[i] = ''
        }

        img_name += this.img_title[i] + ','
        // img_name.push(this.$refs.i.value + ',')
      }
      // console.log(this.album_name);
      
      this.axios.post('set_img_name',{
        img_name:img_name,
        album_name:this.album_name.album_name
      })
        .then(res=>{
          this.$emit('closeBar')          
          window.location = this.$route.fullPath
        })      
      // this.axios.post('upload',this.$refs.upload_img)
      // this.$refs.upload.submit()
    },
    before_upload(){      
      
      if(this.album_name.album_name==null){
        alert('请选择上传的相册')
        return false
      }

    },
    upload_success(res){

      this.upload_num++
      
    },
  },
  mounted(){
    if(localStorage.token){
      this.user_album = this.$store.state.loginAlbum
      // console.log(this.user_album);
      
    }
  }      
}
</script>

<style lang="less">
  @keyframes rtl{
    from {transform: translateY(25%);opacity: 0.5;}
    to {transform: translateY(0);opacity: 1;}
  }
#uploadBG{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 988;
  background-color: rgba(10, 10, 10, 0.7);
}

#uploadBar{
  position: fixed;
  top: calc(50% - 250px);
  right: 5%;
  height: 500px;
  width: 90%;
  z-index: 9999;
  background-color: white;
  border-radius: 10px;
  animation: rtl 0.5s;
  .elbtn{
    margin:20px 0 0 5px;width:100px;height:20px;line-height:0px;
  }
  .lhead{
    position: absolute;
    top: 0;
    height: 10%;
    width: 100%;
    background-color: rgba(40, 40, 40,0.9);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
		align-items: center;
    font-size: 1.2rem;
    color: white;
		line-height: 70px;
  }
  .el-icon-error{
    position: absolute;
    right: 8px;
    opacity: 0.6;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
  .selectAlbum{
    display: flex;
    align-items: center;
    margin: 70px 0 20px 14px;
    font-size: 16px;
    div{
      margin-right: 10px;
    }
    .newbtn{
 
      background-color:rgba(250, 250, 250,0.9);
      border:0.5px solid rgba(40, 40, 40,0.1);
      color: black;
      height: 30px;

      line-height: 30px;
      padding: 4px;
      border-radius: 5px;
      &:hover{
        background-color: rgba(40, 40, 40,0.9);      
        color: white;
        cursor: pointer;
      }
    }
    .addImg{
      width: 32px;
      height: 32px;
    }
  }
    #el_upload{
      margin: 15px;

    }
    .newAlbum{
      position: absolute;
      background-color: white;
      left: 235px;
      top: 115px;
    }
    .upload_album{
      width: 150px;
      height: 30px;
      margin-right: 20px;
      margin-top: 5px;
      font-size: 16px;
    }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 180px;
    height: 150px;
    div{
      height: 100%;
      width: 100%;
      img{
        object-fit: fill;
      }
    }
  }
  // .el_upload{
  .el_input{
    width: 160px;
    margin-left: 18px;
    border: #1E90FF solid 0.1px;
    padding:5px 0 5px 10px;
    font-size: 17px;
    color: #1E90FF;
      &:focus{
        border: #00BFFF solid 0.2px;
      }
  }

}
@media screen and (min-width:0px) and (max-width:530px){
  #uploadBar{
    .selectAlbum{
      .newbtn{
        height: 50px;
        line-height: 25px;
        text-align: center;
      }
    }
  }
}
</style>