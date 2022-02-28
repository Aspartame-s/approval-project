import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/homepage',
    component: Index,
    children: [
      {
        path: '/homepage',
        name: 'HomePage',
        meta: {
          name: '首页'
        },
        component: () => import('../views/HomePage.vue')
      },
      {
        path: '/order',
        name: 'Order',
        meta: {
          name: '预约',
        },
        component: () => import('../views/Order.vue'),
        children: [
          {
            path: '/order/alllist',
            name: 'AllList',
            meta: {
              name: 'gg'
            },
            component: () => import('../components/AllList.vue')
          },
          {
            path: '/order/staysubscribe',
            name: 'StaySubscribe',
            meta: {
              name: 'ggg'
            },
            component: () => import('../components/StaySubscribe.vue')
          },
          {
            path: '/order/stayimplement',
            name: 'StayImplement',
            meta: {
              name: 'ggg'
            },
            component: () => import('../components/StayImplement.vue')
          },
          {
            path: '/order/implementing',
            name: 'Implementing',
            meta: {
              name: 'ggg'
            },
            component: () => import('../components/Implementing.vue')
          },
          {
            path: '/order/stayevaluate',
            name: 'StayEvaluate',
            meta: {
              name: 'ggg'
            },
            component: () => import('../components/StayEvaluate.vue')
          }
        ]
      },
      {
        path: '/mine',
        name: 'Mine',
        meta: {
          name: '我的'
        },
        component: () => import('../views/Mine.vue')
      },

    ]
  },
  {
    path: '/orderapply',
    name: 'OrderApply',
    meta: {
      name: '11'
    },
    component: () => import('../components/OrderApply.vue')
  },
  {
    path: '/mapaddress',
    name: 'MapAddress',
    meta: {
      isBack: false
    },
    component: () => import('../views/Address/MapAddress.vue')
  },
  
  {
    path: '/addressindex',
    name: 'AddressIndex',
    redirect: '/implementaddress',
    component: () => import('../views/Address/index.vue'),
    children: [
      {
        path: '/implementaddress',
        name: 'ImplementAddress',
        component: () => import('../views/Address/ImplementAddress.vue')
      },
      {
        path: '/modifyaddress',
        name: 'ModifyAddress',
        meta: {
          keepAlive: true,
          isBack: false
        },
        component: () => import('../views/Address/ModifyAddress.vue')
      }
    ]
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: () => import('../views/Subscribe.vue')
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: () => import('../views/Evaluation.vue')
  },
  {
    path: '/sceneconfirme',
    name: 'SceneConfirme',
    component: () => import('../views/SceneConfirme.vue')
  },
  {
    path: '/serviceconfirm',
    name: 'ServiceConfirm',
    component: () => import('../views/ServiceConfirm.vue')
  }
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
