<template>
  <div class="home">

    <!-- 附属nav -->
    <SubNav :status="false" />

    <!-- 路由对应渲染的子页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import SubNav from '../../components/subNav'

export default {
  name: 'Home',
  data () {
    return {
      isStatus: 'true'
    }
  },
  components: {
    SubNav
  }
}
</script>

<style scoped>
</style>
