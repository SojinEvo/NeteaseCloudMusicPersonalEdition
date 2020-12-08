<template>
  <div class="bottom">
    <span class="icon"></span>
    <span class="text">{{ playCount }}</span>
    <span class="play" @click="sends(id)"></span>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      idArry: []
    }
  },
  props: {
    playCount: Number,
    id: Number
  },
  methods: {
    async sends (id) {
      // 根据id获取歌单详情
      const { data: res } = await this.$http.get(`playlist/detail?id=${id}`)
      if (res.code != 200) return this.$message.error('歌单详情上架获取失败！')
      const arry = res.playlist.tracks
      // 将当前点击的歌单的id添加到store中
      for (let i = 0; i < arry.length; i++) {
        this.idArry.push(arry[i].id)
      }
      this.$store.commit('setarr', this.idArry)
    }
  }
}
</script>

<style scoped>
.bottom {
  width: 140px;
  height: 27px;
  background-color: #110c0b;
  position: absolute;
  opacity: 0.55;
  bottom: 0;
  color: #fff;
  display: flex;
  align-items: center;
}

.bottom .icon,
.bottom .play {
  width: 16px;
  height: 16px;
  display: block;
  background: url(iconall.png);
  background-position: 0 -24px;
  margin-left: 15px;
}

.bottom .icon {
  margin-top: 7px;
  margin-right: 3px;
}

.bottom .play {
  background-position: 0 0;
  cursor: pointer;
  position: absolute;
  right: 13px;
}

.bottom .text {
  margin-top: 5px;
}
</style>
