<template>
  <el-carousel :interval="4000" type="card" height='230px'>
    <el-carousel-item v-for="item in pictureList" :key="item.key">
      <img class="medium" :src="item.imageUrl" alt="" >
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  created () {
    this.getPicture()
  },

  data () {
    return {
      // 存储轮播图
      pictureList: []
    }
  },

  methods: {
    async getPicture () {
      const { data: res } = await this.$http.get(
        'banner?type=0'
      )
      if (res.code != 200) return this.$message.error('轮播图获取失败！')
      console.log(res.banners[0].imageUrl)
      this.pictureList = res.banners
    }
  }
}
</script>

<style lang="postcss" scoped>

.medium {
  width: 608px;

}

</style>
