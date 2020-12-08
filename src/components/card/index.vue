<template>
  <div class="card">
    <ul class="musicList">
      <li v-for="item in dataList" :key="item.id">
        <span class="box">
          <img :src="item.picUrl" alt="">
          <slot name="bottom">
            <Bottom :playCount='item.playCount' :id="item.id" />
          </slot>
        </span>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Bottom from './bottom.vue'

export default {
  // created() {
  //     console.log('ddd',this.$props.url)
  //     this.getPersonalized()
  // },

  data () {
    return {
      // 歌单
      // personalizedList: []
    }
  },
  props: {
    dataList: Array
    // url:String,
    // limit:String,
    // paramName:String
  },

  components: { Bottom },
  methods: {
    // 获取推荐歌单
    // async getPersonalized() {
    //   const { data: res } = await this.$http.get(
    //     `${this.$props.url}?limit=${this.$props.limit}`
    //   );
    //   const {paramName} = this.$props
    //   if (res.code != 200) return this.$message.error("推荐歌单获取失败！");
    //   // const attr = res.keys(res)
    //   // console.log('attr',attr)
    //   console.log('data',res);
    //   if(paramName === 'result') return this.personalizedList = res.result
    //   if(paramName === 'albums') return this.personalizedList = res.albums
    // },
    /*
        alg: "featured"
        canDislike: false
        copywriter: "编辑推荐：戴上耳机，一起回到洛杉矶的夏天"
        highQuality: false
        id: 5065793855
        name: "Vol.162 - 洛城阳光 · Sunlit LA"
        picUrl: "https://p2.music.126.net/c9B4_kOCOM3iWIutquRVWw==/109951165065146210.jpg"
        playCount: 181195
        trackCount: 30
        trackNumberUpdateTime: 1592201442313
        type: 0
      */
  }
}
</script>

<style scoped>
.card {
  /* background: tomato; */
  /* margin-top: 20px; */
  color: #000;
  font-size: 14px;
}

.musicList {
  list-style: none;
  padding: 0;
  overflow: hidden;
}

.musicList li {
  float: left;
  margin-left: 0px;
  width: 140px;
  height: 204px;
  /* background: red; */
  margin-bottom: 35px;
}

/* 操作除了1,4,9,13这规律的节点 */
.musicList li:not(:nth-child(4n-3)) {
  margin-left: 43px;
}

.musicList li img {
  width: 140px;
  height: 140px;
}

.musicList li p {
  width: 140px;
  padding-top: 5px;
}

.box {
  display: block;
  position: relative;
}

</style>
