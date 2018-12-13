<template>
    <!-- 地图主页 -->
    <div class="mapHomgPage">
        <div class="allmap">
            <div id="allmap"></div>
        </div>
        <div class="plane">
            <div @mouseup="uplift" @mousedown='mousedown' class="plane_div" id="plane_div" style="position:absolute;">
                <img :src=planUrl alt="" class="plane_div_bgimg">
                <template v-if="value1=='0'">
                    <template v-for="item in data">
                        <img v-if="item.x!=''&&item.y!=''&&item.lampStatus=='2'" :src='imgserverurl+"image/img/rod3.png"' class="plane_div_icon" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" >
                        <img v-else-if="item.x!=''&&item.y!=''&&item.lampOnlie=='1'" :src='imgserverurl+"image/img/rod1.png"' class="plane_div_icon" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" >
                        <img v-else-if="item.x!=''&&item.y!=''" :src='imgserverurl+"image/img/rod2.png"' class="plane_div_icon" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" >
                    </template>
                </template>
                <template v-if="value1=='1'">
                    <template v-for="item in data">
                        <img v-if="item.x!=''&&item.y!=''&&item.lampStatus=='2'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src='imgserverurl+"image/img/lamp_3.png"'>
                        <img v-else-if="item.x!=''&&item.y!=''&&item.online=='1'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src='imgserverurl+"image/img/lamp_1.png"'>
                        <img v-else-if="item.x!=''&&item.y!=''" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src='imgserverurl+"image/img/lamp_2.png"'>
                    </template>
                </template>
                <template v-if="value1=='2'">
                    <template v-for="item in data">
                        <img v-if="item.x!=''&&item.y!=''&&item.status=='1'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src='imgserverurl+"image/img/screen_1.png"'>
                        <img v-else-if="item.x!=''&&item.y!=''&&item.status=='0'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src='imgserverurl+"image/img/screen_2.png"'>
                    </template>
                </template>
                <template v-if="value1=='3'">
                    <template v-for="item in data">
                        <img v-if="item.x!=''&&item.y!=''&&item.online=='0'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src="imgserverurl+'image/img/sensor_2.png'">
                        <img v-else-if="item.x!=''&&item.y!=''&&item.online=='1'" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup.stop="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" :src="imgserverurl+'image/img/sensor_1.png'">
                    </template>
                </template>
                <div id="menu3" style="z-index:2;background-color:#969696">
                    <ul v-if="value1=='0'">
                        <li><el-button type="primary" size='small' @click="addLampPole">添加灯杆坐标</el-button></li>
                    </ul>
                </div>
                <div id="menu4" style="z-index:2;background-color:#969696">
                    <ul>
                        <li><el-button type="primary" size='small' @click="remove" v-if="value1=='0'">删除灯杆</el-button></li>
                        <li><el-button type="primary" size='small' @click="LampPole">查看详情</el-button></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 厂区图放大缩小 -->
        <div class="shrink" v-if='locationType=="0"'>
            <el-button @click="narrow" class="narrow" :disabled=narrowdisabled type="success" size='mini' icon="el-icon-minus" circle></el-button>
            <el-button @click="enlarge" class="enlarge" :disabled=enlargedisabled type="success" size='mini' icon="el-icon-plus" circle></el-button>
        </div>
        <div class="map_left">
            <div class="map_left_left">
                <el-select v-model="value" @change="projectChange" size='small' style="width:280px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="value1" size='small' @change='optionChange' placeholder="请选择">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value2" size='small' placeholder="请选择">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div class="map_left_right" @click="search">
                <i class="el-icon-search"></i>
            </div>
            <div class="map_left_right" style='left: 460px;' @click="backtrack">
                <i class="el-icon-back"></i>
            </div>
        </div>
        <div class="map_right">
            <p class="map_right_left" style="font-size:19px;">{{FullYear}}/{{Month}}/{{Dates}} 星期{{getDay}}</p>
            <p class="map_right_left" style="font-size:46px;">{{Hours}}:{{Minutes}}:{{Seconds}}</p>
        </div>
        <div id="menu" style="z-index:2;background-color:#969696">
			<ul v-if="value1=='0'">
				<li><el-button type="primary" size='small' @click="addLampPole">添加灯杆坐标</el-button></li>
			</ul>
		</div>
        <div id="menu2" style="z-index:2;background-color:#969696">
			<ul>
                <li><el-button type="primary" size='small' @click="remove" v-if="value1=='0'">删除灯杆</el-button></li>
				<li><el-button type="primary" size='small' @click="LampPole">查看详情</el-button></li>
			</ul>
		</div>
        <!--灯杆列表 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">灯杆</h4>
                    </div>
                    <div class="modal-body">
                        <div class="LampPole">
                            <el-table
                                :data="tableData"
                                @row-click="clickRow" 
                                ref="moviesTable"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                show-overflow-tooltip=true
                                @selection-change="SelectionChange"
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                <el-table-column
                                type="selection"
                                align='center'
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="昵称"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="serialNumber"
                                align='center'
                                label="编号"
                                min-width="60">
                                </el-table-column>
                                <el-table-column
                                prop="coord"
                                align='center'
                                label="坐标"
                                min-width="100">
                                </el-table-column>
                                <el-table-column
                                prop="remark"
                                label="备注"
                                align='center'
                                :formatter="formatRole"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                background
                                @size-change="sizechange"
                                @current-change="currentchange"
                                :current-page="pageIndex"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="submitLampPole" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 左侧设备基本信息 -->
        <div class="homepage_center">
            <div class="homepage_indent">
                <i class="el-icon-d-arrow-left" @click="homepageIndent"></i>
            </div>
            <div class="homepage_top">
                <span>设备</span>
                <span>数量</span>
                <span>警报</span>
            </div>
            <div class="homepage_bottom">
                <div>
                    <span>灯杆</span>
                    <span>{{data2.poleCount}}</span>
                    <span>{{data2.poleAlarmCount}}</span>
                </div>
                <div>
                    <span>灯具</span>
                    <span>{{data2.lampCount}}</span>
                    <span>{{data2.lampAlarmCount}}</span>
                </div>
                <div>
                    <span>广告屏</span>
                    <span>{{data2.screenCount}}</span>
                    <span>{{data2.screenAlarmCount}}</span>
                </div>
                <div>
                    <span>传感设备</span>
                    <span>{{data2.sensorsCount}}</span>
                    <span>{{data2.sensorsAlarmCount}}</span>
                </div>
            </div>
        </div>
        <!-- 右侧灯杆基本信息 -->
        <div class="rightfloat">
            <div class="concentright_top">
                <p v-if="value1=='0'">灯杆基本信息</p>
                <p v-if="value1=='1'">灯具基本信息</p>
                <p v-if="value1=='2'">广告屏基本信息</p>
                <p v-if="value1=='3'">气象站基本信息</p>
                <i @click="Closeconcent" class="backtrack iconfont icon-guanbi"></i>
            </div>
            <div class="concentright_bottom">
                <!-- 灯杆基本信息 -->
                <div v-if="value1=='0'&&contentTabledata!=''" class="concentlampPole">
                    <p>灯杆名称:{{contentTabledata.poleDto.nickName}}</p>
                    <template v-if="contentTabledata.poleDto.poleType=='0'">
                        <p>灯杆类型:普通灯杆</p>
                    </template>
                    <template v-if="contentTabledata.poleDto.poleType=='1'">
                        <p>灯杆类型:智慧灯杆</p>
                    </template>
                    <p>灯杆位置:{{contentTabledata.poleDto.location}}</p>
                    <p style="font-weight: 600;">已关联灯具:</p>
                    <p v-for="(item,key) in contentTabledata.lampDtoList">
                        <span>名称:{{item.nickName}}</span>
                        <span>型号:{{item.serialNumber}}</span>
                    </p>
                    <p style="font-weight: 600;">已关联屏幕:</p>
                    <p v-for="(item,key) in contentTabledata.screenDtoList">
                        <span>名称:{{item.nickName}}</span>
                        <span>型号:{{item.serialNumber}}</span>
                    </p>
                    <p style="font-weight: 600;">已关联气象站:</p>
                    <p v-for="(item,key) in contentTabledata.EnvSensorDtoList">
                        <span>名称:{{item.nickName}}</span>
                        <span>型号:{{item.modelName}}</span>
                    </p>
                </div>
                <!-- 灯具基本信息 -->
                <div v-if="value1=='1'&&contentTabledata!=''" class="concentlampPole">
                    <p>灯具名称:{{contentTabledata.lampDto.nickName}}</p>
                    <p>灯控器标示:{{contentTabledata.lampDto.serialNumber}}</p>
                    <p>集中器标示:{{contentTabledata.lampDto.concentratorSN}}</p>
                    <p v-if="contentTabledata.lampDto.lampStatus=='0'">灯状态:关闭</p>
                    <p v-if="contentTabledata.lampDto.lampStatus=='1'">灯状态:开启</p>
                    <p v-if="contentTabledata.lampDto.lampStatus=='2'">灯状态:告警</p>
                </div>
                <!-- 广告屏基本信息 -->
                <div v-if="value1=='2'&&contentTabledata!=''" class="concentlampPole">
                    <p>屏幕名称:{{contentTabledata.screenDto.nickName}}</p>
                    <p>屏幕标识:{{contentTabledata.screenDto.serialNumber}}</p>
                    <p>屏幕型号:{{contentTabledata.screenDto.modelName}}</p>
                    <p v-if="contentTabledata.screenDto.status=='1'">屏幕状态:开启</p>
                    <p v-else>屏幕状态:关闭</p>
                </div>
                <!-- 气象站基本信息 -->
                <div v-if="value1=='3'&&contentTabledata!=''" class="concentlampPole">
                    <p>气象站名称:{{contentTabledata.nickName}}</p>
                    <p>型号别标识:{{contentTabledata.modelName}}</p>
                    <p>集中器标识:{{contentTabledata.concentratorSN}}</p>
                    <p v-if="contentTabledata.online=='1'">状态:在线</p>
                    <p v-else>状态:离线</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            time:null,
            serverurl:localStorage.serverurl,
            imgserverurl:'',
            addPoleIcon:false,
            deletePoleIcon:false,
            options:[],//项目
            value:'',
            locationType:'',//地图类型
            data:[],
            planUrl:'',//平面图URL
            level:1,//平面图放大缩小级别
            narrowdisabled:false,
            enlargedisabled:false,
            options1:[
                {
                    value: '0',
                    label: '灯杆'
                }, 
                {
                    value: '1',
                    label: '灯具'
                },
                {
                    value: '2',
                    label: '广告屏'
                },
                {
                    value: '3',
                    label: '气象站'
                }
            ],
            value1:'0',
            options2:[
                {
                    value: '0',
                    label: '全部'
                }, 
                {
                    value: '1',
                    label: '告警',
                    disabled:true
                }
            ],
            value2:'0',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            getZoom:12,
            getcoord:[],
            activeName:'1',
            tableDataType:'',
            
            click:{
                id:'',
                type:'',
                mapcood:[]
            },

            x:0,
            y:0,
            l:0,
            t:0,
            isDown:false,

            contentTabledata:'',//右侧设备基本信息

            FullYear:'',
            Month:'',
            Dates:'',
            Hours:'',
            Minutes:'',
            Seconds:'',
            getDay:'',
            data2:'',
            homepageType:true,
        }
    },
    mounted(){
        var that = this;
        // setTimeout(function(){
            
        // },1000)
        //鼠标移动
        window.onmousemove = function(e) {
            var dv = document.getElementById('plane_div');
            if (that.isDown == false) {
                return;
            }
            //获取x和y
            var nx = e.clientX;
            var ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            var nl = nx - (that.x - that.l);
            var nt = ny - (that.y - that.t);

            dv.style.left = nl + 'px';
            dv.style.top = nt + 'px';
        }
        //滚轮缩放
        $('#plane_div').mousewheel(function(event) {
            if(event.deltaY<0){
                that.enlarge()
            }
            if(event.deltaY>0){
                that.narrow()
            }
        });
        this.time=setInterval(function(){
            
            var myDate = new Date();//获取系统当前时间
            that.FullYear = myDate.getFullYear(); //获取完整的年份
            that.Month = myDate.getMonth()+1; //获取当前月份
            that.Dates = myDate.getDate(); //获取当前日
            var d = myDate.getHours(); //获取当前小时数
            var e = myDate.getMinutes(); //获取当前分钟数
            var f = myDate.getSeconds(); //获取当前秒数
            var g = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            if(d<10){
                that.Hours = '0'+d
            }else{
                that.Hours = d
            }
            if(e<10){
                that.Minutes = '0'+e
            }else{
                that.Minutes = e
            }
            if(f<10){
                that.Seconds = '0'+f
            }else{
                that.Seconds = f
            }
            if(g==0){that.getDay='日'}
            if(g==1){that.getDay='一'}
            if(g==2){that.getDay='二'}
            if(g==3){that.getDay='三'}
            if(g==4){that.getDay='四'}
            if(g==5){that.getDay='五'}
            if(g==6){that.getDay='六'}
        },1000)
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        //左侧设备基本信息缩进
        homepageIndent(){
            if(this.homepageType==true){
                this.homepageType=false
                $('.homepage_center').animate({'left':'-285px'})
                $('.homepage_indent>i').css({
                    'transform':'rotate(180deg)',
                    '-ms-transform':'rotate(180deg)',
                    '-moz-transform':'rotate(180deg)',
                    '-webkit-transform':'rotate(180deg)',
                    '-o-transform':'rotate(180deg)',
                })
                return;
            }
            if(this.homepageType==false){
                this.homepageType=true
                $('.homepage_center').animate({'left':'0px'})
                $('.homepage_indent>i').css({
                    'transform':'rotate(0deg)',
                    '-ms-transform':'rotate(0deg)',
                    '-moz-transform':'rotate(0deg)',
                    '-webkit-transform':'rotate(0deg)',
                    '-o-transform':'rotate(0deg)',
                })
                return;
            }
        },
        //获取统计数据
        Statistics(){
            var that = this;
            $.ajax({
                type:"GET",
                url:that.serverurl+'/statistics/getCount',
                dataType:"json",
                async: false,
                data:{projectId:that.value},
                success:function(data){
                    that.data2 = data.result
                }
            })
        },
        //获取有权限的项目
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getMyAllProject',
                contentType:'application/json;charset=UTF-8',
                data:{
                    type:'1'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.projects
                        if(sessionStorage.projectID==''||sessionStorage.projectID==undefined||sessionStorage.projectID==null){
                            that.value = that.options[0].id
                            that.locationType = data.result.projects[0].locationType
                            sessionStorage.projectID =data.result.projects[0].id
                            if(data.result.projects[0].locationType=='1'&&data.result.projects[0].area!=null){
                                that.getcoord=[data.result.projects[0].area.lng,data.result.projects[0].area.lat]
                            }else{
                                that.planUrl = that.serverurl+data.result.projects[0].planUrl
                            }
                        }else{
                            that.value = Number(sessionStorage.projectID)
                            for(var i=0;i<data.result.projects.length;i++){
                                if(data.result.projects[i].id==sessionStorage.projectID){
                                    that.locationType = data.result.projects[i].locationType
                                    if(data.result.projects[i].locationType=='1'){
                                        that.getcoord=[data.result.projects[i].area.lng,data.result.projects[i].area.lat]
                                    }else{
                                        that.planUrl = that.serverurl+data.result.projects[i].planUrl
                                    }
                                }
                            }
                        }
                        if(sessionStorage.projectID2==''||sessionStorage.projectID2==undefined||sessionStorage.projectID2==null){
                            that.value1 = '0'
                        }else{
                            that.value1 = sessionStorage.projectID2
                        }
                        that.ready()
                        that.Statistics()
                    }else{
                        that.errorCode(data.errorCode)
                    }
                },
            })
        },
        projectChange(val){
            sessionStorage.projectID = val
        },
        optionChange(val){
            sessionStorage.projectID2 = val
            if(val=='1'){
                this.options2[1].disabled = false
            }else{
                this.options2[1].disabled = true
            }
            this.value2 = '0'
            $('#menu').css('display','none')
            $('#menu2').css('display','none')
            $('#menu3').css('display','none')
            $('#menu4').css('display','none')
            this.ready()
        },
        search(){
            var that = this
            for(var i=0;i<that.options.length;i++){
                if(that.options[i].id==that.value){
                    that.locationType = that.options[i].locationType  
                    if(that.options[i].locationType=='0'){
                        that.planUrl = that.serverurl+that.options[i].planUrl
                        $('.plane').css('display','flex')
                        $('.allmap').css('display','none')
                    }else{
                        $('.plane').css('display','none')
                        $('.allmap').css('display','inline-block')
                    }
                    if(that.options[i].area==''||that.options[i].area==null||that.options[i].area==undefined){
                        
                    }else{
                        that.getcoord=[that.options[i].area.lng,that.options[i].area.lat]
                    }
                }
            }
            console.log(that.locationType)
            that.ready()
            that.Statistics()
            that.websokwt()
        },
        //平面图拖拽
        mousedown(e){
            e.preventDefault();
            var dv = document.getElementById("plane_div");
            //获取x坐标和y坐标
            this.x = e.clientX;
            this.y = e.clientY;
            //获取左部和顶部的偏移量
            this.l = dv.offsetLeft;
            this.t = dv.offsetTop;
            //开关打开
            this.isDown = true;
            //设置样式  
            // dv.style.cursor = 'move';
        },
        //平面图滚轮缩放
        mousewheel(e){
            console.log(e)
        },
        //平面图右键添加设备
        uplift(ev){
            $('#menu4').css('display','none')
            var that = this
            ev = ev || window.event;
            var btn = ev.button;
            this.isDown = false;
            if( btn == 2){
                var mymenu = document.getElementById("menu3");
                mymenu.style.display = "inline-block";
                var x = ev.offsetX 
                var y = ev.offsetY
                mymenu.style.left = x+"px";
                mymenu.style.top = y+"px";
                sessionStorage.clientX = x-24
                sessionStorage.clientY = y-48
            } 
        },
        //平面图设备右键事件
        uplifttwo(ev){
            var that = this
            // window.event.cancelBubble = true
            $('#menu3').css('display','none')
            ev = ev || window.event;
            var btn = ev.button;
            this.isDown = false;
            if(btn==0){
                $('.rightfloat').css({
                    "display":"inline-block",
                    "right":"0",
                })
                console.log(ev.target.id)
                var url = ''
                var data = {}
                if(that.value1=='0'){url='/pole/getBindDeviceListByPoleId';data.poleId = ev.target.id;}
                if(that.value1=='1'){url='/lamp/getLampDetailsById';data.lampId = ev.target.id;}
                if(that.value1=='2'){url='/screen/getScreenDetailsById';data.screenId = ev.target.id;}
                if(that.value1=='3'){url='/envSensors/getEnvSensorsInformation';data.id = ev.target.id;}
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+url,
                    contentType:'application/json;charset=UTF-8',
                    data:data,
                    success:function(data){
                        that.contentTabledata = data.result
                    }
                })
            }   
            if( btn == 2){
                var left = ev.target.style.left.split('px')
                var top = ev.target.style.top.split('px')
                $('#menu4').css({
                    "display":"inline-block",
                    "left":Number(left[0])+24+"px",
                    "top":Number(top[0])+48+"px"
                })
                that.click.id = ev.target.id
                that.click.type = that.value1
            } 
        },
        Closeconcent(){
            $('.rightfloat').css({
                "display":"none",
                "right":"-250px",
            })
        },
        //厂区图缩小
        narrow(){
            this.enlargedisabled = false
            if(this.level=='1'){
                this.narrowdisabled = true
                return;
            }
            this.level = this.level-1
            this.ready()
        },
        //厂区图放大
        enlarge(){
            this.narrowdisabled = false
            if(this.level=='6'){
                this.enlargedisabled = true
                return;
            }
            this.level = this.level + 1
            this.ready()
        },
        //初始化百度地图/平面图
        ready(){
            var that = this;
            var url = ''
            var data = {}
            data.projectId = that.value 
            if(that.value1=='0'){url='/pole/getPoleListByProjectId';}//灯杆
            if(that.value1=='1'){
                url='/lamp/getLampListByProjectId';
                // if(that.value2=='1'){
                    data.lampStatus = that.value2
                // }else{
                //     data.lampStatus = ''
                // }
            }//灯具
            if(that.value1=='2'){url='/screen/getScreenListByProjectId';}//广告屏
            if(that.value1=='3'){url='/envSensors/getSensorsByProjectId';}//气象站
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        if(that.locationType=='1'){
                            $('.plane').css('display','none')
                            $('.allmap').css('display','inline-block')
                            // 百度地图API功能
                            var map = new BMap.Map("allmap");
                            map.centerAndZoom(new BMap.Point(that.getcoord[0],that.getcoord[1]),that.getZoom);// 初始化地图,设置中心点坐标和地图级别
                            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                            //添加鼠标右键事件
                            var rod1 = new BMap.Icon(that.imgserverurl+"image/img/rod1.png", new BMap.Size(40,48));
                            var rod2 = new BMap.Icon(that.imgserverurl+"image/img/rod2.png", new BMap.Size(40,48));
                            var rod3 = new BMap.Icon(that.imgserverurl+"image/img/rod3.png", new BMap.Size(40,48));
                            var lamp_1 = new BMap.Icon(that.imgserverurl+"image/img/lamp_1.png", new BMap.Size(48,80));
                            var lamp_2 = new BMap.Icon(that.imgserverurl+"image/img/lamp_2.png", new BMap.Size(48,80));
                            var lamp_3 = new BMap.Icon(that.imgserverurl+"image/img/lamp_3.png", new BMap.Size(48,80));
                            var screen_1 = new BMap.Icon(that.imgserverurl+"image/img/screen_1.png", new BMap.Size(48,80));
                            var screen_2 = new BMap.Icon(that.imgserverurl+"image/img/screen_2.png", new BMap.Size(48,80));
                            var sensor_1 = new BMap.Icon(that.imgserverurl+"image/img/sensor_1.png", new BMap.Size(48,80));
                            var sensor_2 = new BMap.Icon(that.imgserverurl+"image/img/sensor_2.png", new BMap.Size(48,80));
                            for(var i=0;i<data.result.list.length;i++){
                                if(data.result.list[i].coord==''||data.result.list[i].coord==undefined||data.result.list[i].coord==null){
                                    
                                }else{
                                    var coord = data.result.list[i].coord
                                    var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                    if(that.value1=='0'){
                                        if(data.result.list[i].lampStatus=='2'){
                                            var marker = new BMap.Marker(point,{icon:rod3});
                                        }else if(data.result.list[i].lampOnlie=='1'){
                                            var marker = new BMap.Marker(point,{icon:rod1});
                                        }else{
                                            var marker = new BMap.Marker(point,{icon:rod2});
                                        }
                                    }
                                    if(that.value1=='1'){
                                        if(data.result.list[i].lampStatus=='2'){
                                            var marker = new BMap.Marker(point,{icon:lamp_3});
                                        }else if(data.result.list[i].online=='1'){
                                            var marker = new BMap.Marker(point,{icon:lamp_1});
                                        }else{
                                            var marker = new BMap.Marker(point,{icon:lamp_2});
                                        }
                                    }
                                    if(that.value1=='2'){
                                        if(data.result.list[i].status=='0'){
                                            var marker = new BMap.Marker(point,{icon:screen_2});
                                        }
                                        if(data.result.list[i].status=='1'){
                                            var marker = new BMap.Marker(point,{icon:screen_1});
                                        }
                                    }
                                    if(that.value1=='3'){
                                        if(data.result.list[i].online=='0'){
                                            var marker = new BMap.Marker(point,{icon:sensor_2});
                                        }
                                        if(data.result.list[i].online=='1'){
                                            var marker = new BMap.Marker(point,{icon:sensor_1});
                                        }
                                    }
                                    marker.setTitle(data.result.list[i].nickName); //这里设置maker的title 
                                    marker.id=data.result.list[i].id
                                    marker.type=that.value1
                                    marker.addEventListener('click',function(e){
                                        console.log(e.target.id)
                                        $('.rightfloat').css({
                                            "display":"inline-block",
                                            "right":"0",
                                        })
                                        var url = ''
                                        var data = {}
                                        if(that.value1=='0'){url='/pole/getBindDeviceListByPoleId';data.poleId = e.target.id;}
                                        if(that.value1=='1'){url='/lamp/getLampDetailsById';data.lampId = e.target.id;}
                                        if(that.value1=='2'){url='/screen/getScreenDetailsById';data.screenId = e.target.id;}
                                        if(that.value1=='3'){url='/envSensors/getEnvSensorsInformation';data.id = e.target.id;}
                                        $.ajax({
                                            type:'get',
                                            async:true,
                                            dataType:'json',
                                            url:that.serverurl+url,
                                            contentType:'application/json;charset=UTF-8',
                                            data:data,
                                            success:function(data){
                                                that.contentTabledata = data.result
                                            }
                                        })
                                    })
                                    map.addOverlay(marker);
                                }
                            }
                            var myStyleJson=[
                                {
                                    "featureType": "land",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#212121"
                                    }
                                },
                                {
                                    "featureType": "building",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#2b2b2b"
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#f80202ff",
                                        "lightness": -42,
                                        "saturation": -91
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -77,
                                        "saturation": -94
                                    }
                                },
                                {
                                    "featureType": "green",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#1b1b1b"
                                    }
                                },
                                {
                                    "featureType": "subway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#181818"
                                    }
                                },
                                {
                                    "featureType": "railway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "lightness": -52
                                    }
                                },
                                {
                                    "featureType": "all",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#313131"
                                    }
                                },
                                {
                                    "featureType": "background",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#0c1081ff",
                                        "lightness": -65
                                    }
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#c8fbfbff",
                                        "lightness": -61,
                                        "saturation": 84
                                    }
                                },
                                {
                                    "featureType": "poilabel",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#b8b800ff"
                                    }
                                },
                                {
                                    "featureType": "administrative",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#daf9d8ff"
                                    }
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#a5f6a5ff"
                                    }
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#27576fff"
                                    }
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#64f663ff"
                                    }
                                }
                            ];
                            map.setMapStyle({styleJson: myStyleJson }); 
                            map.addEventListener("rightclick", function (e) { 
                                if(e.overlay){
                                    that.click.id = e.overlay.id
                                    that.click.type = e.overlay.type
                                    if(window.event) e = window.event;
                                    var mymenu = document.getElementById("menu2");
                                    mymenu.style.display = "inline-block";
                                    mymenu.style.left = e.clientX + 2 +"px";
                                    mymenu.style.top = e.clientY + 2 + "px";
                                           
                                    var mymenu = document.getElementById("menu");
                                    mymenu.style.display = "none";
                                    return false;
                                }else{
                                    if(that.value1=='0'){
                                        that.click.mapcood = []
                                        that.click.mapcood.push(e.point.lng)
                                        that.click.mapcood.push(e.point.lat)
                                        if(window.event) e = window.event;
                                        var mymenu = document.getElementById("menu");
                                        mymenu.style.display = "inline-block";
                                        mymenu.style.left = e.clientX + 2 +"px";
                                        mymenu.style.top = e.clientY + 2 + "px";
                                        var mymenu2 = document.getElementById("menu2");
                                        mymenu2.style.display = "none";
                                        return false;
                                    }
                                }
                            })
                            map.addEventListener("click", function (e) {
                                var mymenu = document.getElementById("menu");
                                var mymenu2 = document.getElementById("menu2");
                                mymenu.style.display = "none";
                                mymenu2.style.display = "none";
                            });
                        }
                        if(that.locationType=='0'){
                            $('.plane').css('display','flex')
                            $('.allmap').css('display','none')
                            for(var i=0;i<data.result.list.length;i++){
                                var array = data.result.list[i].coord.split(",")
                                data.result.list[i].x = array[0]
                                data.result.list[i].y = array[1]
                            }
                            if(that.level=='1'){
                                $('.plane_div').css({"transform":'scale(1)'})
                            }
                            if(that.level=='2'){
                                $('.plane_div').css({"transform":'scale(1.2)'})
                            }
                            if(that.level=='3'){
                                $('.plane_div').css({"transform":'scale(1.4)'})
                            }
                            if(that.level=='4'){
                                $('.plane_div').css({"transform":'scale(1.6)'})
                            }
                            if(that.level=='5'){
                                $('.plane_div').css({"transform":'scale(1.8)'})
                            }
                            if(that.level=='6'){
                                $('.plane_div').css({"transform":'scale(2)'})
                            }
                            that.data = data.result.list
                            console.log(that.data)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //删除灯杆坐标
        remove(){
            var that = this;
            $('#menu2').css('display','none')
            that.$confirm('确认删除灯杆?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/pole/poleResetCoord',
                    data:{
                        poleId:that.click.id,
                        coord:''
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除灯杆成功!',
                                type: 'success'
                            });
                            that.ready();
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除'
                });  
            })
        },
        //查询灯杆,单灯,屏幕,气象站列表信息
        LampPole(){
            var that = this
            this.$router.push({path:'/mapDetails', query: {id: that.click.id,type:that.click.type}})
        },
        //点击添加灯杆坐标,请求所有灯杆信息
        addLampPole(){
            var that = this
            that.mapcoo=[]
            $('#menu').css('display','none')
            $('#menu3').css('display','none')
            $('#menu4').css('display','none')
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/getPoleList',
                contentType:'application/json;charset=UTF-8',
                data:{
                    projectId:that.value,
                    page:that.pageIndex,
                    rows:that.pageSize,
                    nickName:'',
                    poleType:'',
                    serialNumber:'',
                    areaId:'',
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
            $('#myModal').modal('show')
        },
        SelectionChange(val){this.site=val},
        sizechange(val){this.pageSize=val;this.addLampPole();},
        currentchange(val){this.pageIndex=val;this.addLampPole();},
        //保存灯杆坐标
        submitLampPole(){
            var that = this;
            if(that.site.length>=2){
                that.$message({
                    message: '请选择单个灯杆进行添加!',
                    type: 'error'
                });
                return;
            }
            var data = {
                poleId:that.site[0].id,
            }
            if(that.locationType=='1'){
                data.coord = that.click.mapcood.join(',')
            }
            if(that.locationType=='0'){
                var array = []
                array.push(sessionStorage.clientX)
                array.push(sessionStorage.clientY)
                data.coord = array.join(',')
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/poleResetCoord',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '添加坐标成功!',
                            type: 'success'
                        });
                        if(that.locationType=='1'){
                            that.getcoord=[that.click.mapcood[0],that.click.mapcood[1]] 
                        }
                        that.ready();
                        $('#myModal').modal('hide')
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //返回首页
        backtrack(){this.$router.push({'path':'/index'});},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/privilege/getMyOperatMenu',
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addPoleIcon'){
                                that.addPoleIcon = true
                            }
                            if(data.result.operats[i].code=='deletePoleIcon'){
                                that.deletePoleIcon = true
                            }
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //websokwt
        websokwt(){
            var that = this
            var url = localStorage.serverurl;
            url = url.split('//')
            var result = 'ws://'+url[1]+'/websocket/'+sessionStorage.userId
            var ws = new WebSocket(result);
            ws.onopen = function(){}
            ws.onmessage = function (evt){
                // var data = JSON.parse(evt.data)
                that.$notify({
                    title: '警告',
                    message: evt.data,
                    type: 'warning'
                });
                that.ready()
            }
            ws.onclose = function (evt){
                ws = new WebSocket(result);
            }
        },
    },
    created(){
        var that = this
        document.body.onselectstart=document.body.oncontextmenu=function(){ return false;} 
        //设置img的路径
        var url = localStorage.serverurl.split('/')
        that.imgserverurl = url[0]+'//'+url[2]+'/solin-platform/'
        this.project()
        this.Jurisdiction()
        setTimeout(function(){
            that.websokwt()
        },1000)
        clearInterval(this.time);        
        this.time = null;
    },
    beforeDestroy() {
        clearInterval(this.time);        
        this.time = null;
    },
}
</script>
<style scoped>
.block{text-align: center;}
.mapHomgPage{width: 100%;height: 100%;position: relative;overflow: hidden;}
.allmap,#allmap,.plane{width: 100%;height: 100%;}
.plane{display: flex;justify-content: center;align-items: center;background: linear-gradient(to right, #050913, #0a235c, #2161d6, #0a235c, #010920);overflow: hidden;position: relative;}
.plane_div{position: relative;}
.plane_div_bgimg{}
.plane_div_icon{position: absolute;}
.map_left{border-radius: 5px;position: absolute;top: 15px;left: 15px;background: white;width:450px;height: 38px;line-height: 38px;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.map_left_left{position: absolute;left: 0;right: 50px;height: 100%;display: flex;}
.map_left_right{border-radius: 5px;position: absolute;width: 50px;height: 100%;right: 0;top: 0;background:#3385ff;cursor: pointer;text-align: center;line-height: 47px;}
.map_left_right>i{color: rgb(68, 8, 8);font-size: 24px;}
.map_left_right:hover{background:#5D9CF9;}
.shrink{position: absolute;left: 35px;top:60px;}

.map_right{position: absolute;right: 20px;top: 15px;width:240px;height:90px;box-shadow: 5px 5px 15px #000;
border-radius: 15px;background: #fff;opacity: .8;}
.map_right_left{color: #73879c;text-align: center;margin:0;
font-family:cursive;text-shadow:-1px -1px 1px #fff}
.backtrack{font-size: 34px;cursor: pointer;}
.backtrack:hover{color: aquamarine;}
.LampPole{width: 100%;height: 300px;}

#menu,#menu2,#menu3,#menu4{position: absolute;display:none;background:rgba(170, 168, 168, 0.5) !important;padding: 5px;border-radius: 5px;}
#menu3{width:118px;display: none;}
#menu4{width:94px;display: none;}
#menu>ul,#menu2>ul,#menu3>ul,#menu4>ul{padding: 0;margin-bottom: 0px;}
#menu>ul>li,#menu2>ul>li,#menu3>ul>li,#menu4>ul>li{list-style: none;padding: 2px 2px 2px 2px;background: white;border-radius: 5px;cursor: pointer;}
#menu>ul>li:nth-of-type(2),#menu2>ul>li:nth-of-type(2),#menu3>ul>li:nth-of-type(2),#menu4>ul>li:nth-of-type(2){margin-top: 5px;}
#menu>ul>li>a,#menu2>ul>li>a,#menu3>ul>li>a,#menu4>ul>li>a{text-decoration: none;font: 12px;}

.rightfloat{display:none;position: absolute;padding: 5px;right: -250px;width: 250px;top:130px;background: white;border-radius: 3px;border: 1px solid gray;}
.concentright_top{width: 100%;height:25px;border-bottom: 1px solid gray;}
.concentright_top>p{margin: 0;display: inline-block;height: 100%;line-height: 25px;font-weight: 600;padding-left: 10px;}
.concentright_top>i{font-size: 20px;position: absolute;right: 5px;}
.concentright_bottom p{margin: 0 !important;padding:2px 0 2px 5px;}
.concentlampPole span{display: block;width:99%;}

.demo-table-expand {font-size: 0;}
.demo-table-expand>div{margin-right: 3%;margin-bottom: 0;}
.demo-table-expand label {width: 90px;color: #99a9bf;}

.homepage_center{position: absolute;top: 70px;width:300px;height:350px;background: #6E7A81;border-radius: 5px;opacity: 0.7;}
.homepage_top,.homepage_bottom>div{width: 90%;padding: 5px;display: flex;justify-content: center;margin: 0 auto;}
.homepage_top>span,.homepage_bottom>div>span{display: inline-block;width: 135px;height: 100%;text-align: center;font-size: 18px;}
.homepage_top{border-bottom:1px solid white;color: white;height:56px;}
.homepage_top>span{line-height:63px;}
.homepage_bottom>div>span{line-height:63px;}
.homepage_bottom{background: white;width: 90%;margin: 0 auto;margin-top: 20px;border-radius: 5px;}
.homepage_bottom>div{height: 63px;}
.homepage_indent{width: 35px;height: 20px;position: absolute;background: #6E7A81;left: 300px;top: 3px;border-top-right-radius: 15px;border-bottom-right-radius: 15px;}
.homepage_indent>i{color: white;font-size: 22px;padding-left: 7px;}
</style>
