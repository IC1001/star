<template>
  <div id="nav">
    <div v-for="(item,index) in titles" :key="index" class="navBar" 
    @click="toType(item.title,index)" :class="{isActive:mark===index}">
      <div>{{item.title}}</div>
      <!-- <div class="hoverBar">
      <div  v-for="(citem,index) in item.cTitles" :key="index">
        {{citem.ctitle}}
      </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mark:999
    }
  },
  props:{
    titles:{
      default(){

      }
    }
  },
  methods:{    
    toType(title,index){
      if(this.$route.path.indexOf('admin')==-1){
        if(title == '首页') {
          this.$router.push('/')  
        }else {
          this.$router.push('/type' + title) 
          this.axios.post('/type'+title,{title:title})
          .then(res=>{          
            this.$store.commit('setTypeData',res.data)
            this.mark = index
          })
        }
      }else if(this.$route.path.indexOf('admin')!==-1){
        this.$router.push('/admin'+title) 
      }
      
    }
  },
  created() {
    for( let i = 0; i < this.titles.length; i++){
      if(this.titles[i].title.indexOf(this.$route.params.title) != -1) {
        this.mark = i
      }
      
    }
     
  }
}
</script>

<style lang="less">
#nav{
  position: relative;
  height: 70px;
  width: 68%;
  margin-top: 50px;
  margin: 50px auto 25px auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
  font-size: 1.25rem;
  margin-bottom: 25px;
  .navBar{
    padding:16px;
  }
  .navBar:hover{
    cursor: pointer;
    color: #2F4F4F;
    font-weight: 600;
    border-radius: 10px;
  }
  .isActive{
    color: #2F4F4F;
    font-weight: 600;
    border-bottom: #2F4F4F solid 2px;
  }
}

  @media screen and (min-width:0px) and (max-width:530px){
    #nav {
      width: 98%;
    }
  }
</style>