<template>
  <div>
    <albumZ :show="data"  :isedit="isedit"></albumZ>
  </div>
</template>

<script>
import albumZ from "@c/content/albumZ"
export default {
  data(){
    return{
      isedit:true
    }
  },
  components:{
    albumZ
  },
  props:{
    data:{
      dafault(){

      }
    }
  },
  created(){
    this.axios.get('admin')
  },
}
</script>

<style>

</style>