<template>
  <div class="header">
    <h1>
      <span class="logo"></span>
      <span>Jine_are Music</span>
      <a href="#"></a>
    </h1>

    <ul class="Hmenu">
      <li
        class="Hli"
        v-for="(item, index) in menuList"
        :key="item.name"
        :class="[
          { hoverColor: isStatus === index },
          { bottomSign: isStatus === index },
        ]"
        @click="changeHoverColor(index)"
      >
        <router-link class="router" :to="item.router">{{
          item.name
        }}</router-link>
      </li>
    </ul>

    <div class="search">
      <span class="search_icon"></span>
      <input type="text" :placeholder="search" />
    </div>

    <div class="author">
      <a href="#" class="btn">个人版：Jine_are</a>
    </div>

    <div class="user">
      <ul class="list">
        <li v-for="list in userList" :key="list.name">
          <img :src="list.icon" alt="" />
          <a href="#">{{ list.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      menuList: [
        { name: '发现音乐', router: '/home' },
        { name: '我的音乐', router: '/music' },
        { name: '朋友', router: '/friend' },
        { name: '商城', router: '/store' },
        { name: '音乐人', router: '/musician' },
        { name: '下载客户端', router: '/client' }
      ],

      search: '音乐/视频/电台/用户',
      isStatus: 0,

      userList: [
        { name: '我的主页', icon: require('./img/个人中心.png') },
        { name: '我的信息', icon: require('./img/邮箱.png') },
        { name: '我的等级', icon: require('./img/等级.png') },
        { name: 'VIP会员', icon: require('./img/vip.png') },
        { name: '个人设置', icon: require('./img/设置.png') },
        { name: '实名认证', icon: require('./img/实名.png') },
        { name: '退出', icon: require('./img/退出.png') }
      ]
    }
  },

  methods: {
    changeHoverColor (index) {
      return (this.isStatus = index)
    }
  }
}
</script>

<style lang="postcss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: #ccc;
}

.header {
  width: 1300px;
  height: 69px;
  background-color: #242424;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  display: flex;
}

h1 {
  width: 200px;
  height: auto;
  float: left;
  display: flex;
  margin-left: 3px;
}

.logo {
  display: block;
  width: 35px;
  height: 35px;
  background: url("./img/网易云.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
}

h1 a {
  width: 176px;
  height: 69px;
  position: absolute;
  top: 0px;
  left: 0px;
  color: #ccc;
}

h1 span {
  margin-left: 5px;
  align-self: center;
  font-size: 22px;
}

.Hmenu {
  height: 100%;
  display: flex;
  list-style: none;
  float: left;
}

.Hmenu .Hli {
  height: 100%;
  width: 70px;
  align-self: center;
  font-size: 18px;
  margin-left: 20px;
  font-size: 14px;
  color: #ccc;
  position: relative;
}

.Hmenu li:first-child {
  margin-left: 0px;
}

.Hmenu li a {
  line-height: 69px;
}

/* 动态给当前选中的元素添加hover色和绑定底部小三角 */

.bottomSign::after {
  content: "▲";
  color: #c20c0c;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -5px;
}

.router {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
}

.hoverColor {
  background-color: black;
}

.Hmenu li:hover {
  background-color: black;
}

.Hmenu .Hli:last-child::before {
  content: "";
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  right: -25px;
  background: url("./img/HOT.png");
  background-size: cover;
}

.search {
  width: 158px;
  height: 32px;
  float: left;
  background-color: #fff;
  align-self: center;
  border-radius: 32px;
  margin-left: 50px;
  position: relative;
}

.search_icon {
  display: block;
  position: absolute;
  margin-left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  width: 20px;
  height: 20px;
  background: url("./img/搜索框.png");
  background-size: cover;
}

.search input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 32px;
  outline: none;
  padding-left: 20px;
  position: absolute;
  margin-left: 10px;
  top: 0;
  left: 2px;
}

.author {
  float: left;
  width: 100px;
  height: 32px;
  align-self: center;
  margin-left: 35px;
  padding: 0;
  box-sizing: border-box;
  padding-left: 16px;
  border: 1px solid #4f4f4f;
  background-position: 0 -140px;
  line-height: 33px;
  border-radius: 20px;
  position: relative;
  font-size: 12px;
}

.author:hover {
  border: 1px solid #fff;
}

.btn {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.user {
  width: 30px;
  height: 30px;
  float: left;
  background: url("./img/user.jpg");
  border-radius: 30px;
  margin-left: 22px;
  align-self: center;
  cursor: pointer;
  font-size: 12px;
}

.user .list {
  display: none;
  list-style: none;
  width: 150px;
  color: #ccc;
  position: relative;
  top: 38px;
  right: 60px;
  background: #2b2b2b;
  border: 1px solid #202020;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  text-align: center;
  padding: 0;
  z-index: 99;
}

.user:hover .list {
  display: block;
}

.user .list li:first-child::before {
  content: "▲";
  display: block;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: #434242;
}

.user .list li {
  margin-top: 0;
  height: 34px;
  line-height: 34px;
}

.user .list li:hover {
  background-color: #353535;
}

.user .list img {
  width: 18px;
  height: 18px;
  position: absolute;
  left: 30px;
  margin-top: 8px;
}

.user .list a {
  position: relative;
  left: 13px;
  font-size: 12px;
}
</style>
