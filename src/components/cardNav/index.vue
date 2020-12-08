<template>
    <!-- 卡片nav -->
  <div class="cardNav">
    <!-- 默认圆圈图标 -->
    <span class="icon"></span>
    <!-- 标题插槽 -->
    <a class="title"><slot name="title"></slot></a>
    <!-- 附属插槽 -->
    <slot name="sugar" ></slot>
    <!-- 其他插槽 -->
    <a class="more"><slot name="other">更多</slot></a><span class="arrow"></span>
  </div>
</template>

<script>
import { title } from 'process'
export default {}
</script>

<style scoped>
.cardNav {
  width: 689px;
  height: 35px;
  font-size: 12px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  border-bottom: 2px solid #c10d0c;
  line-height: 35px;
  margin-bottom: 20px;
}
.cardNav .icon {
  width: 18px;
  height: 18px;
  display: block;
  background-image: url(./img/圆圈.png);
  background-size: contain;
  float: left;
  position: relative;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  font-size: 20px;
  font-weight: normal;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  position: absolute;
  left: 0;
  margin-left: 30px;
}

.more {
  position: absolute;
  right: 15px;
  cursor: pointer;
  margin-right: 13px;
}

.arrow {
  width: 12px;
  height: 12px;
  display: block;
  background-image: url(./img/右箭头.png);
  background-size: contain;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
   margin-right: 15px;
}
</style>>
