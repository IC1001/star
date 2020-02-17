import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    detail:[
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/7.png'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/7.png'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/7.png'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/7.png'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/4.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
    ],
    detail2:[
      {img:require('@a/slide/1.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/3.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/8.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/9.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/10.png'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/12.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},

    ],
    detail3:[
      {img:require('@a/slide/4.jpg'),path:'',title:'海 波浪',view:1,like:0,collect:0},
      {img:require('@a/slide/5.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},
      {img:require('@a/slide/6.jpg'),path:'',title:'城市黄昏',view:0,like:0,collect:0},
      {img:require('@a/slide/2.jpg'),path:'',title:'清晨幻境',view:0,like:0,collect:0},
      {img:require('@a/slide/8.jpg'),path:'',title:'云',view:0,like:0,collect:0},
      {img:require('@a/slide/9.jpg'),path:'',title:'海浪',view:0,like:0,collect:0},
      {img:require('@a/slide/12.jpg'),path:'',title:'海 波浪',view:0,like:0,collect:0},
      {img:require('@a/slide/1.jpg'),path:'',title:'海滩 日落',view:0,like:0,collect:0},

    ],
    loginData:'',
    loginAlbum:[],
    index_data:'',
    type_data:'',
    detail_data:'',
    zoneData:'',
    user_album:'',
    like_collect_data:'',
    friends:'',
  },

  mutations: {
    setLoginData(state,data){
      state.loginData = data
    },
    setLoginAlbum(state,data){
      state.loginAlbum = data
    },
    setLCdata(state,data){
      state.like_collect_data = data
      
    },
    setFriendData(state,data){

      state.friends = data    
      console.log(state.friends);
        
    },
    setZoneData(state,data){    
      state.zoneData = data      
    },
    //设置相册信息
    setAlbumData(state,payload){
      state.user_album = payload
    },

    //设置首页展示数据
    setIndexData(state,payload){
      state.index_data = payload.index_data                    
    },

    newAlbumData(state,payload){
      state.user_album.push(payload)
    },
    // 类型页数据
    setTypeData(state,payload){
      state.type_data = payload
    },
    // 图片详情展示
    setDetailData(state,payload){
      state.detail_data = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
