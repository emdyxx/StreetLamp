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
        <div class="allmap" v-if="locationType=='1'">
            <div id="allmap"></div>
        </div>
        <div class="information" v-if="information_type">
            <div class="information_top">
                单灯控制器
                <span @click="information_type=false">X</span>
            </div>
            <div class="information_bottom">
                <div class="information_bottom_top">
                    开关控制:
                    <el-switch
                    v-model="switchs"
                    style="height:30px;"
                    @change='switchsChange'>
                    </el-switch>
                </div>
                <div class="information_bottom_bttom">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>名&nbsp;&nbsp;称:</td>
                                <td>{{informationData.nickName}}</td>
                                <td>序&nbsp;列&nbsp;号:</td>
                                <td>{{informationData.serialNumber}}</td>
                            </tr>
                            <tr>
                                <td>功&nbsp;率/W:</td>
                                <td>{{informationData.power}}</td>
                                <td>设备状态:</td>
                                <td>
                                    <template v-if="informationData.lampStatus=='2'">
                                        告警
                                    </template>
                                    <template v-else-if="informationData.online=='1'">
                                        在线
                                    </template>
                                    <template v-else>
                                        离线
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td>电&nbsp;压/V:</td>
                                <td>{{informationData.voltage}}</td>
                                <td>电流/mA:</td>
                                <td>{{informationData.electricity*1000}}</td>
                            </tr>
                            <tr>
                                <th colspan="4">
                                   <span style="padding-right:25px;">创建时间:</span>
                                   {{informationData.createTime}}
                                </th>
                            </tr>
                            <tr v-if="informationData.lampStatus=='2'">
                               <th colspan="4">
                                   <span style="padding-right:25px;">告警信息:</span>
                                   {{informationData.jsonContent}}
                                </th> 
                            </tr>
                        </tbody>
                    </table>
                    <!-- <table>
                        <tr>
                            <td>名&nbsp;&nbsp;称:</td>
                            <td>2</td>
                            <td>序&nbsp;列&nbsp;号:</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>功&nbsp;&nbsp;率:</td>
                            <td></td>
                            <td>设备状态:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>电&nbsp;&nbsp;压:</td>
                            <td></td>
                            <td>电&nbsp;&nbsp;&nbsp;&nbsp;流:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td rowspan="2">2018-1-1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table> -->
                </div>
            </div>
        </div>
        <div class="information_two" v-if="information_type"> 
            <el-slider 
                v-model="brightness" 
                :marks="marks"
                style="width:80%;"
                @change='brightnessChange'>
            </el-slider>
            <span class="demonstration">亮度</span>
        </div>
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
            switchs:null,//灯的开关状态
            brightness:null,//灯的亮度
            marks:{
                0: '0%',
                50: '50%',
                100: '100%',
            }
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
                url:that.serverurl+'/v1/solin/lighting/map/lamp/count',
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
                                    fontSize: 16,
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
                dataType:'1',
                projectIds:that.value
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp',
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
                            var online = new BMap.Icon(that.imgserverurl+"image/img/SingleLamp02.png", new BMap.Size(45,45));
                            var offline = new BMap.Icon(that.imgserverurl+"image/img/SingleLamp03.png", new BMap.Size(45,45));
                            var Unknown = new BMap.Icon(that.imgserverurl+"image/img/SingleLamp04.png", new BMap.Size(45,45));
                            var abnormal = new BMap.Icon(that.imgserverurl+"image/img/SingleLamp01.gif", new BMap.Size(210,210));
                            var markers = []
                            for(var i=0;i<data.result.list.length;i++){
                                if(data.result.list[i].coord==''||data.result.list[i].coord==undefined||data.result.list[i].coord==null){

                                }else{
                                    var coord = data.result.list[i].coord
                                    var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                    if(data.result.list[i].lampStatus=='2'){
                                        var marker = new BMap.Marker(point,{icon:abnormal});
                                    }else if(data.result.list[i].lampStatus=='3'){
                                        var marker = new BMap.Marker(point,{icon:Unknown});
                                    }else if(data.result.list[i].online=='1'){
                                        var marker = new BMap.Marker(point,{icon:online});
                                    }else{
                                        var marker = new BMap.Marker(point,{icon:offline});
                                    }
                                    marker.id=data.result.list[i].id
                                    marker.type=that.value1
                                    markers.push(marker)
                                    map.addOverlay(marker);
                                } 
                            }
                            var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
                            markerClusterer.setMinClusterSize(5)
                            map.setMapStyle({style:'light'});
                            // map.setMapStyleV2({     
                            //     styleId: '7ff9f4f543ec7f2704516df1a246f110'
                            // });
                            //鼠标左键请求基本信息
                            map.addEventListener("click", function (e) {
                                if(e.overlay){
                                    for(var i=0;i<that.readyData.length;i++){
                                        if(e.overlay.id==that.readyData[i].id){
                                            that.informationData = that.readyData[i]
                                        }
                                    }
                                    if(that.informationData.lampStatus=='1'){
                                        that.switchs = true
                                    }else{
                                        that.switchs = false
                                    }
                                    if(that.informationData.brightness==null||that.informationData.brightness==''||that.informationData.brightness==undefined){
                                        that.brightness = 0
                                    }else{
                                        that.brightness = Number(that.informationData.brightness)
                                    }
                                    that.information_type = true
                                }else{
                                    that.information_type = false
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
        //灯开关操作
        switchsChange(){
            var that = this;
            var data = {
                "command": '',
                "lamps": '',
                projectId:that.value
            }
            if(that.switchs==true){
                data.command = '1'
            }
            if(that.switchs==false){
                data.command = '2'
            }
            data.lamps = [that.informationData.id]
            that.$confirm('请确认操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val=='1'){
                                that.$message({
                                    message: '操作成功,请稍后刷新页面',
                                    type: 'success'
                                });
                            }
                        }else{
                            if(that.informationData.lampStatus=='1'){
                                that.switchs = true
                            }else{
                                that.switchs = false
                            }
                            that.errorCode(data)
                        }
                    }
                })
            }).catch(() => {
                if(that.informationData.lampStatus=='1'){
                    that.switchs = true
                }else{
                    that.switchs = false
                }
                that.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        //灯亮度操作
        brightnessChange(){
            var that = this;
            var data = {
                "brightness": this.brightness,
                'command':3,
                "lamps": [that.informationData.id],
                projectId:that.value
            }
            that.$confirm('请确认操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '操作成功,请稍后刷新页面!',
                                type: 'success'
                            });
                        }else{
                            if(that.informationData.brightness==null||that.informationData.brightness==''||that.informationData.brightness==undefined){
                                that.brightness = 0
                            }else{
                                that.brightness = Number(that.informationData.brightness)
                            }
                            that.errorCode(data)
                        }
                    }
                })
            }).catch(() => {
                if(that.informationData.brightness==null||that.informationData.brightness==''||that.informationData.brightness==undefined){
                    that.brightness = 0
                }else{
                    that.brightness = Number(that.informationData.brightness)
                }
                that.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
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
.project_top_left{position: absolute;top: 0;left: 0;width: 403px;height: 48px;background: #409eff;border-top-right-radius: 40px;border-bottom-right-radius: 40px;display: flex;justify-content: center;align-items: center;z-index: 2;}
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
.allmap{width: 100%;height: 100%;}
.allmap>div{width: 100%;height: 100%;}
.information{width: 500px;position: absolute;bottom: 150px;;right: 50px;background: #768197;border-radius: 8px;padding: 0 20px 20px 20px;opacity: 0.91;}
.information_top{width: 100%;color: white;height: 45px;line-height: 45px;padding-left: 10px;font-size: 18px;}
.information_top>span{position: absolute;right: 30px;font-size: 18px;cursor: pointer;}
.information_bottom{width: 100%;padding: 10px;background: white;border-radius: 5px;color: #494949;}
.information_bottom_top{width: 100%;height: 30px;line-height: 30px;text-align: right;}
.information_bottom_bttom>table{table-layout:fixed;}
.information_bottom_bttom>table td{height: 25px;line-height: 25px;font-size: 14px;
word-break:keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-moz-text-overflow: ellipsis;}
.information_bottom_bttom>table td:nth-of-type(1),.information_bottom_bttom>table td:nth-of-type(3){width: 20%;letter-spacing:2px;text-align: center;background: #f2f4f9;}
.information_bottom_bttom>table th{padding-left: 20px;}

.information_two{width: 500px;position: absolute;right: 50px;bottom: 70px;height: 60px;line-height: 60px;border-radius: 30px;background: linear-gradient(to right, #687694 , #313f61);opacity: 0.96;display: flex;justify-content: center;align-items: center;}
.information_two>span{color: white;font-size: 18px;padding-left: 15px;}
</style>
<style lang='less'>
.information_two{
    .el-slider__runway{background: linear-gradient(to right, #677593 , #9ba4b4);}
    .el-slider__marks-text{margin-top: 0;color: white;line-height: 45px;}
}

</style>
