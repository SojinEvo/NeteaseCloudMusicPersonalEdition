<template>
  <div class="con">
    <div class="musicList" v-for="item in data" :key="item.id">
      <div class="top">
        <img class="Limg" :src="item.coverImgUrl" alt="" />
        <div class="Rcontent">
          <h3 class="title">{{ item.name }}</h3>
          <a href="#" class="play"></a>
          <a href="#" class="add"></a>
        </div>
      </div>
      <ul class="list">
        <li v-for="(ele,index) in item.tracks" :key="ele.first">
          <span class="num">{{index}}</span>
          <a href="#" class="name">{{ele.first}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style scoped>
.con {
    width: 700px;
    overflow: hidden;
}
.musicList {
  width: 230px;
  /* height: 472px; */
  border: 0.5px solid #d3d3d3;
  /* background: rosybrown; */
  float: left;
  margin-bottom: 20px;
}

.top {
  height: 120px;
  /* background: royalblue; */

  display: flex;
  justify-content:center;
  align-items:center;

}

.list {
  list-style: none;
  font-size: 12px;
  color: #333;
  /* background: seagreen; */
}
.Limg {
  width: 80px;
  height: 80px;
  background: rgb(149, 171, 23);

}

.Rcontent {
  width: 116px;
  height: 80px;
  /* background: orangered; */
  position: relative;

}

.title {
  display: block;
  position: relative;
  font-size: 14px;
  margin-top: 10px;

}

.play,
.add {
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  left: -10px;
  margin-top: 10px;
  margin-left: 10px;
}

.play {
  background: url(./img/播放.png);
  background-repeat: no-repeat;
  background-size: contain;

}

.add {
  background: url(./img/添加.png);
  background-repeat: no-repeat;
  background-size: contain;

}

.list li {
  width: 100%;
  height: 32px;
  position: relative;
  line-height: 32px;
}

.list li:nth-child(2n + 1) {
  background: #e6e6e6;
}

.num {
  margin-left: 0px;
  position: absolute;
  left: 35px;
}

.num:nth-child(-n + 3) {
  color: red;
}
.name {
  text-decoration: none;
  color: #000;
  vertical-align: middle;
}
</style>
