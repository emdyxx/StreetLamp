<template>
    <!-- 地图主页 -->
    <div class="mapHomgPage">
        <div id="allmap"></div>
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
        <!-- 查看详情 -->
        <div class="details">
            <i class="el-icon-close" @click="closeDetails"></i>
            <div class="panel-group" id="accordion" style="margin-top:20px;margin-bottom:0;">
                <div class="panel panel-default" v-if='value1=="0"'>
                    <div class="panel-heading" >
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" style='display: block;text-decoration:none;'>
                                灯杆
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <el-table
                                :data="tableData2"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                show-overflow-tooltip=true
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
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
                        </div>
                    </div>
                </div>
                <div class="panel panel-default" v-if='value1=="0"||value1=="1"'>
                    <div class="panel-heading">
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" style='display: block;text-decoration:none;'>
                                <span v-if='value1=="0"'>已关联灯具</span>
                                <span v-else>灯具</span>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse">
                        <div class="panel-body">
                            <el-table
                                :data="tableData3"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                show-overflow-tooltip=true
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="亮度" style="width: 30%;">
                                                <span v-if="props.row.brightness==null">---</span>
                                                <span v-else>{{ props.row.brightness }}</span>
                                            </el-form-item>
                                            <el-form-item label="电压(V)" style="width: 30%;">
                                                <span v-if="props.row.voltage==null">---</span>
                                                <span v-else>{{ props.row.voltage }}</span>
                                            </el-form-item>
                                            <el-form-item label="电流(A)" style="width: 30%;">
                                                <span v-if="props.row.electricity==null">---</span>
                                                <span v-else>{{ props.row.electricity }}</span>
                                            </el-form-item>
                                            <el-form-item label="功率(W)" style="width: 30%;">
                                                <span v-if="props.row.power==null">---</span>
                                                <span v-else>{{ props.row.power }}</span>
                                            </el-form-item>
                                            <el-form-item label="采集时间">
                                                <span v-if="props.row.timestamp==null">---</span>
                                                <span v-else>{{ props.row.timestamp }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
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
                                label="灯控器标识"
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
                        </div>
                    </div>
                </div>
                <div class="panel panel-default" v-if='value1=="0"||value1=="2"'>
                    <div class="panel-heading">
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" style='display: block;text-decoration:none;'>
                                <span v-if='value1=="0"'>已关联广告屏</span>
                                <span v-else>广告屏</span>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                        <div class="panel-body">
                            <el-table
                                :data="tableData4"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                show-overflow-tooltip=true
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="昵称"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="serialNumber"
                                align='center'
                                label="屏幕标识"
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
                        </div>
                    </div>
                </div>
                <div class="panel panel-default" v-if='value1=="0"||value1=="3"'>
                    <div class="panel-heading">
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapsefour" style='display: block;text-decoration:none;'>
                                <span v-if='value1=="0"'>已关联气象站</span>
                                <span v-else>气象站</span>
                            </a>
                        </h5>
                    </div>
                    <div id="collapsefour" class="panel-collapse collapse">
                        <div class="panel-body">
                            <el-table
                                :data="tableData5"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                show-overflow-tooltip=true
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="风向" style="width: 30%;">
                                                <span v-if="props.row.windDirectionAverage==null">---</span>
                                                <span v-else>{{ props.row.windDirectionAverage }}</span>
                                            </el-form-item>
                                            <el-form-item label="风速" style="width: 30%;">
                                                <span v-if="props.row.windSpeedAverage==null">---</span>
                                                <span v-else>{{ props.row.windSpeedAverage }}</span>
                                            </el-form-item>
                                            <el-form-item label="温度" style="width: 30%;">
                                                <span v-if="props.row.temperature==null">---</span>
                                                <span v-else>{{ props.row.temperature }}</span>
                                            </el-form-item>
                                            <el-form-item label="湿度" style="width: 30%;">
                                                <span v-if="props.row.humidity==null">---</span>
                                                <span v-else>{{ props.row.humidity }}</span>
                                            </el-form-item>
                                            <el-form-item label="气压" style="width: 30%;">
                                                <span v-if="props.row.pressure==null">---</span>
                                                <span v-else>{{ props.row.pressure }}</span>
                                            </el-form-item>
                                            <el-form-item label="噪声" style="width: 30%;">
                                                <span v-if="props.row.noiseAverage==null">---</span>
                                                <span v-else>{{ props.row.noiseAverage }}</span>
                                            </el-form-item>
                                            <el-form-item label="PM2.5" style="width: 30%;">
                                                <span v-if="props.row.PM2==null">---</span>
                                                <span v-else>{{ props.row.PM2 }}</span>
                                            </el-form-item>
                                            <el-form-item label="PM10" style="width: 30%;">
                                                <span v-if="props.row.PM10==null">---</span>
                                                <span v-else>{{ props.row.PM10 }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
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
                                label="气象站编号"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="mark"
                                label="备注"
                                align='center'
                                :formatter="formatRole"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
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
            addPoleIcon:false,
            deletePoleIcon:false,
            serverurl:localStorage.serverurl,
            options:[],//项目
            value:'',
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
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData5:[],
            click:{
                id:'',
                type:'',
                mapcood:[]
            }
        }
    },
    mounted(){
        var that = this;
        setTimeout(function(){
            that.ready()
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
                        that.getcoord=[data.result.projects[0].area.lng,data.result.projects[0].area.lat]
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
            $('.details').css('display','none')
        },
        search(){
            var that = this
            $('.details').css('display','none')
            console.log(that.options)
            for(var i=0;i<that.options.length;i++){
                if(that.options[i].id==that.value){
                    if(that.options[i].area==''||that.options[i].area==null||that.options[i].area==undefined){

                    }else{
                        that.getcoord=[that.options[i].area.lng,that.options[i].area.lat]
                    }
                }
            }
            that.ready()
        },
        //初始化百度地图
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
                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        map.centerAndZoom(new BMap.Point(that.getcoord[0],that.getcoord[1]),that.getZoom);// 初始化地图,设置中心点坐标和地图级别
                        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                        //添加鼠标右键事件
                        // var menu = new BMap.ContextMenu();
                        // var txtMenuItem = [];
                        // if(that.value1=='0'){
                        //     txtMenuItem.push({
                        //         text:'添加灯杆坐标',
                        //         callback:function(e){
                        //             that.mapcood = []
                        //             that.mapcood.push(e.lng)
                        //             that.mapcood.push(e.lat)
                        //             if(that.addPoleIcon=='false'){
                        //                 that.$message({
                        //                     message: '您无此权限',
                        //                     showClose: true,
                        //                 });
                        //             }else{
                        //                 $('#myModal').modal('show')
                        //                 that.getZoom = map.getZoom()
                        //                 that.addLampPole(e)
                        //             } 
                        //         }
                        //     })
                        // }
                        // for(let i=0; i < txtMenuItem.length; i++){
                        //     menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
                        // }
                        // map.addContextMenu(menu);
                        //添加灯杆图片http://lbsyun.baidu.com/jsdemo/img/fox.gif
                        var icon1 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon1.png", new BMap.Size(48,80));
                        var icon2 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon2.png", new BMap.Size(48,80));
                        var icon3 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon3.png", new BMap.Size(48,80));
                        var icon4 = new BMap.Icon("http://192.168.70.10/solin-platform/image/icon4.png", new BMap.Size(48,80));
                        for(var i=0;i<data.result.list.length;i++){
                            if(data.result.list[i].coord==''||data.result.list[i].coord==undefined||data.result.list[i].coord==null){
                                
                            }else{
                                var coord = data.result.list[i].coord
                                var point = new BMap.Point(coord.split(",")[0],coord.split(",")[1]);
                                console.log(point)
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
                                // that.Listener(marker);
                            }
                        }
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
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //覆盖物右键事件
        Listener(marker){
            var that = this 
            marker.addEventListener("rightclick",function(e){
                var id = e.target.id
                var type = e.target.type
                var menuTwo = new BMap.ContextMenu();

                // var txtMenuItems = [];
                // if(e.target.type=='0'){
                //     txtMenuItems.push({
                //         text:'删除灯杆',
                //         callback:function(e){
                //             if(that.deletePoleIcon == 'false'){
                //                 that.$message({
                //                     message: '您无此权限',
                //                     showClose: true,
                //                 });
                //             }else{
                                
                //             }
                //         }
                //     })
                // }
                // txtMenuItems.push({
                //     text:'查看详情',
                //     callback:function(e){
                //         that.LampPole(id,type)
                //         $('.details').css('display','inline')
                //     }
                // })
                for(var i=0;i<txtMenuItems.length;i++){
                   menuTwo.addItem(new BMap.MenuItem(txtMenuItems[i].text,txtMenuItems[i].callback,100)); 
                }
                marker.addContextMenu(menuTwo)
            });
        },
        //删除灯杆坐标
        remove(){
            var that = this;
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
            var id = that.click.id
            var type = that.click.type
            var url = ''
            var data = {}
            $('.details').css('display','inline')
            if(type=='0'){url='/pole/getBindDeviceListByPoleId';data.poleId=id;}
            if(type=='1'){url='/lamp/getLampDetailsById';data.lampId=id;}
            if(type=='2'){url='/screen/getScreenDetailsById';data.screenId =id;}
            if(type=='3'){url='/envSensors/getEnvSensorsInformation';data.id = id}
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        console.log(type)
                        if(type=='0'){
                            that.tableData2=[]
                            that.tableData2.push(data.result.poleDto)
                            that.tableData3 = data.result.lampDtoList
                            that.tableData4 = data.result.screenDtoList
                            that.tableData5 = data.result.EnvSensorDtoList
                        }
                        if(type=='1'){
                            that.tableData3=[]
                            that.tableData3.push(data.result.lampDto)
                        }
                        if(type=='2'){
                            that.tableData4=[]
                            that.tableData4.push(data.result.screenDto)
                        }
                        if(type=='3'){
                            that.tableData5=[]
                            that.tableData5.push(data.result)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //点击添加灯杆坐标,请求所有灯杆信息
        addLampPole(){
            var that = this
            that.mapcoo=[]
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
        closeDetails(){
            $('.details').css('display','none')
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
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/poleResetCoord',
                data:{
                    poleId:that.site[0].id,
                    coord:that.click.mapcood.join(',')
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '添加坐标成功!',
                            type: 'success'
                        });
                        that.getcoord=[that.click.mapcood[0],that.click.mapcood[1]]
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
    },
    created(){
        document.body.onselectstart=document.body.oncontextmenu=function(){ return false;} 
        this.project()
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.mapHomgPage{width: 100%;height: 100%;position: relative;overflow: auto;}
#allmap{width: 100%;height: 100%;}
.map_left{border-radius: 5px;position: absolute;top: 15px;left: 15px;background: white;width:450px;height: 38px;line-height: 38px;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.map_left_left{position: absolute;left: 0;right: 50px;height: 100%;display: flex;}
.map_left_right{border-radius: 5px;position: absolute;width: 50px;height: 100%;right: 0;top: 0;background:#3385ff;cursor: pointer;text-align: center;line-height: 47px;}
.map_left_right>i{color: white;font-size: 24px;}
.map_left_right:hover{background:#5D9CF9;}

.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.map_right_left{position: absolute;right:50px;top:7px;width: 300px;height: 35px;background: white;}
.backtrack{font-size: 34px;cursor: pointer;}
.backtrack:hover{color: aquamarine;}
.LampPole{width: 100%;height: 300px;}

.details{position:absolute;right:20px;top:20%;width: 400px;background: #ddd;border-radius: 5px;box-shadow: rgba(0,0,0,.15);padding: 5px;display: none;}
.details>i{position: absolute;right: 5px;font-size: 18px;color: white;cursor: pointer;}
.block{text-align: center;}

#menu{position: absolute;display:none;background:rgba(170, 168, 168, 0.5) !important;padding: 5px;border-radius: 5px;}
#menu2{position: absolute;display:none;background:rgba(170, 168, 168, 0.5) !important;padding: 5px;border-radius: 5px;}
#menu>ul,#menu2>ul{padding: 0;margin-bottom: 0px;}
#menu>ul>li,#menu2>ul>li{list-style: none;padding: 2px 2px 2px 2px;background: white;border-radius: 5px;cursor: pointer;}
#menu>ul>li:nth-of-type(2),#menu2>ul>li:nth-of-type(2){margin-top: 5px;}
#menu>ul>li>a,#menu2>ul>li>a{text-decoration: none;font: 12px;}

.demo-table-expand {font-size: 0;}
.demo-table-expand>div{margin-right: 3%;margin-bottom: 0;}
.demo-table-expand label {width: 90px;color: #99a9bf;}
</style>
