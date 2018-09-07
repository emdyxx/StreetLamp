<template>
    <!-- 地图主页 -->
    <div class="mapHomgPage">
        <div class="allmap">
            <div id="allmap"></div>
        </div>
        <div class="plane">
            <div @mouseup="uplift" @mousedown='mousedown' class="plane_div" id="plane_div" style="position:absolute;">
                <img :src=serverurl+planUrl alt="" class="plane_div_bgimg">
                <template v-if="value1=='0'">
                    <template v-for="item in data">
                        <img v-if="item.coord!=''" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" src='http://192.168.70.10/solin-platform/image/icon1.png'>
                    </template>
                </template>
                <template v-if="value1=='1'">
                    <template v-for="item in data">
                        <img v-if="item.coord!=''" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" src='http://192.168.70.10/solin-platform/image/icon2.png'>
                    </template>
                </template>
                <template v-if="value1=='2'">
                    <template v-for="item in data">
                        <img v-if="item.coord!=''" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" src='http://192.168.70.10/solin-platform/image/icon3.png'>
                    </template>
                </template>
                <template v-if="value1=='3'">
                    <template v-for="item in data">
                        <img v-if="item.coord!=''" class="plane_div_icon" :name="item.coord" :id="item.id" :key="item.id" @mouseup="uplifttwo" :style="`left:${item.x}px;top:${item.y}px;`" src='http://192.168.70.10/solin-platform/image/icon4.png'>
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
                <el-select v-model="value" size='small' style="width:280px;" placeholder="请选择">
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
        </div>
        <div class="map_right">
            <!-- <div class="map_right_left"></div> -->
            <i @click="backtrack" class="backtrack iconfont icon-guanbi"></i>
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
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="coord"
                                align='center'
                                label="坐标"
                                min-width="80">
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
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            serverurl:localStorage.serverurl,
            addPoleIcon:false,
            deletePoleIcon:false,
            serverurl:localStorage.serverurl,
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
            isDown:false
        }
    },
    mounted(){
        var that = this;
        setTimeout(function(){
            that.ready()
        },1000)
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
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
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
                        that.value = that.options[0].id
                        that.locationType = data.result.projects[0].locationType
                        if(data.result.projects[0].locationType=='1'){
                            that.getcoord=[data.result.projects[0].area.lng,data.result.projects[0].area.lat]
                        }else{
                            that.planUrl = data.result.projects[0].planUrl
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                },
            })
        },
        optionChange(val){
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
                        that.planUrl = that.options[i].planUrl
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
            this.isDown = false;
            var that = this
            window.event.cancelBubble = true
            $('#menu3').css('display','none')
            ev = ev || window.event;
            var btn = ev.button;
            if( btn == 2){
                var array = ev.target.name.split(",")
                array[0] = Number(array[0])+24
                array[1] = Number(array[1])+48
                $('#menu4').css({
                    "display":"inline-block",
                    "left":array[0]+"px",
                    "top":array[1]+"px"
                })
                that.click.id = ev.target.id
                that.click.type = that.value1
            } 
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
                            var icon1 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon1.png", new BMap.Size(48,80));
                            var icon2 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon2.png", new BMap.Size(48,80));
                            var icon3 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon3.png", new BMap.Size(48,80));
                            var icon4 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon4.png", new BMap.Size(48,80));
                            for(var i=0;i<data.result.list.length;i++){
                                if(data.result.list[i].coord==''||data.result.list[i].coord==undefined||data.result.list[i].coord==null){
                                    
                                }else{
                                    var coord = data.result.list[i].coord
                                    var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                    if(that.value1=='0'){
                                        var marker = new BMap.Marker(point,{icon:icon1});
                                    }
                                    if(that.value1=='1'){
                                        var marker = new BMap.Marker(point,{icon:icon2});
                                    }
                                    if(that.value1=='2'){
                                        var marker = new BMap.Marker(point,{icon:icon3});
                                    }
                                    if(that.value1=='3'){
                                        var marker = new BMap.Marker(point,{icon:icon4});
                                    }
                                    marker.setTitle(data.result.list[i].nickName); //这里设置maker的title 
                                    marker.id=data.result.list[i].id
                                    marker.type=that.value1
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
                console.log(evt)
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
        this.project()
        this.Jurisdiction()
        setTimeout(function(){
            that.websokwt()
        },1000)
    },
}
</script>
<style scoped>
.mapHomgPage{width: 100%;height: 100%;position: relative;overflow: auto;}
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

.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.map_right_left{position: absolute;right:50px;top:7px;width: 300px;height: 35px;background: white;}
.backtrack{font-size: 34px;cursor: pointer;}
.backtrack:hover{color: aquamarine;}
.LampPole{width: 100%;height: 300px;}

.block{text-align: center;}

#menu,#menu2,#menu3,#menu4{position: absolute;display:none;background:rgba(170, 168, 168, 0.5) !important;padding: 5px;border-radius: 5px;}
#menu3{width:118px;display: none;}
#menu4{width:94px;display: none;}
#menu>ul,#menu2>ul,#menu3>ul,#menu4>ul{padding: 0;margin-bottom: 0px;}
#menu>ul>li,#menu2>ul>li,#menu3>ul>li,#menu4>ul>li{list-style: none;padding: 2px 2px 2px 2px;background: white;border-radius: 5px;cursor: pointer;}
#menu>ul>li:nth-of-type(2),#menu2>ul>li:nth-of-type(2),#menu3>ul>li:nth-of-type(2),#menu4>ul>li:nth-of-type(2){margin-top: 5px;}
#menu>ul>li>a,#menu2>ul>li>a,#menu3>ul>li>a,#menu4>ul>li>a{text-decoration: none;font: 12px;}

.demo-table-expand {font-size: 0;}
.demo-table-expand>div{margin-right: 3%;margin-bottom: 0;}
.demo-table-expand label {width: 90px;color: #99a9bf;}
</style>
