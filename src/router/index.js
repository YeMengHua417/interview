import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Exam from '@/pages/Exam'
import Thanks from '@/pages/Thanks'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam
    },{
      path: '/thanks',
      name: 'thanks',
      component: Thanks
    }
  ]
})
