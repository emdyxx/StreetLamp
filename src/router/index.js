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
import deployhomepage from '@/components/lamppost/deploy/deployhomepage'
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
Vue.prototype.errorCode = function(code){
  if(code=='10001'){
    this.$message({
        message: '参数错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10005'){
    this.$message({
        message: '添加失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10006'){
    this.$message({
        message: '修改失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10110'){
    this.$message({
        message: '删除失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10200'){
    this.$message({
        message: '文件类型错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10201'){
    this.$message({
        message: '文件上传失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='10202'){
    this.$message({
        message: '文件大小大于500M',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12001'){
    this.$message({
        message: '添加屏幕失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12002'){
    this.$message({
        message: '修改屏幕失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12003'){
    this.$message({
        message: '删除屏幕失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12004'){
    this.$message({
        message: '添加节目失敗',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12005'){
    this.$message({
        message: '修改节目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12006'){
    this.$message({
        message: '删除节目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12007'){
    this.$message({
        message: '添加媒体失敗',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12008'){
    this.$message({
        message: '修改媒体失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12009'){
    this.$message({
        message: '删除媒体失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12010'){
    this.$message({
        message: '屏幕已关闭',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12011'){
    this.$message({
        message: '添加/修改失败，媒体已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12012'){
    this.$message({
        message: '添加/修改失败，节目已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12013'){
    this.$message({
        message: '添加/修改失败，屏幕已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12014'){
    this.$message({
        message: '设置节目下发失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12015'){
    this.$message({
        message: '添加节目详情失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12016'){
    this.$message({
        message: '添加屏幕操作日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12017'){
    this.$message({
        message: '添加屏幕下发详情日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12018'){
    this.$message({
        message: '初始化js失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12019'){
    this.$message({
        message: '修改是否初始化js状态失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12020'){
    this.$message({
        message: '修改上传状态失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12021'){
    this.$message({
        message: '修改当前播放节目id',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14001'){
    this.$message({
        message: '屏幕发送命令，请求错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14002'){
    this.$message({
        message: '屏幕命令，执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14003'){
    this.$message({
        message: '节目下发失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14004'){
    this.$message({
        message: 'xwalk启动失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14005'){
    this.$message({
        message: 'xwalk加载html失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14006'){
    this.$message({
        message: '删除sd板上文件失败',
        type: 'error',
        showClose: true,
    });
  }
}
Vue.prototype.errorCode2 = function(code){
  if(code=='13001'){
    this.$message({
        message: '单灯开关命令发送失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13002'){
    this.$message({
        message: '单灯调光命令发送失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13003'){
    this.$message({
        message: '单灯开灯命令执行失败',
        type: 'error',
        showClose: true,
    });
  }

  if(code=='13004'){
    this.$message({
        message: '单灯关灯命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13005'){
    this.$message({
        message: '单灯调光命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13006'){
    this.$message({
        message: '单灯状态查询命令发送失败',
        type: 'error',
        showClose: true,
    });
  }

  if(code=='14007'){
    this.$message({
        message: '单灯开关命令发送失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14008'){
    this.$message({
        message: '单灯亮度命令发送失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14009'){
    this.$message({
        message: '单灯状态查询命令发送失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14010'){
    this.$message({
        message: '单灯开灯命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14011'){
    this.$message({
        message: '单灯关灯命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14012'){
    this.$message({
        message: '单灯亮度命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14013'){
    this.$message({
        message: '单灯状态查询命令执行失败',
        type: 'error',
        showClose: true,
    });
  }
}
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
              name: 'deployhomepage',
              component: deployhomepage,
            },
            {
              path: '/deployhomepage',
              name: 'deployhomepage',
              component: deployhomepage,
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
