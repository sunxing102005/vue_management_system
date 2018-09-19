<template>
  <div>
  <h3>当前主题为{{$store.state.dialog.theme}}</h3>
  <h3>年龄{{$store.state.dialog.age}}</h3>
  <h3>修改次数{{$store.state.dialog.times}}</h3>
</div>
</template>

<script>
export default {
  name: 'title',

}
</script>

<style>
</style>
