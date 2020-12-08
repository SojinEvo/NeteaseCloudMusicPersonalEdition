<template>
  <!-- 推荐页面 -->
  <div class="recommend">
    <!-- 轮播图 -->
    <RotationChart style="res" />
    <!-- 主体容器 -->
    <div class="container">
      <!-- 左面内容区域 -->
      <div class="left">
        <div class="content">
          <!-- 热门推荐：卡片导航组件 -->
          <CardNav>
            <template #title>热门推荐</template>
          </CardNav>
          <!-- 图片卡片组件 -->
          <Card :dataList="personalizedList" />

          <!-- 新碟上架：卡片导航组件 -->
          <CardNav>
            <template #title>新碟上架</template>
          </CardNav>
          <!-- 图片卡片组件 -->
          <Card :dataList="discList" ><template #bottom><span></span></template></Card>

          <!-- 榜单：卡片导航组件 -->
          <CardNav>
            <template #title>榜单</template>
          </CardNav>

          <!-- 榜单 -->
          <MusicList :data="musicList"> </MusicList>
        </div>
      </div>
      <!-- 右面侧边导航区 -->
      <div class="right">
        <SideNav :dataList="dataList">
          <template #titleName>入驻歌手</template>
          <template #more>查看全部></template>
        </SideNav>
        <SideNav :dataList="dataList2">
          <template #titleName>热门主播</template>
        </SideNav>
      </div>
    </div>
  </div>
</template>

<script>
// 轮播图
import RotationChart from '../../../components/rotationChart'
// 卡片导航
import CardNav from '../../../components/cardNav'
// 图片卡片
import Card from '../../../components/card'
// 侧边导航
import SideNav from '../../../components/sideNav'
// 榜单
import MusicList from '../../../components/musicList'

export default {
  data () {
    return {
      // 因api太多不好找，找的太繁琐，这里的侧边显示也不重要，直接扒的官网的数据
      dataList: [
        {
          img:
            'http://p2.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62',
          name: '张惠妹aMEI',
          desc: '台湾歌手张惠妹'
        },
        {
          img:
            'http://p2.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62',
          name: 'Fine乐团',
          desc: '独立音乐人'
        },
        {
          img:
            'http://p2.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg?param=62y62',
          name: '萬曉利',
          desc: '民谣歌手、中国现代民谣的代表人物之一'
        },
        {
          img:
            'http://p2.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg?param=62y62',
          name: '音乐人赵雷',
          desc: '民谣歌手'
        }
      ],

      dataList2: [
        {
          img:
            'http://p2.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40',
          name: 'DJ艳秋',
          desc: '著名音乐节目主持人'
        },
        {
          img:
            'http://p1.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40',
          name: '国家大剧院古典音乐频道',
          desc: '国家大剧院古典音乐官方'
        },
        {
          img:
            'http://p1.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40',
          name: '谢谢收听',
          desc: '南京电台主持人王馨'
        },
        {
          img:
            'http://p1.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40',
          name: 'DJ晓苏',
          desc: '独立DJ，CRI环球旅游广播特邀DJ'
        }
      ],
      // 推荐歌单
      personalizedList: [],
      // 新碟上架
      discList: [],
      // 榜单数据
      musicList: []
    }
  },
  components: {
    RotationChart,
    CardNav,
    Card,
    SideNav,
    MusicList
  },

  created () {
    // 榜单数据
    this.getMusicList()
    // 获取推荐歌单
    this.getPersonalized()
    // 获取新碟上架
    this.getDiscList()
  },

  methods: {
    // 榜单数据
    async getMusicList () {
      const { data: res } = await this.$http.get('toplist/detail')
      if (res.code != 200) return this.$message.error('榜单获取失败！')
      console.log('musicList', res.list)

      // 过滤榜单数据，只取前三个
      for (let i = 0; i < 3; i++) {
        this.musicList.push(res.list[i])
      }
    },

    // 获取推荐歌单
    async getPersonalized () {
      const { data: res } = await this.$http.get('personalized?limit=8')
      if (res.code != 200) return this.$message.error('推荐歌单获取失败！')
      this.personalizedList = res.result
    },

    // 获取新碟上架
    async getDiscList () {
      const { data: res } = await this.$http.get('album/newest')
      if (res.code != 200) return this.$message.error('新碟上架获取失败！')
      this.discList = res.albums
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
.container {
  width: 979px;
  overflow: hidden;
  margin: 0 auto;
  /* background: orchid; */
  position: relative;
  border: 1px solid #d3d3d3;
  border-top: 0;
  border-bottom: 0;

}
.container .left {
  width: 729px;
  /* background: palegreen; */
  float: left;
  position: relative;
  border-right: 1px solid #d3d3d3;

}

.container .right {
  width: 250px;
  height: 800px;
  /* background: paleturquoise; */
  float: left;
  position: absolute;
  right: 0;
}

.container .left .content {
  width: 689px;
  /* background: peru; */
  margin: 0 auto;
}
</style>
