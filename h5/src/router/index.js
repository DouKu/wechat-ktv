import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index.vue'
import video from '@/view/video.vue'
import person from '@/view/person.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/person',
      name: 'person',
      component: person
    }
  ]
})
