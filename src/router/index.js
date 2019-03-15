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
import controlhousing from '@/components/lamppost/deploy/controlhousing'
import LampPole from '@/components/lamppost/deploy/LampPole'
import Lampsandlanterns from '@/components/lamppost/deploy/Lampsandlanterns'
import advertisingscreen from '@/components/lamppost/deploy/advertisingscreen'
import sensor from '@/components/lamppost/deploy/sensor'
import loraSensor from '@/components/lamppost/deploy/loraSensor'

import chargingPiles from '@/components/lamppost/equipment/chargingPiles'
import advertisingScreens from '@/components/lamppost/equipment/advertisingScreens'
import sensors from '@/components/lamppost/equipment/sensors'
import historicalData from '@/components/lamppost/equipment/historicalData'
import loraQuery from '@/components/lamppost/equipment/loraQuery'
import loading from '@/components/lamppost/equipment/loading'


import pandect from '@/components/lamppost/pandect/pandect'
import pandectone from '@/components/lamppost/pandect/pandectone'
import pandecttwo from '@/components/lamppost/pandect/pandecttwo'

import DeviceLog from '@/components/lamppost/DeviceLog/DeviceLog' //设备日志
import LampPoleJournal from '@/components/lamppost/DeviceLog/LampPoleJournal' //灯杆日志
import lampJournal from '@/components/lamppost/DeviceLog/lampJournal' //灯具日志
import screenJournal from '@/components/lamppost/DeviceLog/screenJournal' //广告屏日志
import sensorJournal from '@/components/lamppost/DeviceLog/sensorJournal' //气象站日志

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
import QueryStatistics from '@/components/Inspection/QueryStatistics' //查询统计
import InspectionItems from '@/components/Inspection/InspectionItems' //检查项目
import InspectionSite from '@/components/Inspection/InspectionSite' //巡检地点
import InspectionRoute from '@/components/Inspection/InspectionRoute' //巡检路线
import PatrolPlan from '@/components/Inspection/PatrolPlan' //巡检计划
import Record from '@/components/Inspection/Record' //巡检记录
//  
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
  if(code=='11001'){
    this.$message({
        message: '用户电话已经存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11002'){
    this.$message({
        message: '组织电话已经存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11003'){
    this.$message({
        message: '添加组织失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11004'){
    this.$message({
        message: '添加用户失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11005'){
    this.$message({
        message: '添加权限失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11006'){
    this.$message({
        message: '添加用户操作权限失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11007'){
    this.$message({
        message: '添加菜单权限失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11008'){
    this.$message({
        message: '用户没有登录',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11009'){
    this.$message({
        message: '会话过期',
        type: 'error',
        showClose: true,
    });
    this.$router.push({'path':'/'})
  }
  if(code=='11010'){
    this.$message({
        message: '错误的用户名和密码',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11011'){
    this.$message({
        message: '失败添加操作日志',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11012'){
    this.$message({
        message: '更新组织失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11013'){
    this.$message({
        message: '删除组织失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11014'){
    this.$message({
        message: '添加登录日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11015'){
    this.$message({
        message: '请通过正确的通道访问',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11016'){
    this.$message({
        message: '添加用户项目关系失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11017'){
    this.$message({
        message: '更新用户失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11018'){
    this.$message({
        message: '删除权限菜单之间的关系失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11019'){
    this.$message({
        message: '删除权限操作按钮之间的关系失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11020'){
    this.$message({
        message: '删除用户项目之间的关系失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11021'){
    this.$message({
        message: '删除用户失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11022'){
    this.$message({
        message: '更新用户类型失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11023'){
    this.$message({
        message: '没有查看该组织的权限',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11024'){
    this.$message({
        message: '没有查看该组织下的用户的权限',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11025'){
    this.$message({
        message: '没有权限查看该城市下的项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11026'){
    this.$message({
        message: '添加项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11027'){
    this.$message({
        message: '没有权限添加该组织的项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11028'){
    this.$message({
        message: '没有权限添加项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11029'){
    this.$message({
        message: '没有权限查看用户',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11030'){
    this.$message({
        message: '没有权限查看项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11031'){
    this.$message({
        message: '给管理员绑定项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11032'){
    this.$message({
        message: '更新项目信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11033'){
    this.$message({
        message: '没有权限更新项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11034'){
    this.$message({
        message: '没有权限删除项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11035'){
    this.$message({
        message: '登录失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11036'){
    this.$message({
        message: '没有权限修改用户',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11037'){
    this.$message({
        message: '确认密码不一致',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11038'){
    this.$message({
        message: '旧密码是错的',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11039'){
    this.$message({
        message: '删除项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11040'){
    this.$message({
        message: '配置组织用户权限失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11041'){
    this.$message({
        message: '没有权限更新该组织',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11042'){
    this.$message({
        message: '组织名重复',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11043'){
    this.$message({
        message: '用户名重复',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11044'){
    this.$message({
        message: '组织管理员不允许删除',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11045'){
    this.$message({
        message: '组织管理员不允许禁止',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11046'){
    this.$message({
        message: '不能修改用户它本身',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11047'){
    this.$message({
        message: '没权限重新指定管理员',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11048'){
    this.$message({
        message: '管理员的所属组织不允许修改',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11049'){
    this.$message({
        message: '系统组织不允许修改',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11050'){
    this.$message({
        message: '没权限在该组织下添加用户',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11051'){
    this.$message({
        message: '组织管理员不允许禁用',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11052'){
    this.$message({
        message: '没有权限删除该组织',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11053'){
    this.$message({
        message: '请先删除组织相关项目再删除组织',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11054'){
    this.$message({
        message: '二级组织用户不能将所属组织为系统组织的修改为其他组织',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11055'){
    this.$message({
        message: '组织级数不能超过5级',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11056'){
    this.$message({
        message: '用户没有项目权限查看',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11057'){
    this.$message({
        message: '用户没有这个项目权限查看',
        type: 'error',
        showClose: true,
    });
  }
}
Vue.prototype.errorCode2 = function(code){
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
        message: '文件大小大于50M',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='11009'){
    this.$message({
        message: '会话过期',
        type: 'error',
        showClose: true,
    });
    this.$router.push({'path':'/'})
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
        message: '媒体已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12012'){
    this.$message({
        message: '节目已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12013'){
    this.$message({
        message: '屏幕已存在',
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
        message: '修改当前播放节目id失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12022'){
    this.$message({
        message: '修改操作日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12023'){
    this.$message({
        message: '修改xwalk启动状态失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12024'){
    this.$message({
        message: '节目下发失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12025'){
    this.$message({
        message: 'xwalk启动失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12026'){
    this.$message({
        message: 'xwalk加载html失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12027'){
    this.$message({
        message: '删除sd板上文件失',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12028'){
    this.$message({
        message: '获取sd板上文件大小失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12029'){
    this.$message({
        message: '广告屏型号不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12030'){
    this.$message({
        message: '节目不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12031'){
    this.$message({
        message: '屏幕关闭失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12032'){
    this.$message({
        message: '屏幕不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12033'){
    this.$message({
        message: '屏幕下发http请求错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12034'){
    this.$message({
        message: '节目下发sd网关错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12035'){
    this.$message({
        message: '删除节目详情失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12036'){
    this.$message({
        message: '开启屏幕失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12037'){
    this.$message({
        message: '屏幕绑定灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12038'){
    this.$message({
        message: '屏幕解绑灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12039'){
    this.$message({
        message: '屏幕宽高比不一致',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12040'){
    this.$message({
        message: '屏幕设置节目播放位置失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12041'){
    this.$message({
        message: '节目详情不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12042'){
    this.$message({
        message: '当前屏幕正在上传中',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12043'){
    this.$message({
        message: '屏幕已经绑定灯杆，请先解绑灯杆才能更改所属项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12044'){
    this.$message({
        message: '屏幕绑定项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12045'){
    this.$message({
        message: '编辑媒体别名失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12046'){
    this.$message({
        message: '媒体不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12047'){
    this.$message({
        message: '屏幕重置坐标信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12048'){
    this.$message({
        message: '节目滚动文字不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12049'){
    this.$message({
        message: '获取屏幕详情失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12050'){
    this.$message({
        message: '屏幕开关状态更新失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12051'){
    this.$message({
        message: '设置屏幕控制卡开关失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='12052'){
    this.$message({
        message: '节目未上传!',
        type: 'error',
        showClose: true,
    });
  }

  if(code=='13001'){
    this.$message({
        message: '添加单灯失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13002'){
    this.$message({
        message: '删除单灯失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13003'){
    this.$message({
        message: '单灯不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13004'){
    this.$message({
        message: '单灯已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13005'){
    this.$message({
        message: '添加单灯操作日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13006'){
    this.$message({
        message: '修改单灯信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13007'){
    this.$message({
        message: '单灯型号不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13008'){
    this.$message({
        message: '添加单灯控制日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13009'){
    this.$message({
        message: '修改单灯控制日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13010'){
    this.$message({
        message: '添加单灯策略失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13011'){
    this.$message({
        message: '单灯策略已经存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13012'){
    this.$message({
        message: '修改单灯策略失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13013'){
    this.$message({
        message: '删除单灯策略失',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13014'){
    this.$message({
        message: '添加单灯报警失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13015'){
    this.$message({
        message: '单灯控制指令不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13016'){
    this.$message({
        message: '下发单灯策略失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13017'){
    this.$message({
        message: '单灯网关上传数据类型不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13018'){
    this.$message({
        message: '单灯控制失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13019'){
    this.$message({
        message: '单灯策略不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13020'){
    this.$message({
        message: '设置单灯当前策略失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13021'){
    this.$message({
        message: '单灯控制命令下发网关失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13022'){
    this.$message({
        message: '单灯下发http请求错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13023'){
    this.$message({
        message: '单灯绑定灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13024'){
    this.$message({
        message: '单灯解绑灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13025'){
    this.$message({
        message: '单灯绑定项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13026'){
    this.$message({
        message: '单灯已经绑定灯杆，请先解绑灯杆才能更改所属项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13027'){
    this.$message({
        message: '单灯已离线,操作失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13028'){
    this.$message({
        message: '单灯重置坐标信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13029'){
    this.$message({
        message: '获取单灯信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13030'){
    this.$message({
        message: '该项目下没有用户',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13031'){
    this.$message({
        message: '策略已过期',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13032'){
    this.$message({
        message: '策略内容为空',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='13033'){
    this.$message({
        message: '清空策略失败',
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
        message: '单灯控制命令错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='14004'){
    this.$message({
        message: '单灯策略时效参数错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15001'){
    this.$message({
        message: '添加灯杆错误',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15002'){
    this.$message({
        message: '添加灯杆日志失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15003'){
    this.$message({
        message: '修改灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15004'){
    this.$message({
        message: '删除灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15005'){
    this.$message({
        message: '灯杆不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15006'){
    this.$message({
        message: '灯杆绑定单灯失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15007'){
    this.$message({
        message: '单灯同步更新灯杆地址失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15008'){
    this.$message({
        message: '屏幕同步更新灯杆地址失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15009'){
    this.$message({
        message: '气象站同步更新灯杆地址失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15010'){
    this.$message({
        message: '删除灯杆解绑单灯失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15011'){
    this.$message({
        message: '删除灯杆解绑屏幕失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15012'){
    this.$message({
        message: '删除灯杆解绑气象站失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15013'){
    this.$message({
        message: '灯杆绑定项目失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15014'){
    this.$message({
        message: '灯杆已存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='15015'){
    this.$message({
        message: '灯杆重置坐标信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='16001'){
    this.$message({
        message: '获取模型信息失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17001'){
    this.$message({
        message: '没有操作该气象站的权限',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17002'){
    this.$message({
        message: '添加气象站失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17003'){
    this.$message({
        message: '该集中器标识不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17004'){
    this.$message({
        message: '该气象站不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17005'){
    this.$message({
        message: '该灯杆不存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17006'){
    this.$message({
        message: '请至少选择一个气象站',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17007'){
    this.$message({
        message: '该集中器标识已经存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17008'){
    this.$message({
        message: '气象站解绑灯杆失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17009'){
    this.$message({
        message: '气象站网关请求失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17010'){
    this.$message({
        message: '请先解除灯杆绑定在重新绑定项目',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17011'){
    this.$message({
        message: '修改气象站失败',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17012'){
    this.$message({
        message: '气象站编号已经存在',
        type: 'error',
        showClose: true,
    });
  }
  if(code=='17013'){
    this.$message({
        message: '气象站重置坐标信息失败',
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
              path: '/controlhousing',
              name: 'controlhousing',
              component: controlhousing,
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
          path: '/Record',
          name: 'Record',
          component: Record,
        },
      ]
    }
  ]
})
