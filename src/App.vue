<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- 返回顶部 -->
    <!-- <BackTop /> -->
    <Footer />
    <!-- 音乐播放 -->
    <MusicPlay />
  </div>
</template>

<script>
// 头组件
import Header from './components/header'
// 尾组件
import Footer from './components/footer'
// 返回顶部
// import BackTop from "./components/backTop";
// 音乐
import MusicPlay from './components/musicPlay/index.vue'

export default {
  name: 'app',
  components: {
    Header,
    // BackTop,
    MusicPlay,
    Footer
  },

  watch: {
    $route: function (to, from) {
      // from 对象中包含当前地址
      // to 对象中包含目标地址
      // 其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-user-select: none;
  -webkit-user-select: none;
   user-select: none;
}

html,
body {
  overflow-x: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  color: #34495e;
  font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 0;
}
</style>
