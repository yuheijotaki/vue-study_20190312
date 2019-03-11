import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/page/top'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'top',
      component: top
    }
  ]
})
