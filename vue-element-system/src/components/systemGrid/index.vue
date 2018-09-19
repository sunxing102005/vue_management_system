<template>
<div>

  <el-tabs type="border-card">
  <el-tab-pane label="用户管理">
    <v-table></v-table>
  </el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
</div>
</template>

<script>
// import userMan from '../userMan'
import table from '@/views/table'
import breadcrumb from '@/components/breadcrumb/index'
export default {
  name: 'systemGrid',
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

  },
  components:{
    // userMan,
    'v-table':table,
      'v-breadcrumb':breadcrumb
  }
}
</script>

<style>
</style>
