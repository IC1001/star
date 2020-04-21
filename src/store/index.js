import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginData:'',
    index_data:'',
    zoneData:''
  },

  mutations: {
    setLoginData(state,data){
      state.loginData = data
      console.log(data);
      
    },
    setLoginAlbum(state,data){
      state.loginAlbum = data
    },
    setZoneData(state,data){    
      state.zoneData = data      
    },
    //设置首页展示数据
    setIndexData(state,payload){
      state.index_data = payload            
    },

  },
  actions: {

  },
  modules: {
  }
})
