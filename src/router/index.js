import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'

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
import Refresh from '@/components/lamppost/Refresh'
import equipment from '@/components/lamppost/equipment/equipment'
import homepage from '@/components/lamppost/equipment/homepage'
import lampslanterns from '@/components/lamppost/equipment/lampslanterns'
import deploy from '@/components/lamppost/deploy/deploy'
import deployhomepage from '@/components/lamppost/deploy/deployhomepage'
import concentrator from '@/components/lamppost/deploy/concentrator'
import LampPole from '@/components/lamppost/deploy/LampPole'
import Lampsandlanterns from '@/components/lamppost/deploy/Lampsandlanterns'
import advertisingscreen from '@/components/lamppost/deploy/advertisingscreen'
import sensor from '@/components/lamppost/deploy/sensor'
import loraSensor from '@/components/lamppost/deploy/loraSensor'
import solinRelayDeploy from '@/components/lamppost/deploy/solinRelayDeploy'


import chargingPiles from '@/components/lamppost/equipment/chargingPiles'
import advertisingScreens from '@/components/lamppost/equipment/advertisingScreens'
import sensors from '@/components/lamppost/equipment/sensors'
import historicalData from '@/components/lamppost/equipment/historicalData'
import loraQuery from '@/components/lamppost/equipment/loraQuery'
import loading from '@/components/lamppost/equipment/loading'
import Relay from '@/components/lamppost/equipment/Relay'
import scene from '@/components/lamppost/equipment/scene'



import pandect from '@/components/lamppost/pandect/pandect'
import pandectone from '@/components/lamppost/pandect/pandectone'
import pandecttwo from '@/components/lamppost/pandect/pandecttwo'

import DeviceLog from '@/components/lamppost/DeviceLog/DeviceLog' //设备日志
import LampPoleJournal from '@/components/lamppost/DeviceLog/LampPoleJournal' //灯杆日志
import lampJournal from '@/components/lamppost/DeviceLog/lampJournal' //灯具日志
import screenJournal from '@/components/lamppost/DeviceLog/screenJournal' //广告屏日志
import sensorJournal from '@/components/lamppost/DeviceLog/sensorJournal' //气象站日志
import loraJournal from '@/components/lamppost/DeviceLog/loraJournal' //lora传感器日志


import mapHomgPage from '@/components/map/mapHomgPage' //地图主页
import mapDetails from '@/components/map/mapDetails' //地图主页

import video from '@/components/video/video' //视频管理主页
import wifi from '@/components/wifi/wifi' //WIFI管理主页
import broadcast from '@/components/broadcast/broadcast' //广播管理主页

import program from '@/components/program/program' //节目管理页面
import programSimple from '@/components/program/programSimple' //简易节目页面
import programSenior from '@/components/program/programSenior' //高级节目页面

import Inspection from '@/components/Inspection/Inspection' //巡检管理页面
import UserSettings from '@/components/Inspection/UserSettings' //用户设置
import category from '@/components/Inspection/category' //巡检类别
import patrolItem from '@/components/Inspection/patrolItem' //巡检项
import QueryStatistics from '@/components/Inspection/QueryStatistics' //查询统计
import InspectionItems from '@/components/Inspection/InspectionItems' //检查项目
import InspectionSite from '@/components/Inspection/InspectionSite' //巡检地点
import InspectionRoute from '@/components/Inspection/InspectionRoute' //巡检路线
import PatrolPlan from '@/components/Inspection/PatrolPlan' //巡检计划
import Record from '@/components/Inspection/Record' //巡检记录
import loading2 from '@/components/Inspection/loading' //巡检loading

//  
Vue.use(Router)
Vue.use(ElementUI);
var error = {}
$.ajax({
  type:'get',
  async:false,
  url:'../static/error.json',
  // url:'../solin-platform/static/error.json',
  dataType: "text",
  success:function(data){
    error = eval('(' + data + ')');
  }
})
Vue.prototype.errorCode = function(data){
  if(data.errorCode=='11009'){
    this.$message({
        message: '会话过期',
        type: 'error',
        showClose: true,
    });
    this.$router.push({'path':'/'})
  }else if(data.errorCode=='10002'){
    this.$message({
        message: data.result.errorMessage,
        type: 'error',
        showClose: true,
    });
  }else{
    var messageData = error[data.errorCode]
    this.$message({
        message: messageData,
        type: 'error',
        showClose: true,
    });
  }
}
Vue.prototype.Verification = function(val,type){
  var that = this
  //中文验证
  var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  //手机号码验证
  var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
  //邮箱验证
  var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  //IP地址验证
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|[*])$/;
  
  //0为密码验证
  if(result.test(val)){
    that.$message({
        message: '密码字段不能有中文',
        type: 'error',
        showClose: true,
    });
    return;
  }
  
  //1为手机号验证
  if(!phone.test(val)){
    that.$message({
        message: '电话不符合格式',
        type: 'error',
        showClose: true,
    });
    return false;
  }

  if(!email.test(val)){
      that.$message({
          message: '邮箱不符合格式',
          type: 'error',
          showClose: true,
      });
      return;
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
          name: 'deploy',
          component: deploy,
          // children:[
          //   {
          //     path: '/',
          //     name: 'LampPole',
          //     component: LampPole,
          //   },
          // ]
        },
        {
          path: '/Refresh',
          name: 'Refresh',
          component: Refresh
        },
        {
          path: '/equipment',
          name: 'equipment',
          component: equipment,
          children:[
            {
              path: '/',
              name: 'lampslanterns',
              component: lampslanterns,
            },
            {
              path: '/program',
              name: 'program',
              component: program,
            },
            {
              path: '/programSimple',
              name: 'programSimple',
              component: programSimple
            },
            {
              path: '/programSenior',
              name: 'programSenior',
              component: programSenior
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
              path: '/sensors',
              name: 'sensors',
              component: sensors,
            },
            {
              path: '/historicalData',
              name: 'historicalData',
              component: historicalData,
            },
            {
              path: '/loraQuery',
              name: 'loraQuery',
              component: loraQuery,
            },
            {
              path: '/loading',
              name: 'loading',
              component: loading,
            },
            {
              path: '/Relay',
              name: 'Relay',
              component: Relay,
            },
            {
              path: '/scene',
              name: 'scene',
              component: scene,
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
              name: 'LampPole',
              component: LampPole,
            },
            // {
            //   path: '/deployhomepage',
            //   name: 'deployhomepage',
            //   component: deployhomepage,
            // },
            {
              path: '/concentrator',
              name: 'concentrator',
              component: concentrator,
            },
            {
              path: '/LampPole',
              name: 'LampPole',
              component: LampPole,
            },
            {
              path: '/Lampsandlanterns',
              name: 'Lampsandlanterns',
              component: Lampsandlanterns,
            },
            {
              path: '/advertisingscreen',
              name: 'advertisingscreen',
              component: advertisingscreen,
            },
            {
              path: '/sensor',
              name: 'sensor',
              component: sensor,
            },
            {
              path: '/loraSensor',
              name: 'loraSensor',
              component: loraSensor,
            },
            {
              path: '/solinRelayDeploy',
              name: 'solinRelayDeploy',
              component: solinRelayDeploy,
            },
          ]
        },
        {
          path: '/DeviceLog',
          name: 'DeviceLog',
          component: DeviceLog,
          children:[
            {
              path: '/',
              name: 'LampPoleJournal',
              component: LampPoleJournal,
            },
            {
              path: '/LampPoleJournal',
              name: 'LampPoleJournal',
              component: LampPoleJournal,
            },
            {
              path: '/lampJournal',
              name: 'lampJournal',
              component: lampJournal,
            },
            {
              path: '/screenJournal',
              name: 'screenJournal',
              component: screenJournal,
            },
            {
              path: '/sensorJournal',
              name: 'sensorJournal',
              component: sensorJournal,
            },
            {
              path: '/loraJournal',
              name: 'loraJournal',
              component: loraJournal,
            },
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
    },
    {
      path: '/mapHomgPage',
      name: 'mapHomgPage',
      component: mapHomgPage,
    },
    {
      path: '/mapDetails',
      name: 'mapDetails',
      component: mapDetails,
    },
    {
      path: '/video',
      name: 'video',
      component: video,
    },
    {
      path: '/wifi',
      name: 'wifi',
      component: wifi,
    },
    {
      path: '/broadcast',
      name: 'broadcast',
      component: broadcast,
    },
    {
      path: '/Inspection',
      name: 'Inspection',
      component: Inspection,
      children:[
        {
          path: '/',
          name: 'UserSettings',
          component: UserSettings,
        },
        {
          path: '/UserSettings',
          name: 'UserSettings',
          component: UserSettings,
        },
        {
          path: '/QueryStatistics',
          name: 'QueryStatistics',
          component: QueryStatistics,
        },
        {
          path: '/InspectionItems',
          name: 'InspectionItems',
          component: InspectionItems,
        },
        {
          path: '/InspectionSite',
          name: 'InspectionSite',
          component: InspectionSite,
        },
        {
          path: '/InspectionRoute',
          name: 'InspectionRoute',
          component: InspectionRoute,
        },
        {
          path: '/PatrolPlan',
          name: 'PatrolPlan',
          component: PatrolPlan,
        },
        {
          path: '/category',
          name: 'category',
          component: category,
        },
        {
          path: '/Record',
          name: 'Record',
          component: Record,
        },
        {
          path: '/patrolItem',
          name: 'patrolItem',
          component: patrolItem,
        },
        {
          path: '/loading2',
          name: 'loading2',
          component: loading2,
        },
      ]
    }
  ]
})
