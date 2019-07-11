<template>
    <!-- 单灯地图页面 -->
    <div class="SingleLamp">
        <div class="project_top_left">
            <el-select v-model="value" @change="projectChange" placeholder="请选择" id="borderRadiu40">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.projectName"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="statistical">
            <div class="statistical_top">
                <img src="../../../assets/img/staticdeng.png" alt="">
                单灯设备状态
            </div>
            <hr>
            <div class="statistical_equipment">
                <div class="statistical_equipment_left" id="Equipment_echarts"></div>
                <div class="statistical_equipment_right">
                    <div>
                        <img src="../../../assets/img/fault.png" alt="">
                        <span>故障</span>
                        <span style="color:#fe3819;font-size: 22px;"><i>{{statisticalData.alarmCount}}</i></span>
                    </div>
                    <div>
                        <img src="../../../assets/img/Unknown.png" alt="">
                        <span>未知</span>
                        <span style="color:#fe9b08;font-size: 22px;"><i>{{statisticalData.otherCount}}</i></span>
                    </div>
                    <div>
                        <img src="../../../assets/img/online.png" alt="">
                        <span>在线</span>
                        <span style="color:#00e6ac;font-size: 22px;"><i>{{statisticalData.onlineCount}}</i></span>
                    </div>
                    <div>
                        <img src="../../../assets/img/offline.png" alt="">
                        <span>离线</span>
                        <span style="color:#90a9bb;font-size: 22px;"><i>{{statisticalData.offlineCount}}</i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="weather" :id="timeData.type2=='1' ? 'weather1':''||timeData.type2=='2' ? 'weather2':''||timeData.type2=='3' ? 'weather3':''">
            <div>
                <span>
                    {{timeData.temperature}}℃
                </span>
                <div class="weather_div">
                    <p>{{timeData.City}}</p>
                    <p>{{timeData.type}} {{timeData.fengxiang}}</p>
                </div>
            </div>
            <div>
                <p>{{timeData.Hours}}:{{timeData.Minutes}}:{{timeData.Seconds}}</p>
                <p>{{timeData.FullYear}}/{{timeData.Month}}/{{timeData.Dates}} 星期{{timeData.getDay}}</p>
            </div>
        </div>
        <div class="information" v-if="information_type">
            <div class="information_top">
                <span>设备信息</span>
                <span @click="information_type=false">X</span>
            </div>
            <div class="information_bottom">
                <div>
                    <span>名&nbsp;&nbsp;&nbsp;称:</span>
                    <span>{{informationData.nickName}}</span>
                </div>
                <div>
                    <span>IP:</span>
                    <span>{{informationData.ipAddress}}</span>
                </div>
                <div>
                    <span>状态:</span>
                    <span>
                        <template v-if="informationData.online=='0'">离线</template>
                        <template v-if="informationData.online=='1'">在线</template>
                    </span>
                </div>
                <div>
                    <span>厂&nbsp;&nbsp;&nbsp;商:</span>
                    <span>{{informationData.producerName}}</span>
                </div>
                <div>
                    <span>创建时间:</span>
                    <span style="letter-spacing:0;">{{informationData.createTime}}</span>
                </div>
                <div style="text-align: right;">
                    <el-button @click="preview" type="primary" size="small">预览</el-button>
                </div>
            </div>
        </div>
        <!-- 摄像头模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:470px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">{{informationData.nickName}}</h4>
                    </div>
                    <div class="modal-body Modal">
                        <a href="https://get.adobe.com/cn/flashplayer/" class="flashLoadMsg" target="_blank">请点击安装或者启用FLASH播放器</a>
                        <div id="engage_view" style="display: block;">
                            <div id="engage_content">
                                <div id="engage_resize_container">
                                    <div id="engage_video" style="width: 100%;height: 270px;">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <div class="Modal_left" style="width: 100%;height: 270px;">
                <a href="https://get.adobe.com/cn/flashplayer/" class="flashLoadMsg" target="_blank">请点击安装或者启用FLASH播放器</a>
                <div id="engage_view" style="display: block;">
                    <div id="engage_content">
                        <div id="engage_resize_container">
                            <div id="engage_video" style="width: 100%;height: 270px;">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog> -->
        <div class="allmap" v-if="locationType=='1'">
            <div id="allmap"></div>
        </div>
    </div>
</template>
<script>
import VideoJs from 'video.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
// import func from './vue-temp/vue-editor-bridge';
export default {
    name: 'SingleLamp',
    data () {
        return {
            serverurl:localStorage.serverurl,
            imgserverurl:'',
            options:[],
            value:'',
            statisticalData:{
                alarmCount: '',
                offlineCount: '',
                onlineCount: '',
                otherCount: ''
            },//设备状态数据
            readyData:[],
            informationData:{},
            information_type:false,
            locationType:'',
            radio1:'1',
            time:null,
            timeData:{
                City:'',
                temperature:'',
                type:'',
                type2:'',
                fengxiang:'',
                FullYear:'',
                Month:'',
                Dates:'',
                Hours:'',
                Minutes:'',
                Seconds:'',
                getDay:'',
            },

            player:'',
            name:'',
            id:'',
            url:'',

            time2:null,
            timeValue:0,
        }
    },
    mounted(){
       this.times()
    },
    methods:{
        //获取有权限的项目
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects/type/2',
                contentType:'application/json;charset=UTF-8',
                data:{
                    type:'1'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.projects
                        that.locationType = that.options[0].locationType
                        that.value = that.options[0].id
                        var name = that.options[0].area.mergerName
                        var area = name.split(',')
                        that.timeData.City = area[2]
                        that.weatherRequest()
                        that.Statistics()
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //项目切换change
        projectChange(id){
            for(var i=0;i<this.options.length;i++){
                if(this.options[i].id==id){
                    var name = this.options[i].area.mergerName
                    var area = name.split(',')
                    this.timeData.City = area[2]
                    this.locationType = this.options[i].locationType
                }
            }
            this.weatherRequest()
            this.Statistics()
            this.ready()
        },
        //获取项目下的统计数据
        Statistics(){
            var that = this;
            $.ajax({
                type:"get",
                url:that.serverurl+'/v1/solin/camera/map/status',
                dataType:"json",
                async: false,
                data:{projectIds:that.value},
                success:function(data){
                    if(data.errorCode=='0'){
                        data.result.alarmCount = 0
                        data.result.otherCount = 0
                        that.statisticalData = data.result
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            var myChart = that.$echarts.init(document.getElementById('Equipment_echarts'))
            var num = that.statisticalData.alarmCount+that.statisticalData.otherCount+that.statisticalData.onlineCount+that.statisticalData.offlineCount
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'类型',
                        type:'pie',
                        radius: ['72%', '88%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter:function (argument) {
                                    var html;
                                    html=num+'\r\n\r\n总数';
                                    return html;
                                },
                                textStyle:{
                                    fontSize: 18,
                                    color:'#000001'
                                }
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:that.statisticalData.alarmCount, 
                                name:'故障',
                                itemStyle:{
                                    color:'#fe3819'
                                }
                            },
                            {
                                value:that.statisticalData.otherCount, 
                                name:'未知',
                                itemStyle:{
                                    color:'#fe9b08'
                                }
                            },
                            {
                                value:that.statisticalData.onlineCount, 
                                name:'在线',
                                itemStyle:{
                                    color:'#00e6ac'
                                }
                            },
                            {
                                value:that.statisticalData.offlineCount, 
                                name:'离线',
                                itemStyle:{
                                    color:'#90a9bb'
                                }
                            },
                        ]
                    }
                ]
            })
        },
        //预览
        preview(){
            var that = this;
            var flag = false;
            if(window.ActiveXObject){
                try{
                    var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if(swf){
                        flag = true;
                    }
                }catch(e){
                }
            }else{
                try{
                    var swf = navigator.plugins['Shockwave Flash'];
                    if(swf){
                        flag = true;
                    }
                }catch(e){
                }
            }
            if(flag){
                $('.flashLoadMsg').css('display','none')
            }else{
                $('.flashLoadMsg').css('display','flex')
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/preview',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(
                    {
                        command:'1',
                        id:that.informationData.id,
                    }
                ),
                success:function(data){
                    if(data.errorCode=='0'){
                        $('#myModal').modal('show')
                        that.timeValue = 0
                        var url = localStorage.serverurl.split('/')
                        url = url[2].split(':')
                        that.url ='rtmp://' + url[0]+':8072'+ data.result.camera.rtmpStream
                        var id = 'video-my'
                        $('#engage_video').append(
                            '<video id="'+id+'" class="video-js vjs-default-skin vjs-big-play-centered flex-grid" poster="" width="438" height="270">'+
                                '<source src="'+that.url+'" type="rtmp/flv"/>'+
                            '</video>'
                        )
                        that.player = VideoJs('video-my');
                        that.player.play();
                        that.time2  = setInterval(function(){
                            that.timeValue++
                            if(that.timeValue==480){
                                that.timeValue = 0
                                that.preview2(val.id)
                            }
                        },1000)
                        $('#myModal').on('hide.bs.modal', function () {
                            that.player.dispose()
                            clearInterval(that.time2)
                            that.time2 = null
                        })
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //预览时间延长
        preview2(val){
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/preview/extend/'+that.informationData.id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){}else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //初始化 百度地图/平面图
        ready(){
            var that = this;
            var data = {
                page:1,
                size:500,
                projectIds:that.value
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/map/list',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.cameras.length;i++){
                            if(data.result.cameras[i].coord==null||data.result.cameras[i].coord==''){
                                data.result.cameras.splice(i,1);
                                i--
                            }
                        }
                        that.readyData = data.result.cameras
                        if(that.locationType=='1'){
                            // 百度地图API功能
                            var map = new BMap.Map("allmap");    // 创建Map实例
                            if(data.result.cameras.length==0){
                                map.centerAndZoom(that.timeData.City, 16); 
                            }else{
                                var coord = ''
                                coord = data.result.cameras[0].coord
                                coord = coord.split(',')
                                map.centerAndZoom(new BMap.Point(coord[0],coord[1]), 16);  // 初始化地图,设置中心点坐标和地图级别
                            }  
                            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩
                            //添加灯杆坐标放
                            var online = new BMap.Icon(that.imgserverurl+"image/img/Camera02.png", new BMap.Size(45,45));
                            var offline = new BMap.Icon(that.imgserverurl+"image/img/Camera03.png", new BMap.Size(45,45));
                            var Unknown = new BMap.Icon(that.imgserverurl+"image/img/Camera04.png", new BMap.Size(45,45));
                            var abnormal = new BMap.Icon(that.imgserverurl+"image/img/Camera01.gif", new BMap.Size(210,210));
                            for(var i=0;i<data.result.cameras.length;i++){
                                if(data.result.cameras[i].coord==''||data.result.cameras[i].coord==undefined||data.result.cameras[i].coord==null){

                                }else{
                                    var coord = data.result.cameras[i].coord
                                    var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                    // if(data.result.cameras[i].poleStatus=='2'){
                                    //     var marker = new BMap.Marker(point,{icon:abnormal});
                                    // }else if(data.result.cameras[i].poleStatus=='3'){
                                    //     var marker = new BMap.Marker(point,{icon:Unknown});
                                    // }else 
                                    if(data.result.cameras[i].online=='1'){
                                        var marker = new BMap.Marker(point,{icon:online});
                                    }else{
                                        var marker = new BMap.Marker(point,{icon:offline});
                                    }
                                    marker.id=data.result.cameras[i].id
                                    marker.type=that.value1
                                    map.addOverlay(marker);
                                } 
                            }
                            //鼠标左键请求基本信息
                            map.addEventListener("click", function (e) {
                                if(e.overlay){
                                    for(var i=0;i<that.readyData.length;i++){
                                        if(e.overlay.id==that.readyData[i].id){
                                            that.informationData = that.readyData[i]
                                        }
                                    }
                                    that.information_type = true
                                }
                            });
                        }
                        if(that.locationType=='0'){
                       
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        times(){
            var that = this;
            this.time=setInterval(function(){
                var myDate = new Date();//获取系统当前时间
                that.timeData.FullYear = myDate.getFullYear(); //获取完整的年份
                that.timeData.Month = myDate.getMonth()+1; //获取当前月份
                that.timeData.Dates = myDate.getDate(); //获取当前日
                var d = myDate.getHours(); //获取当前小时数
                var e = myDate.getMinutes(); //获取当前分钟数
                var f = myDate.getSeconds(); //获取当前秒数
                var g = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
                if(d<10){
                    that.timeData.Hours = '0'+d
                }else{
                    that.timeData.Hours = d
                }
                if(e<10){
                    that.timeData.Minutes = '0'+e
                }else{
                    that.timeData.Minutes = e
                }
                if(f<10){
                    that.timeData.Seconds = '0'+f
                }else{
                    that.timeData.Seconds = f
                }
                if(g==0){that.timeData.getDay='日'}
                if(g==1){that.timeData.getDay='一'}
                if(g==2){that.timeData.getDay='二'}
                if(g==3){that.timeData.getDay='三'}
                if(g==4){that.timeData.getDay='四'}
                if(g==5){that.timeData.getDay='五'}
                if(g==6){that.timeData.getDay='六'}
            },1000)
        },
        //获取城市天气预报
        weatherRequest(){
            var that = this;
            var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
            httpRequest.open('GET', 'http://wthrcdn.etouch.cn/weather_mini?city='+that.timeData.City, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
            httpRequest.send();//第三步：发送请求  将请求参数写在URL中
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var json = httpRequest.responseText;//获取到json字符串，还需解析
                    var data = JSON.parse(json).data;
                    that.timeData.temperature = data.wendu
                    that.timeData.type = data.forecast[0].type
                    that.timeData.fengxiang = data.forecast[0].fengxiang
                    if(that.timeData.type.indexOf('雨')!=-1){
                        that.timeData.type2='1'
                    }else if(that.timeData.type.indexOf('雪')!=-1){
                        that.timeData.type2='2'
                    }else if(that.timeData.type.indexOf('云')!=-1||that.timeData.type.indexOf('晴')!=-1){
                        that.timeData.type2='3'
                    }else{
                        that.timeData.type2='3'
                    }
                }
            };
        },
    },
    created(){
        //设置img的路径
        var url = localStorage.serverurl
        url = url.split('/')
        this.imgserverurl = url[0]+'//'+url[2]+'/solin-platform/'
        this.project()
    },
    beforeDestroy(){
        clearInterval(this.time)
        this.time = null
    }
}
</script>
<style scoped>
hr{margin: 0;}
.SingleLamp{width: 100%;height: 100%;position: relative;}
.project_top_left{position: absolute;top: 0;left: 0;width: 450px;height: 81px;background: #303e60;border-top-right-radius: 40px;border-bottom-right-radius: 40px;display: flex;justify-content: center;align-items: center;z-index: 2;}
.project_top_left>div{width: 350px;}
.statistical{width: 410px;height: 285px;border-radius: 10px;box-shadow: 2px 2px 8px 1px #303e60;position: absolute;top: 110px;left: 35px;padding: 0 15px 0 15px;z-index: 2;background: white;}
.statistical_top{height: 67px;display: flex;align-items: center;font-size: 20px;color: #333333;}
.statistical_top>img{padding-right: 15px;}
.statistical_equipment{width: 100%;padding: 15px 20px;height: 215px;display: flex;}
.statistical_equipment_left{width: 200px;height: 100%;}
.statistical_equipment_right{width: 150px;height: 100%;padding: 15px 0 20px 10px;}
.statistical_equipment_right>div{padding-top: 5px;padding-left: 15px;}
.statistical_equipment_right>div>span:nth-of-type(1){font-size: 18px;margin: 0 20px 0 5px;;}
.weather{position: absolute;top:35px;right:35px;width: 355px;height: 193px;border-radius: 27px;box-shadow: 2px 2px 8px 1px #303e60;color: white;z-index: 2;}
#weather1{background: url('../../../assets/img/tq3.png') 100% 100%;}
#weather2{background: url('../../../assets/img/tq4.png') 100% 100%;}
#weather3{background: url('../../../assets/img/tq1.png') 100% 100%;}
.weather>div:nth-of-type(1){padding:22px 0 15px 25px;display: flex;}
.weather>div:nth-of-type(1)>span{font-size: 46px;font-weight: 600;};
.weather_div{padding-left: 20px;}
.weather_div>p{margin:0 !important;padding:0 0 0 20px !important;font-size: 18px;}
.weather_div>p:nth-of-type(1){margin-bottom: 2px !important;}
.weather>div:nth-of-type(2){width: 100%;padding:0 20px 0 0;text-align: right;}
.weather>div:nth-of-type(2)>p{margin: 0;}
.weather>div:nth-of-type(2)>p:nth-of-type(1){font-size: 44px;height: 55px;font-weight: 600;}
.weather>div:nth-of-type(2)>p:nth-of-type(2){font-size: 22px;}
.information{width: 330px;height: 420px;padding:0 15px 17px 15px;border-radius: 8px;background: #737d93;position: absolute;top:430px;left:120px;z-index: 2;}
.information_top{width: 100%;height: 65px;line-height: 65px;color: white;font-size: 22px;padding-left: 15px;}
.information_top>span:nth-of-type(2),.lampData_top>span:nth-of-type(2){position: absolute;right: 25px;font-size: 22px;cursor: pointer;color: #dfe1e8;}
.information_bottom{width: 100%;height: 330px;;border-radius: 5px;background: white;padding: 5px 5px 10px 5px;}
.information_bottom>div{padding-top: 25px;font-size: 17px;}
.information_bottom>div>span:nth-of-type(1){display: inline-block;width: 90px;text-align: right;}
.information_bottom>div>span:nth-of-type(2){padding-left: 20px;letter-spacing:1px;}
.flashLoadMsg{width: 90%;height: 90%;background: black;display: flex;justify-content: center;align-items: center;font-size: 16px;display: none;position: absolute;z-index: 9;}
.video-js{width: 100% !important;height: 270px !important;}
.allmap{width: 100%;height: 100%;}
.allmap>div{width: 100%;height: 100%;}
</style>
