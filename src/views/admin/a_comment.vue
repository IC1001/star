<template>
  <div id="com">
    <div v-for="(item,index) in data2" :key="index" >
			<div class="commentItem">
				<div class="commentInfo">
          <img src="@a/icon/user.png" v-if="!item.portrait" class="cAvatar">
					<img v-lazy="avatarUrl+item.portrait" v-else class="cAvatar">
					<span>{{item.from_name}}</span>
          <span style="margin-left:20px;color:grey;font-size:15px;">{{item.date}}</span>
          
				</div>
        <div class="commentContent">{{item.content}}</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  props:{
    data2:{
      dafault(){
        
      }
    }
  },
}
</script>

<style>

</style>