<template>
  <div class="subNav">
    <ul class="Nmenu">
      <li
        class="Nli"
        v-for="(item, index) in subMenuList"
        :key="item.name"
        :class="{ control: isStatus, addBackground: count === index }"
        @click="changeHoverColor(index)"
      >
        <router-link class="router" :to="item.router">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subMenuList: [
        { name: '推荐', router: '/home/' },
        { name: '排行榜', router: '/home/rankingList' },
        { name: '歌单', router: '/home/songSheet' },
        { name: '主播电台', router: '/home/radioStation' },
        { name: '歌手', router: '/home/singer' },
        { name: '新碟上架', router: '/home/newDisc' }
      ],
      isStatus: this.status,
      count: 0
    }
  },
  props: {
    status: Boolean,
    required: true
  },

  created () {
    console.log('aaa', this.status)
  },

  methods: {
    changeHoverColor (index) {
      return (this.count = index)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #fff;
}

.subNav {
  width: 100%;
  overflow: hidden;
  background: #c20c0c;
  border-bottom: 1px solid #a40011;
}

.Nmenu {
  width: 1300px;
  height: 5px;
  list-style: none;
}

.Nmenu .Nli {
  float: left;
  color: #fff;
  margin-top: 15px;
  line-height: 20px;
  margin-bottom: 15px;
  left: 15%;
  height: 20px;
  width: 70px;
  margin-left: 20px;
  font-size: 14px;
  position: relative;
  border-radius: 20px;
  padding: 0 13px;
}

.Nmenu .Nli:hover {
  background: #9b0909;
}

/* 控制隐藏，用于参数传递 */
.control {
  display: none;
}

.addBackground {
  background-color: #9b0909;
}

.router {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  line-height: 20px;

}
</style>
