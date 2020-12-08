<template>
  <!-- 主体 -->
  <div class="container">
    <div class="center">
      <slot name="content"></slot>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style scoped>

.container {
  width: 980px;
  overflow: hidden;
  margin: 0 auto;
  /* background: orchid; */
  position: relative;
  border: 1px solid #d3d3d3;
  border-top: 0;
  border-bottom: 0;
}
.center{
  width:900px;
  margin: 0 auto;
}
</style>
