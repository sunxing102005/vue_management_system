<template>
<div>
    <!--<div class="demo-input-suffix">-->


    <!--<el-row>-->
    <!--<el-col :span='4'>  属性方式：</el-col>-->
    <!--<el-col :span='10'>-->
    <!--<el-input-->
    <!--placeholder="请选择日期"-->
    <!--suffix-icon="el-icon-date">-->
    <!--</el-input>-->
    <!--</el-col>-->
    <!--<el-col :span='10'>-->
    <!--<el-input-->
    <!--placeholder="请输入内容"-->
    <!--prefix-icon="el-icon-search">-->
    <!--</el-input>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</div>-->
    <div style="width: 600px;height: 300px;border: 1px solid #99a9bf">
    <el-button @click="show=!show">
      toggleRender
    </el-button>
    <transition name="tdiv">
      <div v-if="show" style="height: 200px;width: 300px;background-color: aqua "></div>
    </transition>
  </div>


  <div style="width: 600px;height: 300px;border: 1px solid #99a9bf">
    <button @click="show1 = !show1">Toggle show</button>
    <transition name="bounce" mode="in-out">
      <p v-if="show1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia
        diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
    </transition>
  </div>

  <div style="width: 600px;height: 300px;border: 1px solid #99a9bf">
    <transition  name="fade" >
      <button v-if="show3==true" key="edit" @click="toggleButton">Edit</button>
      <button v-else key="add" @click="toggleButton">add</button>
    </transition>
    <!--<transition mode="in-out" name="with-mode-fade">-->
      <!--<button v-if="show4==true" key="edit" @click="show4=!show4">Edit</button>-->
      <!--<button key="add" @click="show4=!show4">add</button>-->
    <!--</transition>-->
    <!--<transition-group name="fade">-->
      <!--<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">-->
          <!--<span v-if="index==levelList.length-1" class="no-direct">-->
            <!--{{item.meta.title}}-->
          <!--</span>-->
        <!--<router-link v-else :to="item.redirect||item.path">  {{item.meta.title}}</router-link>-->
      <!--</el-breadcrumb-item>-->
    <!--</transition-group>-->
  </div>

  <div style="width: 600px;height: 300px;border: 1px solid #99a9bf">
    <button v-on:click="shuffle">Shuffle</button>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list-complete" tag="p" class="">
      <span v-for="(item,index) in items" :key="item" class="list-complete-item">
        {{item}}
      </span>
    </transition-group>
  </div>

  <div id="flip-list-demo" class="demo">
    <button v-on:click="shuffle">Shuffle</button>
    <transition-group name="flip-list" tag="ul">
      <li v-for="item in items" v-bind:key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>

</div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'four',
    data() {
      return {
        show: false,
        show1: false,
        show3: true,
        show4: true,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10
      }
    },
    watched: {},
    methods: {
      toggleButton() {
        this.show3 = !this.show3;
      },
      shuffle() {
        this.items = _.shuffle(this.items);
      },
      randomIndex() {
        return Math.floor(Math.random() * this.items.length);
      },
      add() {
        this.items.splice(this.randomIndex(), 0, this.nextNum++);
      },
      remove() {
        this.items.splice(this.randomIndex(), 1)
      }
    }
  }
</script>

<style>
  .demo{
    width: 600px;height: 300px;border: 1px solid #99a9bf
  }

  .tdiv-enter-active {
    transition: all 1s linear;
  }

  .tdiv-leave-active {
    transition: all 5s ease;
  }

  .tdiv-enter {
    transform: translateY(100px);
    background-color: #99a9bf;

  }

  .tdiv-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }

  .out {
    height: 300px;
    width: 500px;
    background-color: aqua;
    transition: all 500ms linear 100ms;
  }

  .out:hover {
    transform: translateX(100px);
    background-color: aquamarine;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .fade-enter-active {
    transition: all .5s;

  }

  .fade-leave-active {
    transition: all .5s;
    /*position: absolute;*/
  }

  /*.fade-move {*/
  /*transition: all 2s;*/
  /*}*/
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  .with-mode-fade-enter-active, .with-mode-fade-leave-active {
    transition: opacity .5s
  }

  .with-mode-fade-enter, .with-mode-fade-leave-to {
    opacity: 0;
    position: absolute;
  }

  .with-mode-fade-leave-active {
    position: absolute;
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    /*position: absolute;*/
  }

  .list-complete-move {
    transition: transform 1s;
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
