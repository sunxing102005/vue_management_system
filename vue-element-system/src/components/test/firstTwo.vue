<template>
<div>
  <!-- <h4>我是{{$router.params.name}}</h4> -->
    <el-form >
  <el-form-item label="我要改变主题为">
   <el-input v-model="theme"></el-input>
 </el-form-item>
 </el-form>
<el-button type="primary" round @click="$store.commit('changeAge','min')">我要减少五岁</el-button>
</div>
</template>

<script>
export default {
  name: 'firstOne',
  data(){
    return {
      theme:'',
      age:''
    }
  },
  watche:{
    // theme(val){
    //   $store.commit('changeTheme',val);
    // }

  },
  methods:{
    minAge(){
        $store.commit('changeAge','min');
    }
  }
}
</script>

<style>
</style>
