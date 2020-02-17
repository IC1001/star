<template>
  <div id="showitem" >
    <div class="showTitle"><slot name="title">美图展示</slot></div>
    <div class="showArea">
      <show-card  v-for="(item,index) in showData" :key="index" :show="item"></show-card>
    </div>
  </div>
</template>

<script>
import ShowCard from '../common/show-card'
export default {
  name:'show-item',
  components:{
    ShowCard
  },
  data(){
    return{
      // showData:this.$store.state.index_data
    }
  },
  props:{
    showData:{
      default(){

      }
    }
  },
  computed:{
    detail(){
      return this.$store.state.detail
    }
  },

  mounted(){
    
  }
}
</script>

<style lang="less">
#showitem{
  .showTitle{
    text-align: center;
    color: #2F4F4F;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .showArea{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 68%;
    margin: auto;
    // min-width: 990px;
  }
  width: 100%;

}
  @media screen and (min-width:0px) and (max-width:530px){
    #showitem .showArea{
      width: 98%;
    }
  }
</style>