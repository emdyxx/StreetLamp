<template>
    <div class="section">
        <!-- 气象站部署 -->
        <div class="section_top">
            <p>位置: &nbsp;设备部署>气象站管理</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewEnvDeploy">
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
                            <el-input type="number" v-model="serialNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                            <!-- <el-input-number v-model="serialNumber" size="small" :precision="0" :min="1" :max="253" label="请输入地址" style="width:200px;"></el-input-number> -->
                            <!-- <el-input v-model.number="serialNumber" size="small" placeholder="请输入地址"></el-input> -->
                        </template>
                        <template v-if="type=='3'">
                            <el-select v-model="value" size='small' style="width:194px;" clearable placeholder="请选择">
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
                    <el-button v-if="JurisdictionS.addEnv" @click="addsensor(0)" type="primary" plain icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button v-if="JurisdictionS.delEnv" @click="deletesensor" type="primary" plain icon='el-icon-delete' size='small'>删除</el-button>
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
                    prop="serialNumber"
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
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="mark"
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
                            <el-button v-if="JurisdictionS.editEnv" @click="addsensor(1,scope.row)" type="primary" size='mini'>编辑</el-button>
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
        <!-- 添加编辑气象站模态框 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加气象站</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑气象站</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名&emsp;&emsp;称:</label>
                            <input type="text" v-model="data.nickName" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>地&emsp;&emsp;址:</label>
                            <el-input-number v-model.lazy="data.serialNumber" :precision="0" :min="1" :max="253" size="small" style="width:196px;" label="地址"></el-input-number>
                            <!-- <input type="text" v-model="data.serialNumber" id="serialNumber" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号"> -->
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>型&emsp;&emsp;号:</label>
                            <el-select v-model="data.modelId" size='small' style='width:195px;' placeholder="请选择">
                                <el-option
                                v-for="item in options3"
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
                                v-for="item in options2"
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
                                v-model="data.mark">
                            </el-input>
                        </div> 
                        <div class="form-group" v-if="addtype=='0'">
                            <el-button v-if='JurisdictionS.envAssociatePole' @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">确定</button>
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
        <!-- 绑定项目 -->
        <div class="modal fade" id="sensorBindProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">绑定项目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <span style="line-height:35px;">项目:</span>
                            <el-select size='small' v-model="value5" style="margin-left:20px;" placeholder="请选择">
                                <el-option
                                    v-for="item in options5"
                                    style="height:30px;"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Submit_sensorBindProject" class="btn btn-primary">确定</button>
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
    </div>
</template>
<script>
export default {
    name: 'user',
    data () {
        return {
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewEnvDeploy:false,//查看气象站部署
                addEnv:false,//添加气象站
                editEnv:false,//编辑气象站
                delEnv:false,//删除气象站
                envAssociatePole:false,//关联灯杆
            },
            site:[], //列表选中数据列表
            addtype:'0', //判断是添加还是编辑类型的参数
            envSite:[],
            options5:[],
            value5:'',
            serialNumber:'',
            nickName:'',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            options:[{label:'在线',value:'1'},{label:'离线',value:'0'}],
            options3:[],
            value:'',
            options2:[],//集中器标示
            referencePosition:'',
            data:{
                nickName:'',
                concentratorSn:'',
                modelId:'',
                online:'0',
                mark:'',
                serialNumber:'',
                coord:'',
            },//添加气象站数据
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10,
        }
    },
    mounted(){
        this.ModelData()
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
            this.value=''
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
        //获取型号列表
        ModelData(modelId){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/model',
                contentType:'application/json;charset=UTF-8',
                data:{
                    modelType:'3'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.list
                        if(that.addType=='0'){
                            that.data.modelId = data.result.list[0].id
                        }
                        if(that.addType=='1'){
                            that.data.modelId = modelId
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 添加,编辑气象站
        addsensor(val,row){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            // 0为添加,1为编辑
            if(val=='0'){
                this.addtype = val;
                this.ModelData()
                this.concentrator()
                this.data.nickName = ''
                this.data.concentratorSn = ''
                this.data.serialNumber = ''
                this.data.modelId = ''
                this.data.location = ''
                this.data.mark = ''
                this.value = ''
                this.data.coord = ''
                this.referencePosition = ''
                this.site2 = []
                $('#addModal').modal('show')
                $('#serialNumber').removeAttr('disabled')
            }
            if(val=='1'){
                this.addtype = val;
                this.ModelData(row.modelId)
                this.concentrator(row.concentratorSn)
                this.envSite = row
                this.data.nickName = row.nickName
                this.data.concentratorSn = row.concentratorSn
                this.data.modelId = row.modelId
                this.data.location = row.location
                this.data.mark = row.mark
                this.data.serialNumber = row.serialNumber
                this.data.coord = row.coord
                this.referencePosition = row.coord
                // this.value = ''
                $('#addModal').modal('show')
                $('#serialNumber').attr('disabled','disabled')
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //添加编辑保存
        addSubmit(){
            var that = this;
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            var data = {};
            var type = ''
            if(this.data.nickName==''||this.data.concentratorSn==''||this.data.modelId==''||this.data.serialNumber==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            data = this.data
            data.concentratorSn = data.concentratorSn.toUpperCase()
            if(this.addtype=='0'){
                type='post';
                if(this.site2.length==0){
                    data.poleId='0'
                }else{
                    data.poleId = this.site2[0].id
                }
            }
            if(this.addtype=='1'){
                type='put';
                data.id=that.envSite.id;
                data.poleId=that.envSite.poleId
            }
            data.projectId = sessionStorage.projectId
            data.coord = this.data.coord
            
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#addModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //删除气象站
        deletesensor(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择气象站进行删除!',
                    type: 'warning'
                });
                return;
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选气象站？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/sensor/env/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        envs:arr
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
        },
        //请求集中器标示
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
                        that.options2 = data.result.list
                        if(that.addType=='1'){
                            that.data.concentratorSn = concentratorSn
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //绑定项目
        sensorBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择气象站进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            $('#sensorBindProjectModal').modal('show')
            this.project()
        },
        //请求所有项目接口
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects/type/1',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options5 = data.result.projects
                        that.value5 = ''
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //绑定项目提交
        Submit_sensorBindProject(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    envs:arr,
                    projectId:that.value5
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#sensorBindProjectModal').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //关联灯杆
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
                        if(that.addtype=='1'){
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
        //获取气象站列表数据
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                poleId:'',
                projectIds:sessionStorage.projectId,
                serialNumber:that.serialNumber,
                nickName:that.nickName,
                online:that.value
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env',
                contentType:'application/json;charset=UTF-8',
                data:data,
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
        search(){
            this.ready()
        },
        // 列表数据选中事件  进行编辑,删除操作
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
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
                            if(data.result.operats[i].code=='viewEnvDeploy'){
                                that.JurisdictionS.viewEnvDeploy = true
                            }
                            if(data.result.operats[i].code=='addEnv'){
                                that.JurisdictionS.addEnv = true
                            }
                            if(data.result.operats[i].code=='editEnv'){
                                that.JurisdictionS.editEnv = true
                            }
                            if(data.result.operats[i].code=='delEnv'){
                                that.JurisdictionS.delEnv = true
                            }
                            if(data.result.operats[i].code=='envAssociatePole'){
                                that.JurisdictionS.envAssociatePole = true
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
    },
}
</script>
<style scoped>

</style>