<template>
  <div class="sideNav">
    <h3 class="title">
      <!-- 标题名插槽 -->
      <span class="titleName"><slot name="titleName"></slot></span>
      <!-- 扩展插槽 -->
      <span class="more"><slot name="more"></slot></span>
    </h3>

    <ul class="contentList">
      <li v-for="item in dataList" :key="item.name">
        <img :src="item.img" alt="" srcset="" class="picture" />
        <div class="info">
          <h3 class="name">{{ item.name }}</h3>
          <span class="desc">{{ item.desc }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array
  }
}
</script>

<style scoped>
.sideNav {
  width: 250px;
  margin-top: 10px;
  /* background: tomato; */
  padding: 0 20px;
  font-size: 12px;
  color: #333;
  margin-bottom: 30px;
}
.title {
  width: 210px;
  height: 24px;
  /* background: violet; */
  border-bottom: 1px solid rgb(58, 69, 150);
  color: #333;
  position: relative;
  line-height: 24px;
}

.titleName {
  position: absolute;
  left: 0;
}
.more {
  position: absolute;
  right: 0;
  color: #666;
  font-weight: normal;
  font-size: 12px;
}

.contentList {
  list-style: none;
  margin-top: 10px;
}

.contentList li {
  width: 210px;
  height: 62px;
  /* background: red; */
  margin-top: 10px;
}

.picture {
  width: 62px;
  height: 62px;
  float: left;
  /* background: yellowgreen; */
}

.info {
  width: 148px;
  height: 62px;
  float: left;
  /* background: rgb(68, 14, 14); */
  padding-left: 2px;
  border: 1px solid #e9e9e9;
}

.info .name {
  color: #333;
  position: relative;
  top: 5px;
  margin-left: 0;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info .desc {
  color: #666;
  position: relative;
  bottom: -20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
