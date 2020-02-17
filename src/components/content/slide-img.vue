<template>
  <div id="slide">
    <el-carousel :interval="4000" type="card"  id="slideA">
      <el-carousel-item v-for="(item,index) in slideimg" :key="index">
        <img :src="baseUrl+item.img" id="slideImg" @click="changeDisplay(item.img)">
      </el-carousel-item>
    </el-carousel>
    <el-carousel :interval="4000"  id="slideB">
      <el-carousel-item v-for="(item,index) in slideimg" :key="index">
        <img :src="baseUrl+item.img" id="slideImg" @click="changeDisplay(item.img)">
      </el-carousel-item>
    </el-carousel>
    <div id="dialog_img"  v-show="isdisplay" >
      <div @click="isdisplay=false">
        <i class="el-icon-circle-close" id="back_i"></i>
      </div>
      <img :src="baseUrl+previewImg" alt="" >
    </div>
  </div>
</template>

<script>
export default {
  name:'slide-img',
  data(){
    return{
      baseUrl:'/banner/',
      slideimg:[
        {img:'1.jpg'},
        {img:'2.jpg'},
        {img:'3.jpg'},
        {img:'4.jpg'},
        {img:'5.jpg'},
      ],
      isdisplay:false,
      previewImg:'1.jpg'
    }
  },
  methods:{
    changeDisplay(item){
      this.isdisplay = true
      this.previewImg = item
      
      
    },
  },
  created(){
    this.axios.get('banner')
    .then(res=>{

    })
  }
}
</script>

<style lang="less">

#slide{
  body{
    background-color: #fff;
  }
  width: 68%;
  margin: 0 auto;
  #slideImg{
    width: 100%;
    height: 100%;
  }
  #slideA{
    width: 100%;
    height: 100%;
  }
  #slideB{
    width: 100%;
    height: 100%;
    display: none;
  }
}
#dialog_img{
  div{
    position: fixed;
    width:100%;
    height:100%;    
    z-index: 9998;
    top: 0;
    left: 0;
    background-color: rgba(10, 10, 10, 0.4);
    cursor: pointer;
    #back_i{
      position: fixed;
      top: 3%;
      right: 3%;
      font-size: 40px;
      color: white;
      opacity: 0.8;
      &:hover{
        opacity: 1;
      }
    }
  }
  img{
    position: fixed;
    width:88%;
    height:88%;    
    z-index: 9999;
    top: 6%;
    left: 6%;
    object-fit: contain;
  }
}
  @media screen and (min-width:0px) and (max-width:530px){
    #slide{
      width: 98%;
      margin-bottom: 30px;
    }
    #slide #slideA{
      display: none;
    }
    #slide #slideB{
      display:block;
    }
  }
  @media screen and (min-width:530px) and (max-width:1400px){
    #slide #slideImg{
      height: 90%;

    }
  }
</style>