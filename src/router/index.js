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
import lampslanterns from '@/components/lamppost/equipment/lampslanterns'
import deploy from '@/components/lamppost/deploy/deploy'
import concentrator from '@/components/lamppost/deploy/concentrator'
import LampPole from '@/components/lamppost/deploy/LampPole'
import Lampsandlanterns from '@/components/lamppost/deploy/Lampsandlanterns'
import advertisingscreen from '@/components/lamppost/deploy/advertisingscreen'
import sensor from '@/components/lamppost/deploy/sensor'
import loraSensor from '@/components/lamppost/deploy/loraSensor'
import solinRelayDeploy from '@/components/lamppost/deploy/solinRelayDeploy'
import solinCameraDeploy from '@/components/lamppost/deploy/solinCameraDeploy'
import solinIlluminance from '@/components/lamppost/deploy/solinIlluminance'
import SceneryDeploy from '@/components/lamppost/deploy/SceneryDeploy'




import chargingPiles from '@/components/lamppost/equipment/chargingPiles'
import advertisingScreens from '@/components/lamppost/equipment/advertisingScreens'
import sensors from '@/components/lamppost/equipment/sensors'
import historicalData from '@/components/lamppost/equipment/historicalData'
import loraQuery from '@/components/lamppost/equipment/loraQuery'
import loading from '@/components/lamppost/equipment/loading'
import Relay from '@/components/lamppost/equipment/Relay'
import scene from '@/components/lamppost/equipment/scene'
import CameraManage from '@/components/lamppost/equipment/CameraManage'
import IlluminanceManage from '@/components/lamppost/equipment/IlluminanceManage'
import Scenery from '@/components/lamppost/equipment/Scenery'
import SceneryHistory from '@/components/lamppost/equipment/SceneryHistory'


import pandect from '@/components/lamppost/pandect/pandect'
import pandecttwo from '@/components/lamppost/pandect/pandecttwo'

import DeviceLog from '@/components/lamppost/DeviceLog/DeviceLog' //设备日志
import LampPoleJournal from '@/components/lamppost/DeviceLog/LampPoleJournal' //灯杆日志
import lampJournal from '@/components/lamppost/DeviceLog/lampJournal' //灯具日志
import screenJournal from '@/components/lamppost/DeviceLog/screenJournal' //广告屏日志
import sensorJournal from '@/components/lamppost/DeviceLog/sensorJournal' //气象站日志
import RelayJournal from '@/components/lamppost/DeviceLog/RelayJournal' //继电器日志
import loraJournal from '@/components/lamppost/DeviceLog/loraJournal' //lora传感器日志
import loadingLog from '@/components/lamppost/DeviceLog/loading' 
import ConcentratorLog from '@/components/lamppost/DeviceLog/ConcentratorLog' //继电器日志
import CameraLog from '@/components/lamppost/DeviceLog/CameraLog' //摄像头日志
import IlluminanceLog from '@/components/lamppost/DeviceLog/IlluminanceLog' //光照度日志
import SceneryLog from '@/components/lamppost/DeviceLog/SceneryLog' //光照度日志


// import mapHomgPage from '@/components/map/mapHomgPage' //地图主页
// import mapDetails from '@/components/map/mapDetails' //地图主页
import mapHomg from '@/components/map/mapHomg' //地图主页
import GIS from '@/components/map/DTmap/GIS' //地图主页
import SingleLamp from '@/components/map/DTmap/SingleLamp' //单灯地图
import Camera from '@/components/map/DTmap/Camera' //摄像头地图
import LED from '@/components/map/DTmap/LED' //led地图
import GISdetails from '@/components/map/DTmap/GISdetails' //GIS详情
import SceneryMap from '@/components/map/DTmap/SceneryMap' //风光控制器地图
import SceneryDetails from '@/components/map/DTmap/SceneryDetails' //风光控制器详情




import video from '@/components/video/video' //视频管理主页
import wifi from '@/components/wifi/wifi' //WIFI管理主页
import broadcast from '@/components/broadcast/broadcast' //广播管理主页

import program from '@/components/program/program' //节目管理页面
import programSimple from '@/components/program/programSimple' //简易节目页面
import programSenior from '@/components/program/programSenior' //高级节目页面

import Inspection from '@/components/Inspection/Inspection' //巡检管理页面
import UserSettings from '@/components/Inspection/UserSettings' //用户设置
import task from '@/components/Inspection/task/task' //巡检计划 (总页面)
import patrolItem from '@/components/Inspection/task/patrolItem' //巡检项
import InspectionSite from '@/components/Inspection/task/InspectionSite' //巡检地点
import InspectionRoute from '@/components/Inspection/task/InspectionRoute' //巡检路线
import PatrolPlan from '@/components/Inspection/task/PatrolPlan' //巡检计划
import Statistics from '@/components/Inspection/Statistics' //巡检记录
import todayPatrolPlan from '@/components/Inspection/todayPatrolPlan' //今日任务
import historyPatrolRecord from '@/components/Inspection/historyPatrolRecord' //历史任务
import Record from '@/components/Inspection/Record' //巡检记录
import AppUpgrade from '@/components/Inspection/AppUpgrade' //巡检APP升级
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
		localStorage.messageNumber = Number(localStorage.messageNumber) + 1
		console.log(localStorage.messageNumber)
		if(localStorage.messageNumber>1){
			return
		}else{
			this.$message({
				message: '会话过期',
				type: 'error',
				showClose: true,
			});
			this.$router.push({'path':'/'})
		}
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
              path: '/lampslanterns',
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
            {
              path: '/CameraManage',
              name: 'CameraManage',
              component: CameraManage,
            },
            {
              path: '/IlluminanceManage',
              name: 'IlluminanceManage',
              component: IlluminanceManage,
            },
            {
              path: '/Scenery',
              name: 'Scenery',
              component: Scenery,
            },
            {
              path: '/SceneryHistory',
              name: 'SceneryHistory',
              component: SceneryHistory,
            },
          ]
        },
        {
          path: '/deploy',
          name: 'deploy',
          component: deploy,
          children:[
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
            {
              path: '/solinCameraDeploy',
              name: 'solinCameraDeploy',
              component: solinCameraDeploy,
            },
            {
              path: '/solinIlluminance',
              name: 'solinIlluminance',
              component: solinIlluminance,
            },
            {
              path: '/SceneryDeploy',
              name: 'SceneryDeploy',
              component: SceneryDeploy,
            },
          ]
        },
        {
          path: '/DeviceLog',
          name: 'DeviceLog',
          component: DeviceLog,
          children:[
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
            {
              path: '/RelayJournal',
              name: 'RelayJournal',
              component: RelayJournal,
            },
            {
              path: '/ConcentratorLog',
              name: 'ConcentratorLog',
              component: ConcentratorLog,
            },
            {
              path: '/loadingLog',
              name: 'loadingLog',
              component: loadingLog,
            },
            {
              path: '/CameraLog',
              name: 'CameraLog',
              component: CameraLog,
            },
            {
              path: '/IlluminanceLog',
              name: 'IlluminanceLog',
              component: IlluminanceLog,
            },
            {
              path: '/SceneryLog',
              name: 'SceneryLog',
              component: SceneryLog,
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
      path: '/mapHomg',
      name: 'mapHomg',
      component: mapHomg,
      children:[
        {
          path: '/',
          name: 'GIS',
          component: GIS,
        },
        {
          path: '/SingleLamp',
          name: 'SingleLamp',
          component: SingleLamp,
        },
        {
          path: '/Camera',
          name: 'Camera',
          component: Camera,
        },
        {
          path: '/LED',
          name: 'LED',
          component: LED,
        },
        {
          path: '/SceneryMap',
          name: 'SceneryMap',
          component: SceneryMap,
        },
      ]
    },
    {
      path: '/GISdetails',
      name: 'GISdetails',
      component: GISdetails,
    },
    {
      path: '/SceneryDetails',
      name: 'SceneryDetails',
      component: SceneryDetails,
    },
    // {
    //   path: '/mapDetails',
    //   name: 'mapDetails',
    //   component: mapDetails,
    // },
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
          path: '/task',
          name: 'task',
          component: task,
          children:[
            {
              path: '/patrolItem',
              name: 'patrolItem',
              component: patrolItem,
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
          ]
        },
        
        {
          path: '/Statistics',
          name: 'Statistics',
          component: Statistics,
        },
        {
          path: '/todayPatrolPlan',
          name: 'todayPatrolPlan',
          component: todayPatrolPlan,
        },
        {
          path: '/historyPatrolRecord',
          name: 'historyPatrolRecord',
          component: historyPatrolRecord,
        },
        {
          path: '/Record',
          name: 'Record',
          component: Record,
        },
        {
          path: '/AppUpgrade',
          name: 'AppUpgrade',
          component: AppUpgrade,
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
