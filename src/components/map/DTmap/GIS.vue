<template>
    <div class="GIS">
        <div class="project_top_left">
            <el-select v-model="value" size="small" @change="projectChange" placeholder="请选择" id="borderRadiu40">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.projectName"
                :value="item.id">
                </el-option>
            </el-select>
            <p>
                <span>欢迎您!</span>
                <span>{{username}}</span>
                <span>
                    <img :src=serverurl+icon alt="">
                </span>
                <span>{{versionNumber}}</span>
            </p>
        </div>
        <div class="statistical">
            <div class="statistical_top">
                <template v-if="EquipmentType=='1'">
                    <img src="../../../assets/img/staticdeng.png" alt="">
                    单灯设备状态
                </template>
                <template v-if="EquipmentType=='2'">
                    <img src="../../../assets/img/staticping.png" alt="">
                    显示屏设备状态
                </template>
                <template v-if="EquipmentType=='3'">
                    <img src="../../../assets/img/statictou.png" alt="">
                    摄像头设备状态
                </template>
            </div>
            <hr>
            <div class="statistical_equipment">
                <span @click="Statistics(1)" :class="EquipmentType=='1' ? 'statistical_equipment_background':''">单灯</span>
                <span @click="Statistics(2)" :class="EquipmentType=='2' ? 'statistical_equipment_background':''">显示屏</span>
                <span @click="Statistics(3)" :class="EquipmentType=='3' ? 'statistical_equipment_background':''">摄像头</span>
            </div>
            <div class="statistical_bottom">
                 <div>
                    <div>
                        <img src="../../../assets/img/fault.png" alt="">
                        <span>故障</span>
                        <span style="color:#fe3819;font-size: 14px;"><i>{{statisticalData.alarmCount}}</i></span>
                        <img src="../../../assets/img/Unknown.png" alt="" style="margin-left:30px;">
                        <span>未知</span>
                        <span style="color:#fe9b08;font-size: 14px;"><i>{{statisticalData.otherCount}}</i></span>
                    </div>
                    <div style="padding-top: 10px;">
                        <img src="../../../assets/img/online.png" alt="">
                        <span>在线</span>
                        <span style="color:#00e6ac;font-size: 14px;"><i>{{statisticalData.onlineCount}}</i></span>
                        <img src="../../../assets/img/offline.png" alt="" style="margin-left:30px;">
                        <span>离线</span>
                        <span style="color:#90a9bb;font-size: 14px;"><i>{{statisticalData.offlineCount}}</i></span>
                    </div>
                 </div>
                 <div id="Equipment_echarts">
                     
                 </div>
            </div>
        </div>
        <!-- <div class="Pattern" id='Pattern'>
            <el-radio-group v-model="radio1">
                <el-radio-button label="1">地图模式</el-radio-button>
                <el-radio-button label="2">统计模式</el-radio-button>
                <el-radio-button label="3">操作模式</el-radio-button>
            </el-radio-group>
        </div> -->
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
                        <td>序&nbsp;列&nbsp;号:</td>
                        <td>{{informationData.serialNumber}}</td>
                    </tr>
                    <tr>
                        <td>设备数量:</td>
                        <td>{{informationData.deviceCount}}</td>
                    </tr>
                    <tr>
                        <td>类&emsp;&emsp;型</td>
                        <td>
                            <template v-if="informationData.poleType=='1'">智慧灯杆</template>
                            <template v-else>普通灯杆</template>
                        </td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{{informationData.createTime}}</td>
                    </tr>   
                </table>
                <div style="text-align: right;">
                    <el-button @click="mapdetails" type="primary" size="mini">查看详情</el-button>
                </div>
            </div>
        </div>
        <div class="allmap" v-if="locationType=='1'">
            <div id="allmap_map"></div>
        </div>
        <div class="lampData" v-if="lampData_type">
            <div class="lampData_top">
                <span>灯杆</span>
                <span @click="lampData_type=false">X</span>
            </div>
            <div class="lampData_bottom">
                <el-table
                    :data="lampData"
                    border
                    style="width: 100%"
                    highlight-current-row
                    @selection-change="radioChange">
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    label="序列号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="类型"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.poleType=='1'">智慧灯杆</span>
                            <span v-else>普通灯杆</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:center;">
                    <el-pagination
                    @current-change="pageIndexChange"
                    :current-page="pageIndex"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
                <div style="text-align:right;">
                    <el-button @click="submitLamp" type="primary" size="small">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GIS',
    data () {
        return {
            serverurl:localStorage.serverurl,
            username:sessionStorage.username,
            icon:sessionStorage.icon,
            versionNumber:localStorage.versionNumber,
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
            information_type:false,
            informationData:{},
            EquipmentType:'1',
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
            RightClickCoord:{},
            lampData_type:false,
            lampData:[],
            lampSite:[],
            pageIndex:1,
            total:10,
            lampId:'',
        }
    },
    mounted(){
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
                        
                        if(sessionStorage.projectId==''||sessionStorage.projectId==null||sessionStorage.projectId==undefined){
                            that.value = that.options[0].id
                            that.locationType = that.options[0].locationType
                            var name = that.options[0].area.mergerName
                            var area = name.split(',')
                            that.timeData.City = area[2]
                        }else{
                            that.value = Number(sessionStorage.projectId)
                            for(var i=0;i<that.options.length;i++){
                                if(that.options[i].id==sessionStorage.projectId){
                                    var name = that.options[i].area.mergerName
                                    var area = name.split(',')
                                    that.timeData.City = area[2]
                                    that.locationType = that.options[i].locationType
                                }
                            }
                        }
                        that.weatherRequest()
                        that.Statistics('1')
                        // setTimeout(() => {
                            that.ready()
                        // }, 100);
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //项目切换change
        projectChange(id){
            var that = this
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
            this.Statistics('1')
            that.ready()
        },
        //获取项目下的统计数据
        Statistics(val){
            var that = this;
            that.EquipmentType = val
            var url = ''
            if(val=='1'){url='/v1/solin/lighting/map/lamp/count'}
            if(val=='2'){url='/v1/solin/screen/map/count'}
            if(val=='3'){url='/v1/solin/camera/map/status'}
            $.ajax({
                type:"get",
                url:that.serverurl+url,
                dataType:"json",
                async: false,
                data:{projectIds:that.value},
                success:function(data){
                    if(data.errorCode=='0'){
                        if(val=='3'){
                            data.result.alarmCount = 0
                            data.result.otherCount = 0
                        }
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
                        radius: ['70%', '85%'],
                        hoverOffset:3,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter:function (argument) {
                                    var html;
                                    html= num;
                                    return html;
                                },
                                textStyle:{
                                    fontSize: 24,
                                    color:'#333333',
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
            // var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
            // httpRequest.open('GET', 'https://wthrcdn.etouch.cn/weather_mini?city='+that.timeData.City, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
            // httpRequest.send();//第三步：发送请求  将请求参数写在URL中
            // httpRequest.onreadystatechange = function () {
            //     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            //         var json = httpRequest.responseText;//获取到json字符串，还需解析
            //         var data = JSON.parse(json).data;
            //         that.timeData.temperature = data.wendu
            //         that.timeData.type = data.forecast[0].type
            //         that.timeData.fengxiang = data.forecast[0].fengxiang
            //         if(that.timeData.type.indexOf('雨')!=-1){
            //             that.timeData.type2='1'
            //         }else if(that.timeData.type.indexOf('雪')!=-1){
            //             that.timeData.type2='2'
            //         }else if(that.timeData.type.indexOf('云')!=-1||that.timeData.type.indexOf('晴')!=-1){
            //             that.timeData.type2='3'
            //         }else{
            //             that.timeData.type2='3'
            //         }
            //     }
            // };
        },
        //请求没有坐标的灯杆列表
        LampPole(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:10,
                    coordType:'2',
                    projectIds:that.value
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.lampData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        pageIndexChange(val){this.pageIndex = val;this.LampPole();},
        radioChange(val){this.lampSite = val;},
        //添加灯杆坐标
        submitLamp(){
            var that = this;
            if(that.lampSite.length>=2||that.lampSite.length==0){
                that.$message({
                    message: '请选择灯杆进行添加!',
                    type: 'error'
                });
                return;
            }
            var coord = [that.RightClickCoord.lng,that.RightClickCoord.lat];
            var data = {
                poleList:[
                    {
                        coord:coord.join(','),
                        id:that.lampSite[0].id,
                    }
                ]
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole/location',
                data:JSON.stringify(data),
                contentType:'application/json;charset=UTF-8',
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '添加坐标成功!',
                            type: 'success'
                        });
                        that.ready();
                        that.lampData_type = false;
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击查看详情
        mapdetails(){
            this.$router.push({'path':'/GISdetails',query:{id:this.informationData.id}})
        },
        //初始化 百度地图/平面图
        ready(){
            var that = this;
            var data = {
                page:1,
                size:500,
                coordType:'1',
                projectIds:that.value
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole',
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
                            if(data.result.list.length==0){
                                setTimeout(() => {
                                    var map = new BMap.Map("allmap_map",{enableMapClick:false});    // 创建Map实例
                                    map.centerAndZoom(that.timeData.City, 15); 
                                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                                },100)
                                return;
                            }
                            // 百度地图API功能
                            var map = new BMap.Map("allmap_map",{enableMapClick:false,minZoom:5,maxZoom:19});    // 创建Map实例
                            var coord = ''
                            coord = data.result.list[0].coord
                            coord = coord.split(',')
                            map.centerAndZoom(new BMap.Point(coord[0],coord[1]), 16);  // 初始化地图,设置中心点坐标和地图级别
                            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                            // //添加灯杆坐标 
                            var online = new BMap.Icon(that.imgserverurl+"image/img/online.png", new BMap.Size(45,60));
                            var offline = new BMap.Icon(that.imgserverurl+"image/img/offline.png", new BMap.Size(45,60));
                            var Unknown = new BMap.Icon(that.imgserverurl+"image/img/Unknown.png", new BMap.Size(45,60));
                            var abnormal = new BMap.Icon(that.imgserverurl+"image/img/abnormal.png", new BMap.Size(45,60));
                            var markers = []
                            for(var i=0;i<data.result.list.length;i++){
                                var coord = data.result.list[i].coord
                                var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                if(data.result.list[i].poleStatus=='3'){
                                    var marker = new BMap.Marker(point,{icon:Unknown});
                                }else if(data.result.list[i].poleStatus=='0'){
                                    var marker = new BMap.Marker(point,{icon:offline});
                                }else if(data.result.list[i].poleStatus=='2'){
                                    var marker = new BMap.Marker(point,{icon:abnormal});
                                }else{
                                    var marker = new BMap.Marker(point,{icon:online});
                                }
                                marker.id=data.result.list[i].id
                                marker.type=that.value1

                                var markerMenu=new BMap.ContextMenu();
                                markerMenu.addItem(new BMap.MenuItem('删除',function(){
                                    that.$confirm('确认删除灯杆坐标?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        var data = {
                                            poleList:[
                                                {
                                                    coord:'',
                                                    id:that.lampId,
                                                }
                                            ]
                                        }
                                        $.ajax({
                                            type:'post',
                                            async:true,
                                            dataType:'json',
                                            url:that.serverurl+'/v1/solin/lighting/pole/location',
                                            contentType:'application/json;charset=UTF-8',
                                            data:JSON.stringify(data),
                                            success:function(data){
                                                if(data.errorCode=='0'){
                                                    that.$message({
                                                        message: '删除成功!',
                                                        type: 'success'
                                                    });
                                                    that.ready();
                                                }else{
                                                    that.errorCode(data)
                                                }
                                            }
                                        })
                                    }).catch(() => {
                                        that.$message({
                                            type: 'info',
                                            message: '已取消删除'
                                        });          
                                    });
                                    
                                }));
                                marker.addContextMenu(markerMenu);
                                marker.addEventListener('rightclick',function(e){
                                        that.lampId = e.target.id
                                })
                                markers.push(marker)
                                // map.addOverlay(marker);
                            }
                            var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
                            // //鼠标左键请求灯杆基本信息
                            map.addEventListener("click", function (e) {
                                if(e.overlay){
                                    for(var i=0;i<that.readyData.length;i++){
                                        if(e.overlay.id==that.readyData[i].id){
                                            that.informationData = that.readyData[i]
                                        }
                                    }
                                    that.information_type = true
                                }else{
                                    that.information_type = false
                                }
                            });
                            var menu = new BMap.ContextMenu();
                            var txtMenuItem = [
                                {
                                    text:'添加灯杆坐标',
                                    callback:function(e){
                                        that.RightClickCoord = e;
                                        that.LampPole();
                                        that.lampData_type = true;
                                        that.lampSite = null
                                    }
                                },
                            ];
                            for(var i=0; i < txtMenuItem.length; i++){
                                menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
                            }
                            map.addContextMenu(menu);                         
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
        this.imgserverurl = url[0]+'//'+url[2]+'/solin/'
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
.GIS{width: 100%;height: 100%;position: relative;}
.statistical{width: 350px;height: 190px;border-radius: 10px;box-shadow: -0.5px 2px 10px 1px #d9dbdd;position: absolute;top: 75px;left: 10px;padding: 0 15px 0 15px;z-index: 2;background: white;}
.statistical_top{height: 40px;display: flex;align-items: center;font-size: 15px;color: #333333;}
.statistical_top>img{padding-right: 15px;width: 40px;}
.statistical_equipment{width: 100%;padding: 15px 0;}
.statistical_equipment>span{font-size:12px;background: #d6dae0;padding: 5px 10px;border-radius: 3px;margin-left: 10px;cursor: pointer;color: #333333;}
.statistical_equipment_background{background: #0097ff !important;color: white !important;}
.statistical_bottom{width: 100%;display: flex;}
.statistical_bottom>div:nth-of-type(1){padding-top: 15px;margin-left: 15px;}
#Equipment_echarts{width: 120px;position: absolute;right: 5px;bottom: 15px;height: 100px;}
.statistical_bottom>div>div{display: flex;align-items: center;}
.statistical_bottom>div>div>span{padding-left: 5px;font-size: 14px;color: #333333;}
.statistical_bottom img{width: 12px;}
.Pattern{position: absolute;top: 50px;right: 50px;z-index: 2;}
/* .weather{position: absolute;top:135px;right:50px;width: 355px;height: 193px;border-radius: 27px;box-shadow: 2px 2px 8px 1px #303e60;color: white;z-index: 2;}
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

.information{width: 256px;height: 300px;border-radius:5px;position: absolute;top:300px;left:105px;z-index: 2;box-shadow: 3px 3px 5px #999;}
.information_top{width: 100%;height: 45px;line-height: 45px;background:white;color: #333333;font-size: 16px;padding-left: 15px;border-bottom: 1px solid #ebeff5;;border-top-left-radius: 5px;border-top-right-radius: 5px;}
.information_top>span:nth-of-type(2),.lampData_top>span:nth-of-type(2){position: absolute;right: 10px;cursor: pointer;}
.information_bottom{padding:10px;position: absolute;top: 45px;bottom: 0;background: white;width: 100%;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;}
.information_bottom_table{font-size: 12px;table-layout:fixed;}
.information_bottom_table>tr{width: 235px;height: 35px;line-height: 35px;border: 1px solid #ebeff5;}
.information_bottom_table>tr>td:nth-of-type(1){width: 94px;background: #f3f4f9;text-align: center;}
.information_bottom_table>tr>td:nth-of-type(2){width:141px;text-align: left;padding-left: 5px;
word-break:keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-moz-text-overflow: ellipsis;}

.allmap{width: 100%;height: 100%;}
.allmap>div{width: 100%;height: 100%;}
.lampData{position: absolute;right: 0;bottom:40px;;width: 520px;padding: 0 15px 25px 15px;border-radius: 5px;z-index: 2;background: #727c92;opacity: .9;}
.lampData_top{width: 100%;height: 45px;line-height: 45px;font-size: 22px;padding-left: 15px;color: white;}
.lampData_bottom{width: 100%;background: white;border-radius: 5px;padding: 8px;}
</style>

<style lang='less'>
.BMap_contextMenu{
    background: #727c92 !important;
    opacity: .9;
    border-radius: 5px !important;
    padding: 8px 15px !important;
    border:none !important;
    text-align: center;
    div{
        color:white !important;
        // span{color:red !important;}
    }
}
</style>
