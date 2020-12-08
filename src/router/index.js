import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Music from '../views/Music/Music.vue'
import Friend from '../views/Friend/Friend.vue'
import Store from '../views/Store/Store.vue'
import Musician from '../views/Musician/Musician.vue'
import Client from '../views/Client/Client.vue'

import Recommend from '../views/Home/children/recommend.vue'
import RankingList from '../views/Home/children/rankingList.vue'
import SongSheet from '../views/Home/children/songSheet.vue'
import RadioStation from '../views/Home/children/radioStation.vue'
import Singer from '../views/Home/children/singer.vue'
import NewDisc from '../views/Home/children/newDisc.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/', component: Recommend },
      { path: '/home/rankingList', component: RankingList },
      { path: '/home/songSheet', component: SongSheet },
      { path: '/home/radioStation', component: RadioStation },
      { path: '/home/singer', component: Singer },
      { path: '/home/newDisc', component: NewDisc }
    ]
  },
  { path: '/music', component: Music },
  { path: '/friend', component: Friend },
  { path: '/store', component: Store },
  { path: '/musician', component: Musician },
  { path: '/client', component: Client }
]

const router = new VueRouter({
  routes
})

export default router
