<template>
  <div class="songSheet">
    <Container>
      <template #content
        ><CardNav class="cardNav">
          <template #title>全部</template>
          <template #sugar
            ><span class="sugar" @click="changeStatus">选择分类</span></template
          >
          <template #other><a class="hot">热门</a></template>
        </CardNav>
        <div class="box" :style="{ display: `${flag ? 'block' : 'none'}` }">
          <h3><a>全部歌单</a></h3>
          <dl v-for="(item, index) in boxData" :key="item.name">
            <dt>
              <span
                class="icon"
                :style="{ backgroundPosition: item.position }"
              ></span>
              <span>{{ item.name }}</span>
            </dt>
            <dd>
              <span v-for="ele in playList" :key="ele.name">
                <a v-if="ele.category == index"  @click="func(ele.name)">{{ ele.name }}</a>
              </span>
            </dd>
          </dl>
        </div>
        <ul class="card">
          <li v-for="item in dataList" :key="item.id">
            <span class="imgContainer">
              <img :src="item.coverImgUrl" alt="" />
              <Bottom :playCount="item.playCount" :id="item.id"/>
            </span>
            <span>{{ item.name }}</span>
            <p>by {{ item.creator.nickname }}</p>
          </li>
        </ul>

        <el-pagination

          @current-change="handleCurrentChange"

          :page-size="35"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </template>
    </Container>
  </div>
</template>

<script>
import CardNav from '../../../components/cardNav'
import Container from '../../../components/container'
// 图片卡片
import Card from '../../../components/card'
import Bottom from '../../../components/card/bottom'
export default {
  data () {
    return {
      flag: false,
      boxData: [
        {
          name: '语种',
          position: '-20px -735px'
        },
        {
          name: '风格',
          position: '0 -60px'
        },
        {
          name: '场景',
          position: '0 -88px'
        },
        {
          name: '情感',
          position: '0 -117px'
        },
        {
          name: '主题',
          position: '0 -141px'
        }
      ],
      // 分类
      playList: [],
      // 歌单
      dataList: [],
      limit: 35,
      order: 'hot',
      cat: '全部',
      currentPage: 5,
      total: 0,
      page: 1

    }
  },
  components: {
    CardNav,
    Container,
    Card,
    Bottom
  },
  created () {
    this.getPlaylist()
    this.getDataList()
  },
  methods: {
    async getPlaylist () {
      const { data: res } = await this.$http.get('playlist/catlist')
      if (res.code != 200) return this.$message.error('分类列表获取失败！')
      this.playList = res.sub
    },

    changeStatus () {
      this.flag = !this.flag
    },

    closeCategory () {
      if (this.$refs) { this.flag = false }
    },

    async getDataList () {
      const { data: res } = await this.$http.get(`top/playlist?offset=${(this.page - 1) * 35}&order=${this.order}&cat=${this.cat}`)
      if (res.code != 200) return this.$message.error('歌单列表获取失败！')
      console.log(res.playlists)
      this.dataList = res.playlists
      this.total = res.total
    },

    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getDataList()
    },

    func (name) {
      this.cat = name
      console.log(name)
      this.getDataList()
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
.cardNav {
  width: 900px;
  margin: 10px auto;
  font-size: 12px;
  position: relative;
}
.hot {
  font-size: 12px;
  display: block;
  width: 46px;
  height: 29px;
  line-height: 29px;

  cursor: pointer;
  background: #c10505;
  color: antiquewhite;
  border-radius: 3px;
}
.hot:hover {
  color: #fff;
  background: #c40a0a;
}

.sugar {
  display: block;
  font-size: 12px;
  width: 90px;
  height: 31px;
  border: 1px solid rgb(217, 213, 213);
  position: absolute;
  line-height: 31px;
  cursor: pointer;
  left: 85px;
  text-align: center;
  border-radius: 3px;
}

.sugar:active {
  background: rgb(207, 206, 206);
}

.sugar::after {
  content: "↓";
  width: 15px;
  position: absolute;
}

.box {
  width: 720px;
  background: #fff;
  position: relative;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.5s, 0.5s;
  color: #333;
  font-size: 12px;
}

.box:hover {
  transform: scale(1.02);
  box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.5s, 0.5s;
}

.box::after {
  content: "▲";
  color: rgb(238, 246, 255);
  position: absolute;
  top: -15px;
  left: 225px;
}

.box h3 {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #8f8f8f;
  color: #333;
}

.box h3 a {
  display: block;
  width: 75px;
  height: 26px;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  border: 1px solid #d1d1d1;
  margin: 10px;
}

dl {
  display: flex;
  align-items: center;
}

dt {
  padding: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-right: 1px solid #e6e6e6;
  font-weight: bold;
}

.icon {
  width: 24px;
  height: 24px;
  display: block;
  background: url(./img/icon.png);
  margin-right: 10px;
}

dd {
  padding: 10px;
}

dd a {
  cursor: pointer;
  margin-right: 9px;
  float: left;
  margin-bottom: 2px;
  white-space: nowrap;
}

dd a::after {
  content: "|";
  color: #d8d8d8;
  margin-left: 10px;
}

.card {
  width: 950px;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: -50px;
  color: #000;
  font-size: 14px;
}

.card li {
  width: 140px;
  display: block;

  margin-left: 50px;
  margin-bottom: 20px;
  position: relative;
}

.card li img {
  width: 140px;
}

.card li span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card li p {
  font-size: 12px;
  color: #999;
}

.imgContainer {
  width: 140px;
  position: relative;
}
</style>
