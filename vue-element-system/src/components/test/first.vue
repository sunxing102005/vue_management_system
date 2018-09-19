<template>
  <div id="first">
  <el-container  class="container">
  <el-header v-if="show"><h2> This is first Page !</h2></el-header>
  <el-main>

    <router-view ></router-view>

</el-main>
</el-container>
  </div>
</template>

<script>
export default {
  name: 'first',
   components:{

  },
  data(){
    return {
      show:false
    }
  },
  watch:{
    '$route'(to,from){
      const s= this.$route;
      if(to.path=='/first'){
        this.show = true;
      }else{
        this.show = false;
      }

    }
  }
}
</script>

<style>
</style>
