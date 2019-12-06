import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import '../assets/css/public.css'

import login from '@/components/login'
import index from '@/components/index'
// 用户中心
import userCenter from '@/components/usercentre/userCenter'
import managementUser from '@/components/usercentre/user/managementUser'
import managementOrg from '@/components/usercentre/org/managementOrg'
import managementProject from '@/components/usercentre/Project/managementProject'
import managementLog from '@/components/usercentre/Log/managementLog'
//灯杆系统
import lamppost from '@/components/lamppost/lamppost'
import Refresh from '@/components/lamppost/Refresh'
import equipment from '@/components/lamppost/equipment/equipment'
import solinLampManage from '@/components/lamppost/equipment/solinLampManage'
import deploy from '@/components/lamppost/deploy/deploy'
import solinConcentratorDeploy from '@/components/lamppost/deploy/solinConcentratorDeploy'
import solinPoleDeploy from '@/components/lamppost/deploy/solinPoleDeploy'
import solinLampDeploy from '@/components/lamppost/deploy/solinLampDeploy'
import solinScreenDeploy from '@/components/lamppost/deploy/solinScreenDeploy'
import solinEnvDeploy from '@/components/lamppost/deploy/solinEnvDeploy'
import solinLoraSensorsDeploy from '@/components/lamppost/deploy/solinLoraSensorsDeploy'
import solinRelayDeploy from '@/components/lamppost/deploy/solinRelayDeploy'
import solinCameraDeploy from '@/components/lamppost/deploy/solinCameraDeploy'
import solinIlluminance from '@/components/lamppost/deploy/solinIlluminance'
import solinSceneryControllerDeploy from '@/components/lamppost/deploy/solinSceneryControllerDeploy'
import solinRadarDeploy from '@/components/lamppost/deploy/solinRadarDeploy'


import solinScreenManage from '@/components/lamppost/equipment/solinScreenManage'
import solinEnvManage from '@/components/lamppost/equipment/solinEnvManage'
import historicalData from '@/components/lamppost/equipment/historicalData'
import solinLoraSensorsManage from '@/components/lamppost/equipment/solinLoraSensorsManage'
import loading from '@/components/lamppost/equipment/loading'
import solinRelayManage from '@/components/lamppost/equipment/solinRelayManage'
import scene from '@/components/lamppost/equipment/scene'
import solinCameraManage from '@/components/lamppost/equipment/solinCameraManage'
import solinIlluminanceManage from '@/components/lamppost/equipment/solinIlluminanceManage'
import solinSceneryControllerManage from '@/components/lamppost/equipment/solinSceneryControllerManage'
import SceneryHistory from '@/components/lamppost/equipment/SceneryHistory'
import solinRadarManage from '@/components/lamppost/equipment/solinRadarManage'


import DeviceLog from '@/components/lamppost/DeviceLog/DeviceLog' //设备日志
import solinPoleLog from '@/components/lamppost/DeviceLog/solinPoleLog' //灯杆日志
import solinLampLog from '@/components/lamppost/DeviceLog/solinLampLog' //灯具日志
import solinScreenLog from '@/components/lamppost/DeviceLog/solinScreenLog' //广告屏日志
import solinEnvLog from '@/components/lamppost/DeviceLog/solinEnvLog' //气象站日志
import solinRelayLog from '@/components/lamppost/DeviceLog/solinRelayLog' //继电器日志
import solinLoraSensorsLog from '@/components/lamppost/DeviceLog/solinLoraSensorsLog' //lora传感器日志
import loadingLog from '@/components/lamppost/DeviceLog/loading'
import solinConcentratorLog from '@/components/lamppost/DeviceLog/solinConcentratorLog' //继电器日志
import solinCameraLog from '@/components/lamppost/DeviceLog/solinCameraLog' //摄像头日志
import solinIlluminanceLog from '@/components/lamppost/DeviceLog/solinIlluminanceLog' //光照度日志
import solinSceneryControllerLog from '@/components/lamppost/DeviceLog/solinSceneryControllerLog' //光照度日志
import solinRadarLog from '@/components/lamppost/DeviceLog/solinRadarLog' //光照度日志


import mapHomg from '@/components/map/mapHomg' //地图主页
import GIS from '@/components/map/DTmap/GIS' //地图主页
import SingleLamp from '@/components/map/DTmap/SingleLamp' //单灯地图
import Camera from '@/components/map/DTmap/Camera' //摄像头地图
import LED from '@/components/map/DTmap/LED' //led地图
import GISdetails from '@/components/map/DTmap/GISdetails' //GIS详情
import SceneryMap from '@/components/map/DTmap/SceneryMap' //风光控制器地图
import SceneryDetails from '@/components/map/DTmap/SceneryDetails' //风光控制器详情

import program from '@/components/program/program' //节目管理页面
import programSimple from '@/components/program/programSimple' //简易节目页面
import programSenior from '@/components/program/programSenior' //高级节目页面
import TheTaskPage from '@/components/program/TheTaskPage' //任务制作主页
import mediaLibrary from '@/components/program/module/mediaLibrary' //媒体库页面
import ProgramList from '@/components/program/module/ProgramList' //节目管理页面
import taskManage from '@/components/program/module/taskManage' //任务管理页面
import Programming from '@/components/program/module/Programming' //节目制作页面


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
	type: 'get',
	async: false,
	// url: '../static/error.json',
	url:'../solin/static/error.json',
	dataType: "text",
	success: function (data) {
		error = eval('(' + data + ')');
	}
})
Vue.prototype.errorCode = function (data) {
	if (data.errorCode == '11009') {
		localStorage.messageNumber = Number(localStorage.messageNumber) + 1
		if (localStorage.messageNumber > 1) {
			this.$router.push({ 'path': '/' })
			return
		} else {
			this.$message({
				message: '会话过期',
				type: 'error',
				showClose: true,
			});
			this.$router.push({ 'path': '/' })
		}
	} else if (data.errorCode == '10002') {
		this.$message({
			message: data.result.errorMessage,
			type: 'error',
			showClose: true,
		});
	} else {
		var messageData = error[data.errorCode]
		this.$message({
			message: messageData,
			type: 'error',
			showClose: true,
		});
	}
}
Vue.prototype.Verification = function (val, type) {

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
			children: [
				{
					path: '/Refresh',
					name: 'Refresh',
					component: Refresh
				},
				{
					path: '/equipment',
					name: 'equipment',
					component: equipment,
					children: [
						{
							path: '/solinLampManage',
							name: 'solinLampManage',
							component: solinLampManage,
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
							path: '/solinScreenManage',
							name: 'solinScreenManage',
							component: solinScreenManage,
						},
						{
							path: '/solinEnvManage',
							name: 'solinEnvManage',
							component: solinEnvManage,
						},
						{
							path: '/historicalData',
							name: 'historicalData',
							component: historicalData,
						},
						{
							path: '/solinLoraSensorsManage',
							name: 'solinLoraSensorsManage',
							component: solinLoraSensorsManage,
						},
						{
							path: '/loading',
							name: 'loading',
							component: loading,
						},
						{
							path: '/solinRelayManage',
							name: 'solinRelayManage',
							component: solinRelayManage,
						},
						{
							path: '/scene',
							name: 'scene',
							component: scene,
						},
						{
							path: '/solinCameraManage',
							name: 'solinCameraManage',
							component: solinCameraManage,
						},
						{
							path: '/solinIlluminanceManage',
							name: 'solinIlluminanceManage',
							component: solinIlluminanceManage,
						},
						{
							path: '/solinSceneryControllerManage',
							name: 'solinSceneryControllerManage',
							component: solinSceneryControllerManage,
						},
						{
							path: '/SceneryHistory',
							name: 'SceneryHistory',
							component: SceneryHistory,
						},
						{
							path: '/solinRadarManage',
							name: 'solinRadarManage',
							component: solinRadarManage,
						},
					]
				},
				{
					path: '/deploy',
					name: 'deploy',
					component: deploy,
					children: [
						{
							path: '/solinConcentratorDeploy',
							name: 'solinConcentratorDeploy',
							component: solinConcentratorDeploy,
						},
						{
							path: '/solinPoleDeploy',
							name: 'solinPoleDeploy',
							component: solinPoleDeploy,
						},
						{
							path: '/solinLampDeploy',
							name: 'solinLampDeploy',
							component: solinLampDeploy,
						},
						{
							path: '/solinScreenDeploy',
							name: 'solinScreenDeploy',
							component: solinScreenDeploy,
						},
						{
							path: '/solinEnvDeploy',
							name: 'solinEnvDeploy',
							component: solinEnvDeploy,
						},
						{
							path: '/solinLoraSensorsDeploy',
							name: 'solinLoraSensorsDeploy',
							component: solinLoraSensorsDeploy,
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
							path: '/solinSceneryControllerDeploy',
							name: 'solinSceneryControllerDeploy',
							component: solinSceneryControllerDeploy,
						},
						{
							path: '/solinRadarDeploy',
							name: 'solinRadarDeploy',
							component: solinRadarDeploy,
						},
					]
				},
				{
					path: '/DeviceLog',
					name: 'DeviceLog',
					component: DeviceLog,
					children: [
						{
							path: '/solinPoleLog',
							name: 'solinPoleLog',
							component: solinPoleLog,
						},
						{
							path: '/solinLampLog',
							name: 'solinLampLog',
							component: solinLampLog,
						},
						{
							path: '/solinScreenLog',
							name: 'solinScreenLog',
							component: solinScreenLog,
						},
						{
							path: '/solinEnvLog',
							name: 'solinEnvLog',
							component: solinEnvLog,
						},
						{
							path: '/solinLoraSensorsLog',
							name: 'solinLoraSensorsLog',
							component: solinLoraSensorsLog,
						},
						{
							path: '/solinRelayLog',
							name: 'solinRelayLog',
							component: solinRelayLog,
						},
						{
							path: '/solinConcentratorLog',
							name: 'solinConcentratorLog',
							component: solinConcentratorLog,
						},
						{
							path: '/loadingLog',
							name: 'loadingLog',
							component: loadingLog,
						},
						{
							path: '/solinCameraLog',
							name: 'solinCameraLog',
							component: solinCameraLog,
						},
						{
							path: '/solinIlluminanceLog',
							name: 'solinIlluminanceLog',
							component: solinIlluminanceLog,
						},
						{
							path: '/solinSceneryControllerLog',
							name: 'solinSceneryControllerLog',
							component: solinSceneryControllerLog,
						},
						{
							path: '/solinRadarLog',
							name: 'solinRadarLog',
							component: solinRadarLog,
						},
					]
				},
				{
					path: '/TheTaskPage',
					name: 'TheTaskPage',
					component: TheTaskPage,
					children:[
						{
							path: '/mediaLibrary',
							name: 'mediaLibrary',
							component: mediaLibrary
						},
						{
							path: '/ProgramList',
							name: 'ProgramList',
							component: ProgramList
						},
						{
							path: '/taskManage',
							name: 'taskManage',
							component: taskManage
						},
					]
				},
				{
					path: '/Programming',
					name: 'Programming',
					component: Programming
				},
			]
		},
		{
			path: '/userCenter',
			name: 'userCenter',
			component: userCenter,
			children: [
				{
					path: '/managementUser',
					name: 'managementUser',
					component: managementUser,
				},
				{
					path: '/managementOrg',
					name: 'managementOrg',
					component: managementOrg,
				},
				{
					path: '/managementProject',
					name: 'managementProject',
					component: managementProject,
				},
				{
					path: '/managementLog',
					name: 'managementLog',
					component: managementLog,
				}
			]
		},
		{
			path: '/mapHomg',
			name: 'mapHomg',
			component: mapHomg,
			children: [
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
		{
			path: '/Inspection',
			name: 'Inspection',
			component: Inspection,
			children: [
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
					children: [
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
