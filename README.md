# neteasecloudmusicclient

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





### directory structure

```
|-- NeteaseCloudMusicClient
    |-- .editorconfig        
    |-- .gitignore
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- 网易云音乐.png
    |-- src
        |-- App.vue
        |-- main.js
        |-- assets
        |   |-- logo.png
        |   |-- 网易云音乐.png
        |-- components
        |   |-- backTop
        |   |   |-- index.vue
        |   |-- card
        |   |   |-- bottom.vue
        |   |   |-- iconall.png
        |   |   |-- index.vue
        |   |-- cardNav
        |   |   |-- index.vue
        |   |   |-- img
        |   |       |-- 右箭头.png
        |   |       |-- 圆圈.png
        |   |-- container
        |   |   |-- index.vue
        |   |-- footer
        |   |   |-- index.vue
        |   |-- header
        |   |   |-- index.vue
        |   |   |-- img
        |   |       |-- HOT.png
        |   |       |-- user.jpg
        |   |       |-- vip.png
        |   |       |-- 个人中心.png
        |   |       |-- 实名.png
        |   |       |-- 搜索框.png
        |   |       |-- 等级.png
        |   |       |-- 网易云.png
        |   |       |-- 设置.png
        |   |       |-- 退出.png
        |   |       |-- 邮箱.png
        |   |       |-- 音乐.png
        |   |-- list
        |   |   |-- index.vue
        |   |-- musicList
        |   |   |-- index.vue
        |   |   |-- img
        |   |       |-- 播放.png
        |   |       |-- 添加.png
        |   |-- musicPlay
        |   |   |-- index.vue
        |   |   |-- img
        |   |       |-- iconall.png
        |   |       |-- loading.gif
        |   |       |-- playbar.png
        |   |       |-- statbar.png
        |   |-- other
        |   |   |-- index.vue
        |   |-- rotationChart
        |   |   |-- index.vue
        |   |-- sideNav
        |   |   |-- index.vue
        |   |-- subNav
        |       |-- index.vue
        |-- plugins
        |   |-- element.js
        |-- router
        |   |-- index.js
        |-- store
        |   |-- index.js
        |-- views
            |-- Client
            |   |-- Client.vue
            |-- Friend
            |   |-- Friend.vue
            |-- Home
            |   |-- Home.vue
            |   |-- children
            |       |-- newDisc.vue
            |       |-- radioStation.vue
            |       |-- rankingList.vue
            |       |-- recommend.vue
            |       |-- singer.vue
            |       |-- songSheet.vue
            |       |-- img
            |           |-- 109951165511835324.jpg
            |           |-- icon.png
            |           |-- mymusic.png
            |           |-- notlogin.jpg
            |-- Music
            |   |-- Music.vue
            |-- Musician
            |   |-- Musician.vue
            |-- Store
                |-- Store.vue
```





## Main Function



### 播放器



#### 初始音乐

```
1、点击歌单中的播放按钮，动态将此歌单所有的音乐id存储到Vuex中，播放器将读取vuex中的id，再去发起请求获取每个歌曲的src，将当前播放的音乐src动态添加到audio元素中的source元素中。

2、点击下一个歌单，播放器中watch监听vux中store的变化，再执行第一步
```



#### 音乐播放

```
click事件 绑定播放状态，动态改变 audio 元素中的 pause() 和 paly()  
```



#### 切换音乐

```
click事件 ，根据当前点击歌曲索引值，对应获取歌单中的src
```





#### 进度条

```
audio中的timeupdate事件，监听当前音乐的 currentTime （播放时间），动态改变对应的进度条宽度

需要做到时间转px  当前进度条宽度 = 当前时间/总时间 * 进度条总宽度

注意：总时间必须在audio提供的canplay事件中获取，否则其他地方获取都为undefined
```





#### 歌词滚动

```
1、格式化歌词，将时间转为秒，时间和歌词分离
2、
```









## Other Function