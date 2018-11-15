import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Exam from '@/pages/Exam'
import Thanks from '@/pages/Thanks'
import * as localStorage from '../utils/localStorage';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      meta: {
        requireAuth: true
      }
    },{
      path: '/thanks',
      name: 'thanks',
      component: Thanks
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  if (to.matched.some(record => record.meta.requireAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('sessionId')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router;
