<template>
<div>
  <el-container>
    <el-aside><h3>我是 second </h3></el-aside>
    <el-container>
      <el-header>header</el-header>
    <el-main>
      <div style="width:200px;height:90px">
      <el-input placeholder='choose date' suffix-icon='el-icon-date' width='40px'></el-input>
      <el-input placeholder='choose content' suffix-icon='el-icon-search'></el-input>
    </div>
       <el-button type="primary" round @click="$store.dispatch('clearAll')">点我清空title信息</el-button>
    </el-main>
    <el-footer>Footer</el-footer>
    </el-container>
  </el-container>

</div>
</template>

<script>
export default {
  name: 'firstOne',
  data(){
    return {

    }
  },
  watche:{

  },
  methods:{
    clearStore(){
        $store.dispatch('clearAll');
    }
  }
}
</script>

<style>
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
</style>
