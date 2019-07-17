<template>
    <!-- 单灯地图页面 -->
    <div class="SingleLamp">
        <div class="project_top_left">
            <el-select v-model="value" size="small" @change="projectChange" placeholder="请选择" id="borderRadiu40">
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
                LED设备状态
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
        <!-- <div class="weather" :id="timeData.type2=='1' ? 'weather1':''||timeData.type2=='2' ? 'weather2':''||timeData.type2=='3' ? 'weather3':''">
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
        </div> -->
        <div class="information" v-if="information_type">
            <div class="information_top">
                <span>设备信息</span>
                <span style="font-size:14px;" @click="information_type=false">X</span>
            </div>
            <div class="information_bottom">
                <table class="table table-bordered information_bottom_table">
                    <tr>
                        <td>名&emsp;&emsp;称:</td>
                        <td>{{informationData.nickName}}</td>
                    </tr>
                    <tr>
                        <td>序 &nbsp;列 &nbsp;号:</td>
                        <td>{{informationData.serialNumber}}</td>
                    </tr>
                    <tr>
                        <td>宽&nbsp; × &nbsp;高:</td>
                        <td>{{informationData.width}} × {{informationData.height}}</td>
                    </tr>
                    <tr>
                        <td>当前任务:</td>
                        <td>
                            <template v-if="informationData.taskName==null">-------</template>
                            <template v-else>{{informationData.taskName}}</template>
                        </td>
                    </tr>
                    <tr>
                        <td>在线状态:</td>
                        <td>
                            <template v-if="informationData.online=='1'">在线</template>
                            <template v-else>离线</template>
                        </td>
                    </tr>
                    <tr>
                        <td>屏幕状态:</td>
                        <td>
                            <template v-if="informationData.status=='1'">开启</template>
                            <template v-else>关闭</template>
                        </td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{{informationData.createTime}}</td>
                    </tr>   
                </table>
            </div>
        </div>
        <div class="allmap" v-if="locationType=='1'">
            <div id="allmap"></div>
        </div>
        <!-- <div class="title">
            <div>{{informationData.nickName}}</div>
            <div>序列号:{{informationData.serialNumber}}</div>
        </div>   -->
    </div>
</template>
<script>
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
        }
    },
    mounted(){
    //    this.times()
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
                        for(var i = 0;i<data.result.projects.length;i++){
                            if(data.result.projects[i].id==0){
                                data.result.projects.splice(i,1)
                                i--
                            }
                        }
                        that.options = data.result.projects
                        that.locationType = that.options[0].locationType
                        if(sessionStorage.projectId==''||sessionStorage.projectId==null||sessionStorage.projectId==undefined){
                            that.value = that.options[0].id
                        }else{
                            that.value = Number(sessionStorage.projectId)
                        }
                        // that.value = that.options[0].id
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
            sessionStorage.projectId = id;
            // this.weatherRequest()
            this.Statistics()
            this.ready()
        },
        //获取项目下的统计数据
        Statistics(){
            var that = this;
            $.ajax({
                type:"get",
                url:that.serverurl+'/v1/solin/screen/map/count',
                dataType:"json",
                async: false,
                data:{projectIds:that.value},
                success:function(data){
                    if(data.errorCode=='0'){
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
                        radius: ['80%', '95%'],
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
                url:that.serverurl+'/v1/solin/screen/device',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.list.length;i++){
                            if(data.result.list[i].coord==null||data.result.list[i].coord==''){
                                data.result.list.splice(i,1);
                                i--
                            }
                        }
                        that.readyData = data.result.list
                        if(that.locationType=='1'){
                            // 百度地图API功能
                            var map = new BMap.Map("allmap",{enableMapClick:false});    // 创建Map实例
                            if(data.result.list.length==0){
                                map.centerAndZoom(that.timeData.City, 16); 
                            }else{
                                var coord = ''
                                coord = data.result.list[0].coord
                                coord = coord.split(',')
                                map.centerAndZoom(new BMap.Point(coord[0],coord[1]), 16);  // 初始化地图,设置中心点坐标和地图级别
                            }
                            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                            //添加灯杆坐标
                            var online = new BMap.Icon(that.imgserverurl+"image/img/LED02.png", new BMap.Size(45,45));
                            var offline = new BMap.Icon(that.imgserverurl+"image/img/LED03.png", new BMap.Size(45,45));
                            var Unknown = new BMap.Icon(that.imgserverurl+"image/img/LED04.png", new BMap.Size(45,45));
                            var abnormal = new BMap.Icon(that.imgserverurl+"image/img/LED01.gif", new BMap.Size(210,210));
                            for(var i=0;i<data.result.list.length;i++){
                                if(data.result.list[i].coord==''||data.result.list[i].coord==undefined||data.result.list[i].coord==null){

                                }else{
                                    var coord = data.result.list[i].coord
                                    var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                    if(data.result.list[i].status=='2'){
                                        var marker = new BMap.Marker(point,{icon:abnormal});
                                    }else if(data.result.list[i].status=='3'){
                                        var marker = new BMap.Marker(point,{icon:Unknown});
                                    }else if(data.result.list[i].online=='1'){
                                        var marker = new BMap.Marker(point,{icon:online});
                                    }else{
                                        var marker = new BMap.Marker(point,{icon:offline});
                                    }

                                    marker.id=data.result.list[i].id
                                    marker.type=that.value1
                                    map.addOverlay(marker);
                                } 
                            }
                            map.setMapStyleV2({     
                                styleId: '7ff9f4f543ec7f2704516df1a246f110'
                            });
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
    },
    created(){
        //设置img的路径
        var url = localStorage.serverurl.split('/')
        this.imgserverurl = url[0]+'//'+url[2]+'/solin-platform/'
        this.project()
    },
    beforeDestroy(){
        // clearInterval(this.time)
        // this.time = null
    }
}
</script>
<style scoped>
hr{margin: 0;}
.SingleLamp{width: 100%;height: 100%;position: relative;}
.project_top_left{position: absolute;top: 0;left: 0;width: 403px;height: 48px;background: #303e60;border-top-right-radius: 40px;border-bottom-right-radius: 40px;display: flex;justify-content: center;align-items: center;z-index: 2;}
.project_top_left>div{width: 348px;}
.statistical{width: 350px;height: 190px;border-radius: 10px;box-shadow: 3px 3px 5px #999;position: absolute;top: 75px;left: 10px;padding: 0 15px 0 15px;z-index: 2;background: white;}
.statistical_top{height: 40px;display: flex;align-items: center;font-size: 15px;color: #333333;}
.statistical_top>img{padding-right: 15px;width: 40px;}
.statistical_equipment{width: 100%;padding: 5px 20px;display: flex;}
.statistical_equipment_left{width:170px;height:115px;margin-top: 10px;}
.statistical_equipment_right{height: 100%;}
.statistical_equipment_right>div{padding-top: 2px;padding-left: 15px;}
.statistical_equipment_right>div>span:nth-of-type(1){font-size: 14px;}
/* .weather{position: absolute;top:35px;right:35px;width: 355px;height: 193px;border-radius: 27px;box-shadow: 2px 2px 8px 1px #303e60;color: white;z-index: 2;}
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
.weather>div:nth-of-type(2)>p:nth-of-type(2){font-size: 22px;} */
.information{width: 256px;height: 330px;border-radius:5px;position: absolute;top:350px;left:170px;z-index: 2;box-shadow: 3px 3px 5px #999;}
.information_top{width: 100%;height: 45px;line-height: 45px;background:white;color: #333333;font-size: 16px;padding-left: 15px;border-bottom: 1px solid #ebeff5;;border-top-left-radius: 5px;border-top-right-radius: 5px;}
.information_top>span:nth-of-type(2),.lampData_top>span:nth-of-type(2){position: absolute;right: 10px;cursor: pointer;}
.information_bottom{padding:10px;position: absolute;top: 45px;bottom: 0;background: white;width: 100%;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;}
.information_bottom_table{font-size: 12px;}
.information_bottom_table>tr{height: 35px;line-height: 35px;border: 1px solid #ebeff5;}
.information_bottom_table>tr>td:nth-of-type(1){width: 40%;background: #f3f4f9;text-align: center;}
.information_bottom_table>tr>td:nth-of-type(2){text-align: left;padding-left: 5px;}
.allmap{width: 100%;height: 100%;}
.allmap>div{width: 100%;height: 100%;}

/* .title{width: 150px;height: 100px;border-radius:5px;position: absolute;z-index: 2;box-shadow: 0px 3px 15px -1px #000000;top:50px;left:500px;}
.title>div{width: 100%;height: 50px;}
.title>div:nth-of-type(1){background: linear-gradient(to right, #0097ff , #5eb3ff);border-top-left-radius: 5px;border-top-right-radius: 5px;}
.title>div:nth-of-type(2){background: white;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;} */
</style>
