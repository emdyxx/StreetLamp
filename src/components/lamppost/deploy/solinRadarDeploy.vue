<template>
    <!-- 雷达传感器 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备部署>雷达管理</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewRadarDeploy">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='地址';type='2';">地址</el-dropdown-item>
                            <el-dropdown-item @click.native="name='状态';type='3';">状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="type=='1'">
                            <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type=='2'">
                            <el-input type="number" v-model="radarNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                        </template>
                        <template v-if="type=='3'">
                            <el-select v-model="online" size='small' style="width:194px;" clearable placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div>
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div> 
                <div class="section_bottom_right">
                    <el-button @click="operation(0)" v-if="JurisdictionS.addRadar" type="primary" plain icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button @click="operation(2)" v-if="JurisdictionS.delRadar" type="primary" plain icon='el-icon-delete' size='small'>删除</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="radarNumber"
                    show-overflow-tooltip
                    label="地址"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    show-overflow-tooltip
                    label="所属灯杆"
                    min-width="110"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorName"
                    show-overflow-tooltip
                    label="集中器"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="创建时间"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="operation(1,scope.row)" v-if="JurisdictionS.editRadar" type="primary" size='mini'>编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
        <!-- 添加,编辑雷达传感器 -->
        <div class="modal fade" id="MyModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="MyType=='0'" class="modal-title" id="myModalLabel">添加雷达传感器</h4>
                        <h4 v-if="MyType=='1'" class="modal-title" id="myModalLabel">编辑雷达传感器</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名&emsp;&emsp;称:</label>
                            <input type="text" v-model="data.nickName" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>地&emsp;&emsp;址:</label>
                            <el-input-number v-model.lazy="data.radarNumber" :precision="0" :min="1" :max="253" size="small" style="width:196px;" label="地址"></el-input-number>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>型&emsp;&emsp;号:</label>
                            <el-select v-model="data.modelId" size='small' style='width:195px;' placeholder="请选择">
                                <el-option
                                v-for="item in modelData"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>集&ensp;中&ensp;器:</label>
                            <el-select v-model="data.concentratorSn" size='small' style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in concentratorSnData"
                                :key="item.concentratorSn"
                                :label="item.concentratorName"
                                :value="item.concentratorSn">
                                    <span style="float: left">{{ item.concentratorName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.concentratorSn }}</span>
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>位&emsp;&emsp;置:</label>
                            <input type="text" v-model="data.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>
                        <div class="form-group">
                            <label>备&emsp;&emsp;注:</label>
                            <el-input
                                type="textarea"
                                :rows="1"
                                style="width:195px;"
                                placeholder="请输入内容"
                                v-model="data.remark">
                            </el-input>
                        </div> 
                        <div class="form-group" v-if="MyType=='0'">
                            <el-button v-if="JurisdictionS.radarAssociatePole" @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Submit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 地图选点 -->
        <div class="modal fade" id="map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:700px;">
                <div class="modal-content">
                    <div class="modal-body map_Z" style='height:550px'>
                        <div>点击地图选取坐标--坐标:{{referencePosition}}</div>
                        <div>
                            <div style="width:100%;height:100%;" id="allmap"></div>
                        </div>
                        <div>
                            <el-button @click="mapSubmit" type="primary" size='mini'>确定</el-button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联灯杆 -->
        <div class="modal fade" id="LampPole_data" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">请选择灯杆进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData2"
                            @row-click="clickRow2" 
                            ref="multipleTable"
                            border
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange2"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            align="center"
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            show-overflow-tooltip
                            label="灯杆名称"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            show-overflow-tooltip
                            label="灯杆类型"
                            width="80">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.poleType=='0'">普通灯杆</span>
                                    <span v-if="scope.row.poleType=='1'">智慧灯杆</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="coord"
                            :formatter="formatRole"
                            show-overflow-tooltip
                            label="位置"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            :formatter="formatRole"
                            label="备注"
                            show-overflow-tooltip
                            width="162">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange2"
                            @current-change="currentchange2"
                            :current-page="pageIndex2"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total2">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Relation" class="btn btn-primary">确认</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'section',
    data () {
        return {
            JurisdictionS:{
                viewRadarDeploy:false,
                addRadar:false,
                editRadar:false,
                delRadar:false,
                radarAssociatePole:false
            },
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:10,
            nickName:'',
            radarNumber:'',
            options:[{label:'在线',value:'1'},{label:'离线',value:'0'}],
            online:'',
            //添加编辑参数
            MyType:'0',
            radarSite:[],
            data:{
                nickName:'',
                radarNumber:'',
                modelId:'',
                concentratorSn:'',
                coord:'',
                remark:'',
            },
            referencePosition:'',
            modelData:[],
            concentratorSnData:[],
            tableData2:[],//关联灯杆
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10,
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.radarNumber=''
            this.online=''
        },
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
        clickRow2(row){
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        //点击添加,编辑,删除
        operation(val,row){
            var that = this;
            if(val=='0'){
                that.ModelData()
                that.concentrator()
                that.MyType = '0'
                that.data.nickName = ''
                that.data.radarNumber = ''
                that.data.modelId = ''
                that.data.concentratorSn = ''
                that.data.coord = ''
                that.data.remark = ''
                that.site2 = []
                that.referencePosition = ''
                $('#MyModal').modal('show')
            }
            if(val=='1'){
                that.MyType = '1'
                that.ModelData(row.modelId)
                that.concentrator(row.concentratorSn)
                that.radarSite = row
                that.data.nickName = row.nickName
                that.data.radarNumber = row.radarNumber
                that.data.modelId = row.modelId
                that.data.concentratorSn = row.concentratorSn
                that.data.coord = row.coord
                that.data.remark = row.remark
                that.referencePosition = row.coord
                $('#MyModal').modal('show')
            }
            if(val=='2'){
                if(that.site.length=='0'){
                    that.$message({
                        message: '请选择雷达进行删除!',
                        type: 'warning'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选传感器？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/sensor/radar/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            radars:arr
                        }),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.ready()
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
            }
            /* 完成拖拽 */
            $('#MyModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#MyModal').css("overflow", "hidden")
        },
        //添加,编辑保存
        Submit(){
            var that = this;
            var data = {};
            var type = ''
            if(this.data.nickName==''||this.data.concentratorSn==''||this.data.modelId==''||this.data.radarNumber==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            data = this.data
            if(this.MyType=='0'){
                type='post'
                if(this.site2.length==0){
                    data.poleId='0'
                }else{
                    data.poleId = this.site2[0].id
                }
            }
            if(this.MyType=='1'){
                data.id=that.radarSite.id;
                data.poleId=that.radarSite.poleId
                type='put'
            }
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/radar',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#MyModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取型号列表
        ModelData(modelId){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/radar/model',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.modelData = data.result.mapList
                        if(that.MyType=='0'){
                            that.data.modelId = data.result.mapList[0].id
                        }
                        if(that.MyType=='1'){
                            that.data.modelId = modelId
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求集中器
        concentrator(concentratorSn){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.concentratorSnData = data.result.list
                        if(that.addType=='1'){
                            that.data.concentratorSn = concentratorSn
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击拉取地图
        mapClick(){
            var that = this
            $('#map').modal('show')
            $('#map').on('shown.bs.modal', function (e) {
                var map = new BMap.Map("allmap",{enableMapClick:false});    // 创建Map实例
                var coord = ''
                if(that.data.coord!=''){
                    coord = that.data.coord
                    coord = coord.split(',')
                    var point = new BMap.Point(coord[0],coord[1]);
                    map.centerAndZoom(point, 12);  // 初始化地图,设置中心点坐标和地图级别
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                }else{
                    map.centerAndZoom(sessionStorage.areaname, 12);  // 初始化地图,设置中心点坐标和地图级别
                }
                map.addEventListener("click", function(e){
                    map.clearOverlays();
                    var point = new BMap.Point(e.point.lng,e.point.lat);
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                    that.referencePosition = e.point.lng+','+e.point.lat
                });
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var size = new BMap.Size(10, 20);
                map.addControl(new BMap.CityListControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: size,
                }));
            })
        },
        //地图确定
        mapSubmit(){
            $('#map').modal('hide')
            this.data.coord = this.referencePosition
        },
        //点击关联灯杆
        LampPole_data(){
            var that= this;
            $('#LampPole_data').modal('show')
            this.site2 = []
            this.LampPoleData();
        },
        //查询所有灯杆数据
        LampPoleData(){
            var that = this;
            var data = {
                page:that.pageIndex2,
                size:that.pageSize2,
                nickName:'',
                poleType:'',
                serialNumber:'',
                areaId:'',
                projectIds:sessionStorage.projectId
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
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                        if(that.MyType=='1'){
                            var arr = []
                            for(let i = 0;i<that.site.length;i++){
                                for(let j = 0;j<data.result.list.length;j++){
                                    if(that.site[i].poleId==data.result.list[j].id){
                                        arr.push(data.result.list[j])
                                    }
                                }
                            }
                            setTimeout(function(){
                                arr.forEach(row => {
                                    that.$refs.multipleTable.toggleRowSelection(row);
                                });
                            },200)
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange2(val){this.site2 = val;},
        sizechange2(val){this.pageSize2 = val;this.LampPoleData();},
        currentchange2(val){this.pageIndex2 = val;this.LampPoleData();},
        //关联确认
        Relation(){
            if(this.site2.length>=2){
                this.$message({
                    message: '只能关联一个灯杆!',
                    type: 'warning'
                });
                return;
            }
            $('#LampPole_data').modal('hide')
        },
        //请求雷达基本数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/radar',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   nickName:that.nickName,
                   radarNumber:that.radarNumber,
                   online:that.online,
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
        search(){this.ready()},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewRadarDeploy'){
                                that.JurisdictionS.viewRadarDeploy = true
                            }
                            if(data.result.operats[i].code=='addRadar'){
                                that.JurisdictionS.addRadar = true
                            }
                            if(data.result.operats[i].code=='editRadar'){
                                that.JurisdictionS.editRadar = true
                            }
                            if(data.result.operats[i].code=='delRadar'){
                                that.JurisdictionS.delRadar = true
                            }
                            if(data.result.operats[i].code=='radarAssociatePole'){
                                that.JurisdictionS.radarAssociatePole = true
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created(){
        this.ready();    
        this.Jurisdiction()
    }
}
</script>
<style scoped>

</style>
