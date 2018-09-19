<template>
  <div>
    <div class="demo">
      <div class="p1"><p>life is short </p></div>
      <div class="p1 c1"  style="overflow: hidden">
        <div ><div id="float">life is short </div></div>
        <div><div>time is short </div></div>
        <div><div>long life Baratene </div></div>
      </div>
      <div class="p1"><p>life is short </p></div>
    </div>


    <!--<div class="list">-->
      <!--<div class="cc rowup">-->
        <!--<div class="item">1- 121233fffffr国家认可更健康进口价格困扰</div>-->
        <!--<div class="item">2- 3123233</div>-->
        <!--<div class="item">3- 个人口结构俄跨入国际科技馆客人感觉</div>-->
        <!--<div class="item">4- ggrgerg</div>-->
        <!--<div class="item">5- fvdgdv</div>-->
        <!--<div class="item">6- 德国南部巴士与卡车相撞起火 31人受伤11人死亡朴槿惠庭审时突然昏迷 支持者：她死了法官要负责！</div>-->
        <!--<div class="item">7- 外交部再次回应印军越界:要求立即将越界部队撤回</div>-->
        <!--<div class="item">8- 德国网红致信默克尔</div>-->
        <!--<div class="item">9- 国资委原</div>-->
        <!--<div class="item">1- 121233fffffr国家认可更健康进口价格困扰</div>-->
        <!--<div class="item">2- 3123233</div>-->
        <!--<div class="item">3- 个人口结构俄跨入国际科技馆客人感觉</div>-->
        <!--<div class="item">4- ggrgerg</div>-->
        <!--<div class="item">5- fvdgdv</div>-->
        <!--<div class="item">6- 德国南部巴士与卡车相撞起火 31人受伤11人死亡朴槿惠庭审时突然昏迷 支持者：她死了法官要负责！</div>-->
        <!--<div class="item">7- 外交部再次回应印军越界:要求立即将越界部队撤回</div>-->
        <!--<div class="item">8- 德国网红致信默克尔</div>-->
        <!--<div class="item">9- 国资委原</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>

  <!--<div class="container">-->
    <!--LIFE IS A GIRL.-->
    <!--<div class="list">-->
      <!--<div><div>特别鸣谢</div></div>-->
      <!--<div><div>Charles Yang</div></div>-->
      <!--<div><div>Marvel</div></div>-->
    <!--</div>-->
    <!--Hail Hydra!-->
  <!--</div>-->
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'three',
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
    width: 600px;height: 300px;border: 1px solid #99a9bf;
    position: relative;
    /*padding-top: 100px;*/
    font-size: 16px;
    text-transform: uppercase;
  }
  .p1{
    width: 300px;
    height: 30px;
    /*float: left;*/
  }
  .p1 div div{
    display: inline-block;
    height: 30px;
    /*color:#fff;*/
    margin-bottom: 50px;
    padding: 4px 12px;
  }
  .c1 div:first-child  {
    animation: scrollText 6s linear infinite;
  }
  @keyframes scrollText {
    0% { margin-top: 0px;}
    10% { margin-top: 0px;}
    50% { margin-top: -50px;}
    60% { margin-top: -50px;}
    80% { margin-top:-110px;}
    100% { margin-top:-110px;}
  }
  .c1>div>div{
    display: inline-block;
    height: 30px;
    /*color:#fff;*/
    margin-bottom: 30px;
    padding: 4px 12px;
  }

  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, -307px, 0);
      transform: translate3d(0, -307px, 0);
      display: none;
    }
  }
  .list{
    width: 300px;
    border: 1px solid #999;
    margin: 20px auto;
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .list .rowup{
    -webkit-animation: 10s rowup linear infinite normal;
    animation: 10s rowup linear infinite normal;
    position: relative;
  }

</style>
