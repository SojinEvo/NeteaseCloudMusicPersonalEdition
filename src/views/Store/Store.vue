<template>
  <div class="store">
    <!-- 附属nav -->
    <SubNav :status='true' />

    <h2>我是friend</h2>
    <div class="content"></div>

  </div>
</template>

<script>
import SubNav from '../../components/subNav'
import RotationChart from '../../components/rotationChart'
export default {
  name: 'Store',
  components: {
    SubNav,
    RotationChart
  }
}
</script>

<style lang="postcss" scoped>
.content {
  width: 100%;
  height: 500px;
  background: lightcoral;
}
</style>
