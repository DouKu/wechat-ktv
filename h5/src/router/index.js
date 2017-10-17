import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index.vue'
import video from '@/view/video.vue'
import person from '@/view/person.vue'
import rule from '@/view/rule.vue'
import detail from '@/view/detail.vue'

Vue.use(Router)

export default new Router({
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
    },
    {
      path: '/rule',
      name: 'rule',
      component: rule
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
