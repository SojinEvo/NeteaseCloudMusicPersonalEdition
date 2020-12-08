<template>
  <div class="player">
    <!-- 音乐 -->
    <audio ref="audio" @canplay="getDuration" @timeupdate="changeTime">
      <source src="" ref="source" type="audio/mpeg" />
    </audio>
    <!-- 播放按钮区域 -->
    <div class="play">
      <div class="btn">
        <a href="javascript:;" class="prev" @click="changePrev"></a>
        <a
          href="javascript:;"
          class="curr"
          @click="changeCurr"
          :class="{ currPlay: currStatus }"
        ></a>
        <a href="javascript:;" class="next" @click="changeNext"></a>
      </div>
    </div>
    <!-- 滚动条区域 -->
    <div class="box" ref="box">
      <span class="imgContainer">
        <img ref="musicImg" src="" alt="" srcset="" />
      </span>
      <div class="progressContainer">
        <p class="content">
          <a href="javascript:;" ref="musicName"></a>
          <span ref="musicAuthor"></span>
        </p>
        <!-- 进度条容器 -->
        <div class="progress" @mousedown="moveProgress">
          <!-- 加载进度条缓存 -->
          <div class="load"></div>
          <!-- 播放进度条走动 -->
          <div class="read" :style="{ width: moveReadProgress.width + 'px' }">
            <!-- 按钮控制进度 -->
            <span
              class="btnControl"
              ref="btnControl"
              @mousedown="btnControl"
              :style="{ left: moveBtnControl.left + 'px' }"
            >
              <!-- 加载图标 -->
              <i></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 显示歌曲时间 -->
      <span class="time" ref="time">
        <em ref="dynamicTime">00:00</em>
        <em ref="totalTime"></em>
      </span>
    </div>
    <!-- 功能区域 -->
    <div class="function">
      <!-- 占位插槽，自定义区域 -->
      <slot name="extend"></slot>
      <!-- 音量控制区 -->
      <div class="volume" :class="{ showVolume: volumeStatus }">
        <div class="volumeContainer">
          <!-- 音量进度条 -->
          <div
            class="volumeStrip"
            @mousedown="moveVolume"
            ref="volumeStrip"
            :style="{ height: height + 'px' }"
          >
            <div class="btnIcon"></div>
          </div>
        </div>
      </div>
      <!-- 歌词显示区 -->
      <div class="lyricContainer" :class="{ showLyric: LyricStatus }">
        <ul class="musicLists" ref="musicLists">
          <h3>歌曲列表</h3>
          <li ref="musicLi" v-for="(mus, index) in musicInfo" :key="index">
            {{ mus.al.name }}
          </li>
        </ul>
        <ul class="lyrics">
          <h3>歌词</h3>
          <div class="lyricBox" ref="lyricBox" id="ly">
            <li ref="lyricLi" v-for="(lyr, index) in lyric" :key="index">
              {{ lyr.lyric }}
            </li>
          </div>
        </ul>
      </div>
      <!-- 显示音量按钮 -->
      <span class="btnVolume" @click="changeVolume"></span>
      <!-- 显示歌词按钮 -->
      <span class="btnLyric" @click="showLyric"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 歌曲id
      musicIdList: [],

      // 歌曲播放列表（主要是获取歌曲播放链接）
      musicPlayList: [],

      // 歌曲详情信息，包括歌曲名、作者等
      musicInfo: [],

      // 歌词详情显示
      lyricList: [],

      // 当前歌词
      lyric: [],

      // 歌词切换状态
      LyricStatus: false,

      // 播放切换状态
      currStatus: false,

      // 音量切换状态
      volumeStatus: false,

      // 音乐动态进度条样式
      moveReadProgress: {
        width: 0,
      },

      // 控制按钮动态样式
      moveBtnControl: {
        left: 0,
      },

      // 音量条
      height: 50,
      top: 20,

      //歌词li
      lyricTop: 0,

      //遍历歌曲的索引
      index: 0,

      // 鼠标悬浮状态
      mouseState: false,

      // 改变单次音乐时间播放状态
      flag: false,

      // 切换初始化音乐时间状态
      musicStatus: false,
    };
  },
  created() {
    // 获取歌曲列表
    this.getMusicList();
  },
  watch: {
    "$store.state.arr"() {
      this.getMusicList();
      this.currStatus = true;
    },
  },
  methods: {
    // 根据指定id，获取歌曲列表
    async getMusicList() {
      this.musicPlayList = [];
      this.musicInfo = [];
      this.lyricList = [];
      this.index = 0;
      if (this.$store.state.arr.length != 0) {
        for (let i = 0; i < this.$store.state.arr.length; i++) {
          let id = this.$store.state.arr[i];
          // 获取歌曲链接
          const { data: musicList } = await this.$http.get(`song/url?id=${id}`);
          // 获取歌曲详情
          const { data: musicInfo } = await this.$http.get(
            `song/detail?ids=${id}`
          );

          //获取歌词详情
          const { data: lyricInfo } = await this.$http.get(`lyric?id=${id}`);
          if (musicList.code != 200)
            return this.$message.error("歌曲链接获取失败！");

          if (musicInfo.code != 200)
            return this.$message.error("歌曲详情信息获取失败！");

          if (musicList.code != 200)
            return this.$message.error("歌词详情获取失败！");

          this.musicPlayList.push(musicList.data[0]);
          this.musicInfo.push(musicInfo.songs[0]);
          this.lyricList.push(lyricInfo);
        }
        // 初始化音乐
        this.musicInit();
      }
    },

    // 初始化音乐
    musicInit() {
      // 初始化音乐
      this.$refs.source.src = this.musicPlayList[0].url;
      // 初始化图片
      this.$refs.musicImg.src = this.musicInfo[0].al.picUrl;
      // 初始化歌曲姓名
      this.$refs.musicName.innerText = this.musicInfo[0].al.name;
      // 初始化作者姓名
      this.$refs.musicAuthor.innerText = this.musicInfo[0].ar[0].name;
      // 当前歌词
      this.splitLyric(0);
      // 初始化当前播放列表背景色
      this.$refs.musicLi[0].setAttribute(
        "style",
        "background-color:rgba(130, 284, 247, 0.6)"
      );
      this.$refs.audio.load();
      this.playerPromise();
    },

    // 切割歌词
    splitLyric(index) {
      // 判断当前音乐是否有歌词
      if (this.lyricList[index].lrc) {
        let newLyric = this.lyricList[index].lrc.lyric.split("\n");
        let Lyric = [];

        // 将时间和歌词分开
        // 遍历newLyric，并且将时间和文字拆分开，并push进自己定义的数组，形成一个对象数组
        for (let i in newLyric) {
          // 获取每个li显示的歌词
          let item = newLyric[i];

          let time = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
          // console.log("原：", item);
          time =
            parseFloat(time.split(":")[0]) * 60 +
            parseFloat(time.split(":")[1]);
          // console.log("现：", time);
          this.getDuration();
          let lyr = item.substring(item.indexOf(["]"]) + 1, item.length);
          Lyric.push({
            time: time,
            lyric: lyr,
          });
        }

        this.lyric = Lyric;
      } else {
        this.lyric = ["此歌曲无歌词"];
      }
    },

    // 改变音乐播放路径
    changeMusicSrc(parms) {
      // 限制音乐切换的范围
      this.index += parms;
      this.musicStatus = true;
      if (this.index < 0) return (this.index = 0);
      if (this.index > this.musicPlayList.length - 1)
        return (this.index = this.musicPlayList.length - 1);
      if (parms != 0) {
        // ---初始化音乐所需内容---
        // 切换当前播放列表背景色
        try {
          //切换歌词
          this.splitLyric(this.index);
          // console.log(this.musicInfo);
          if (this.index == 0) {
            this.$refs.musicLi[0].setAttribute(
              "style",
              "background-color:rgba(130, 284, 247, 0.6)"
            );
            this.$refs.musicLi[this.index + 1].setAttribute(
              "style",
              "background-color:none"
            );
          }

          this.$refs.musicLi[this.index - 1].setAttribute(
            "style",
            "background-color:none"
          );
          this.$refs.musicLi[this.index].setAttribute(
            "style",
            "background-color:rgba(130, 284, 247, 0.6)"
          );
          this.$refs.musicLi[this.index + 1].setAttribute(
            "style",
            "background-color:none"
          );
        } catch {}

        // 切换歌曲播放路径
        this.$refs.source.src = this.musicPlayList[this.index].url;
        // 切换歌曲图片
        this.$refs.musicImg.src = this.musicInfo[this.index].al.picUrl;
        // 切换歌曲显示内容
        this.$refs.musicName.innerText = this.musicInfo[this.index].al.name;
        this.$refs.musicAuthor.innerText = this.musicInfo[
          this.index
        ].ar[0].name;
        this.moveReadProgress.width = 0;
        this.$refs.audio.load();
        this.playerPromise();
        this.currStatus = true;
      }

      // 此写法也可以，功能也可以，但是控制台会报warning：TypeError: (intermediate value)(intermediate value) is not a function.
      // 此warning报错是因为匿名函数后面没有加分号，下面只能return一次，因此多个语句只能用逗号隔开，所以会有warning
      // if (parms != 0)
      //   return (
      //     // ---初始化音乐所需内容---
      //     // 切换歌曲播放路径
      //     (this.$refs.source.src = this.musicPlayList[this.index].url),
      //     // 切换歌曲图片
      //     (this.$refs.musicImg.src = this.musicInfo[this.index].al.picUrl),
      //     // 切换歌曲显示内容
      //     (this.$refs.musicName.innerText = this.musicInfo[this.index].al.name),
      //     (this.$refs.musicAuthor.innerText = this.musicInfo[
      //       this.index
      //     ].ar[0].name),
      //     (this.moveReadProgress.width = 0),
      //     this.$refs.audio.load(),
      //     this.$refs.audio.play(),
      //     (this.currStatus = true)(console.log(this.musicPlayList))
      //   );
      // 判断点击播放按钮的状态
      if (!this.currStatus) return this.$refs.audio.pause();
      this.playerPromise();
    },

    // 改变播放状态
    changeCurr() {
      if (this.$store.state.arr.length == 0) {
        this.$message.warning("播放器音乐为空，请先添加你的音乐~.~");
        this.currStatus = false;
      } else {
        this.currStatus = !this.currStatus;
        this.changeMusicSrc(0);
      }
    },

    // 播放状态
    playerPromise() {
      let playPromise = this.$refs.audio.play();
      if (playPromise) {
        playPromise
          .then(() => {
            this.$refs.audio.play();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 切换上一首
    changePrev() {
      this.changeMusicSrc(-1);
    },

    // 切换下一首
    changeNext() {
      this.changeMusicSrc(1);
    },

    // 切换音频区域
    changeVolume() {
      this.volumeStatus = !this.volumeStatus;
    },

    // 切换歌词显示
    showLyric() {
      this.LyricStatus = !this.LyricStatus;
    },

    // 改变进度条
    moveProgress(event) {
      let btnControl = this.$refs.btnControl;
      if (event.target == btnControl) return "";

      // 设置当前点击的进度条位置
      this.moveReadProgress.width = event.layerX;
      // 设置当前的圆点位置 === 进度条的位置
      this.moveBtnControl.left = this.moveReadProgress.width;

      // 改变单次音乐时间播放状态
      this.flag = true;
      this.musicTimePosition = this.moveReadProgress.width;

      this.currStatus = true;
      this.$refs.audio.play();
    },

    // 改变音量
    moveVolume(event) {
      let volumeStrip = this.$refs.volumeStrip;
      this.height = event.layerY;
    },

    // 控制圆点按钮
    btnControl(event) {
      let btnControl = this.$refs.btnControl;
      // 获取初始圆点位置距离浏览器圆点的位置
      let x = event.clientX - btnControl.offsetLeft;
      // 获取box容器
      let box = this.$refs.box;
      box.onmousemove = (event) => {
        let le = event.clientX - x;
        if (event.target == btnControl) return "";

        if (le < 0 || le > 493) return "";
        // 当前圆点应移动的位置 = 当前圆点距离浏览器原点的位置 - 初始圆点位置
        this.moveBtnControl.left = le;
        // 红色进度条宽度
        this.moveReadProgress.width = this.moveBtnControl.left;
      };

      // box绑定事件
      box.onmouseup = () => {
        this.flag = true;
        box.onmousemove = null;
      };
    },

    // 获取歌且总时长（canplay事件，歌曲已准备好开始播放）
    getDuration() {
      // 获取歌曲的总时长
      this.musicTime = this.$refs.audio.duration;
      // 初始化音乐时间
      this.$refs.totalTime.innerText =
        "/ " + this.timeToMinute(parseInt(this.musicTime));

      // console.log("time", this.musicTime);
    },

    // 监听音乐播放的时间
    changeTime() {
      // 获取音乐播放时间
      let currTime = this.$refs.audio.currentTime;
      for (let i = 0; i < this.lyric.length - 1; i++) {
        let ele = this.lyric[i];
        let nex = this.lyric[i + 1];
        // console.log("歌词时间：", ele.time);
        // console.log("cuttime：", this.$refs.audio.currentTime);

        if (
          ele.time <= this.$refs.audio.currentTime &&
          this.$refs.audio.currentTime <= nex.time
        ) {
          // console.log("ele", ele.time);
          // console.log("cur", this.$refs.audio.currentTime);

          try {
            this.$refs.lyricLi[i].style.color = "lightgreen";
            this.$refs.lyricLi[i].style.fontSize = "16px";
            this.$refs.lyricLi[i - 1].style.color = "lightyellow";
            this.$refs.lyricLi[i - 1].style.fontSize = "12px";
          } catch {}
        }
        console.log(this.$refs.lyricLi[i].offsetTop)
        if (this.$refs.lyricLi[i].style.top == 266.8) {
          this.$refs.lyricBox.scrollTop = i * 28;
        }
      }
      if (!this.musicTime) return "";
      // 当前进度条宽度（当前时长/总时长 *总进度条宽度）

      // 改变播放时间
      if (this.flag) {
        // 改变播放时间（px转时间）
        this.$refs.audio.currentTime =
          (this.moveReadProgress.width * this.musicTime) / 493;
        this.flag = false;
      }
      // 设置当前时间和进度条的换算关系（时间转px）
      let Prowidth = (currTime / this.musicTime) * 493;
      this.moveReadProgress.width = Prowidth;
      // 设置当前的圆点位置 === 进度条的位置
      this.moveBtnControl.left = this.moveReadProgress.width;
      // 设置动态时间
      this.$refs.dynamicTime.innerText = this.timeToMinute(currTime);

      // 若当前音乐播放完毕，自动切换下一首
      if (this.$refs.audio.currentTime == this.musicTime) {
        this.changeNext();

        // 若当前播放为最后一首，播放状态改为暂停
        if (this.index == this.musicPlayList.length - 1)
          return (this.currStatus = false);
      }

      // if(this.lyric.time == this.$refs.audio.currentTime){
      //   this.$refs.lyricLi.style.color='red';
      // }
    },

    // 格式化时间
    timeToMinute(times) {
      let min = Math.floor(times / 60) % 60;
      let sec = Math.floor(times % 60);

      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return `${min}:${sec}`;
    },
  },
};
</script>

<style  scoped>
.player {
  width: 1300px;
  height: 53px;
  background: url(./img/playbar.png);
  background-position: 0 0px;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 99;
  font-size: 12px;
}

.play {
  width: 300px;
  /* background: goldenrod; */
  position: relative;
}

.btn {
  width: 200px;
  height: 100%;
  /* background: black; */
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
}

.btn a {
  display: block;
  float: left;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  margin-top: 5px;
}

.prev,
.curr,
.next {
  background: url(./img/playbar.png);
  background-repeat: no-repeat;
  background-position: 0 -130px;
}

.prev:hover {
  background-position: -30px -130px;
}

.curr {
  width: 36px !important;
  height: 36px !important;
  background-position: 0 -204px;
}

.curr:hover {
  background-position: -40px -204px;
}

.currPlay {
  background-position: 0 -165px;
}

.currPlay:hover {
  background-position: -40px -165px;
}

.next {
  background-position: -80px -130px;
}

.next:hover {
  background-position: -110px -130px;
}

.box {
  /* width: 600px; */
  /* background: hotpink; */
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.imgContainer {
  width: 34px;
  height: 34px;
}

.imgContainer img {
  width: 34px !important;
}

.progressContainer {
  display: flex;
  flex-direction: column;
}

.content {
  margin-top: -2px;
  text-align: start !important;
}

.content a,
span {
  text-decoration: none;
  color: #e8e8e8;
  font-size: 14px;
  margin-left: 10px;
}

.content span {
  color: #9b9b9b;
}

.progress,
.load,
.progress .read {
  width: 493px;
  height: 9px;
  background: url(./img/statbar.png);
  background-position: right 0;
}

.progress {
  margin-left: 10px;
  margin-top: 5px;
  position: relative;
}

.progress .load {
  background-position: right -30px;
}

.progress .read {
  width: 0px;
  position: absolute;
  max-width: 493px;
  top: 0;
  background-position: left -66px;
}

.progress .read .btnControl {
  position: absolute;
  top: -7px;
  right: -13px;
  width: 22px;
  height: 24px;
  margin-left: -11px;
  background: url(./img/iconall.png);
  cursor: pointer;
  background-position: 0 -250px;
}

.progress .read .btnControl:hover {
  background-position: 0 -280px;
}

.time {
  display: flex;
  color: #797979;
  margin-top: 18px;
  margin-right: 10px;
}

.time em {
  color: #e8e8e8;
  font-style: normal;
  margin-right: 5px;
}

.function {
  width: 345px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 10px;
}

.function .volume {
  width: 32px;
  height: 113px;
  background: url(./img/playbar.png);
  background-position: 0 -503px;
  position: absolute;
  left: 15px;
  top: -117px;
  display: flex;
  justify-content: center;
  display: none;
  z-index: 99;
}

.volumeContainer {
  width: 4px;
  position: relative;
}

.showVolume {
  display: flex !important;
}

.function .volume .volumeStrip {
  width: 4px;
  height: 60px;
  background: url(./img/playbar.png);
  background-position: -40px bottom;
  position: absolute;
  bottom: 4px;
}

.function .volume .volumeStrip .btnIcon {
  width: 18px;
  height: 20px;
  position: relative;
  left: -7px;
  top: -16px;
  background: url(./img/iconall.png);
  background-position: -40px -250px;
  cursor: pointer;
}

.function .volume .volumeStrip .btnIcon:hover {
  background-position: -40px -280px;
}

.function .btnVolume,
.function .btnLyric {
  width: 25px;
  height: 25px;
  background: url(./img/playbar.png);
  background-position: -2px -248px;
  cursor: pointer;
}

.function .btnVolume:hover {
  background-position: -31px -248px;
}

.function .btnLyric {
  background-position: -42px -68px;
}

.function .btnLyric:hover {
  background-position: -42px -98px;
}

.lyricContainer {
  width: 600px;
  height: 300px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 46px;
  right: 160px;
  color: aliceblue;
  display: none;
}

.showLyric {
  display: flex;
}

.lyricContainer h3 {
  border-bottom: 1px solid #fff;
}
.lyricContainer ul {
  list-style: none;
  padding-top: 10px;
}
.lyricContainer li {
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lyricBox li {
  font-size: 12px;
  height: 22px;
  transition: all 0.6s;
 
}
.lyricContainer .musicLists {
  width: 200px;
  height: 100%;
}

.lyricContainer .lyrics {
  width: 400px;
  height: 100%;
}

.lyricBox {
  width: 99%;
  height: 92%;
  overflow: auto;
  background: rgba(133, 133, 133, 0.6);
}

/*滚动条样式*/
.lyricBox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.lyricBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.lyricBox::-webkit-scrollbar-track {
  cursor: pointer;
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>