import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import login from '@/components/login'
import index from '@/components/index'
// 用户中心
import usercenter from '@/components/usercentre/usercenter'
import user from '@/components/usercentre/user/user'
import organization from '@/components/usercentre/organization/organization'
import article from '@/components/usercentre/article/article'
import journal from '@/components/usercentre/journal/journal'
//灯杆系统
import lamppost from '@/components/lamppost/lamppost'
import pandect from '@/components/lamppost/pandect/pandect'
import equipment from '@/components/lamppost/equipment/equipment'
import homepage from '@/components/lamppost/equipment/homepage'
import lampslanterns from '@/components/lamppost/equipment/lampslanterns'
import deploy from '@/components/lamppost/deploy/deploy'
import controlhousing from '@/components/lamppost/deploy/controlhousing'
import lampslanternstwo from '@/components/lamppost/deploy/lampslanternstwo'
import chargingpile from '@/components/lamppost/deploy/chargingpile'
import advertisingscreen from '@/components/lamppost/deploy/advertisingscreen'
import camera from '@/components/lamppost/deploy/camera'
import chargingPiles from '@/components/lamppost/equipment/chargingPiles'
import advertisingScreens from '@/components/lamppost/equipment/advertisingScreens'
import cameras from '@/components/lamppost/equipment/cameras'
import pandectone from '@/components/lamppost/pandect/pandectone'

Vue.use(Router)
Vue.use(ElementUI);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/lamppost',
      name: 'lamppost',
      component: lamppost,
      children:[
        {
          path: '/',
          name: 'pandect',
          component: pandect,
          children:[
            {
              path: '/',
              name: 'pandectone',
              component: pandectone,
            },
            {
              path: '/pandectone',
              name: 'pandectone',
              component: pandectone,
            }
          ]
        },
        {
          path: '/pandect',
          name: 'pandect',
          component: pandect,
          children:[
            {
              path: '/',
              name: 'pandectone',
              component: pandectone,
            },
            {
              path: '/pandectone',
              name: 'pandectone',
              component: pandectone,
            }
          ]
        },
        {
          path: '/equipment',
          name: 'equipment',
          component: equipment,
          children:[
            {
              path: '/',
              name: 'homepage',
              component: homepage,
            },
            {
              path: '/homepage',
              name: 'homepage',
              component: homepage,
            },
            {
              path: '/lampslanterns',
              name: 'lampslanterns',
              component: lampslanterns,
            },
            {
              path: '/chargingPiles',
              name: 'chargingPiles',
              component: chargingPiles,
            },
            {
              path: '/advertisingScreens',
              name: 'advertisingScreens',
              component: advertisingScreens,
            },
            {
              path: '/cameras',
              name: 'cameras',
              component: cameras,
            },
          ]
        },
        {
          path: '/deploy',
          name: 'deploy',
          component: deploy,
          children:[
            {
              path: '/',
              name: 'controlhousing',
              component: controlhousing,
            },
            {
              path: '/controlhousing',
              name: 'controlhousing',
              component: controlhousing,
            },
            {
              path: '/lampslanternstwo',
              name: 'lampslanternstwo',
              component: lampslanternstwo,
            },
            {
              path: '/chargingpile',
              name: 'chargingpile',
              component: chargingpile,
            },
            {
              path: '/advertisingscreen',
              name: 'advertisingscreen',
              component: advertisingscreen,
            },
            {
              path: '/camera',
              name: 'camera',
              component: camera,
            }
          ]
        }
      ]
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: usercenter,
      children:[
        {
          path: '/',
          name: 'user',
          component: user,
        },
        {
          path: '/user',
          name: 'user',
          component: user,
        },
        {
          path: '/organization',
          name: 'organization',
          component: organization,
        },
        {
          path: '/article',
          name: 'article',
          component: article,
        },
        {
          path: '/journal',
          name: 'journal',
          component: journal,
        }
      ]
    }
  ]
})
