<template>
    <div class="loraSensor">
        <!-- 传感器部署 -->
        <div class="loraSensor_top">
            <el-button v-if="JurisdictionS.addLoraSensor" @click="addloraSensor(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="JurisdictionS.editLoraSensor" @click="addloraSensor(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="JurisdictionS.delLoraSensor" @click="deletloraSensor" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <!-- <el-button v-if="setLoraSensorProject" @click="loraSensorBindProjects" type="primary" icon='el-icon-setting' size='small'>绑定项目</el-button> -->
            <el-dropdown v-if="JurisdictionS.SetUp" size="small" split-button type="primary">
                <i class="el-icon-setting el-icon--left"></i>设置
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="JurisdictionS.setLoraSensorProject" @click.native="loraSensorBindProjects">绑定项目</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="search" v-if="JurisdictionS.viewLoraSensorDeploy">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type1='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='类型';type1='3';">类型</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type1=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='3'">
                        <el-select v-model="value" size='small' style="width:194px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.modelId"
                            :label="item.text"
                            :value="item.modelId">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="loraSensor_bottom">
            <div class="loraSensor_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
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
                    label="名称"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    :formatter="formatRole"
                    label="序列号"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="sensorsTypeDesc"
                    align='center'
                    :formatter="formatRole"
                    label="类型"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    align='center'
                    :formatter="formatRole"
                    label="型号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="network"
                    align='center'
                    :formatter="formatRole"
                    label="入网方式"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    align='center'
                    label="灯杆"
                    min-width="110"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
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
        <!-- 添加/编辑传感器模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加传感器</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑传感器</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form_input">
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model="data.nickName" maxlength="40" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>序列号:</label>
                            <input type="text" v-model="data.serialNumber" :disabled='type=="1"' maxlength="16" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>型号:</label>
                            <el-cascader
                                :options="options"
                                v-model="data.modelId"
                                :props="props"
                                :disabled='type=="1"'
                                size='small'
                                style="width:196px;">
                            </el-cascader>
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>入网方式:</label>
                            <el-select v-model="data.networkId" @change="networkIdChange" size='small' clearable style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <template v-if="networkType=='0'">
                            <div class="form_input">
                                <label><span class="Required">*</span>设备地址:</label>
                                <input type="text" v-model.lazy="data.devAddr" maxlength="8" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备地址">
                            </div>
                            <div class="form_input">
                                <label><span class="Required">*</span>网络秘钥:</label>
                                <input type="text" v-model.lazy="data.nwksKey" maxlength="32" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入网络秘钥">
                            </div>
                            <div class="form_input">
                                <label><span class="Required">*</span>应用秘钥:</label>
                                <input type="text" v-model.lazy="data.appsKey" maxlength="32" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入应用秘钥">
                            </div>
                        </template>
                        <template v-if="networkType=='1'">
                            <div class="form_input">
                                <label><span class="Required">*</span>应用秘钥:</label>
                                <input type="text" v-model.lazy="data.applicationKey" maxlength="32" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入应用秘钥">
                            </div>
                        </template>
                        <div class="form_input">
                            <label><span class="Required">*</span>服务配置:</label>
                            <el-select v-model="data.serviceProfileId" size='small' clearable style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form_input">
                            <label>位置:</label>
                            <input type="text" v-model="data.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>
                        <div class="form_input">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="data.remark"
                                style="width:196px;">
                            </el-input>
                        </div>
                        <div v-if="JurisdictionS.loraSensorAssociatePole" class="form_input" style="margin-top:10px;">
                            <el-button @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="myModalSubmit" class="btn btn-primary">保存</button>
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
                        <h4>请选择灯杆进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData2"
                            @row-click="clickRow2" 
                            ref="multipleTable"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange2"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="灯杆名称"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            align='center'
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
                            align='center'
                            label="位置"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            :formatter="formatRole"
                            label="备注"
                            align='center'
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
                            <el-select size='small' v-model="value3" style="margin-left:20px;" placeholder="请选择">
                                <el-option
                                    v-for="item in options3"
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
    name: 'lamppost',
    data () {
        return {
            name:'名称',
            type1:'1',
            JurisdictionS:{
                viewLoraSensorDeploy:false,//查看传感器部署
                addLoraSensor:false,//添加传感器
                editLoraSensor:false,//编辑传感器
                delLoraSensor:false,//删除传感器
                loraSensorAssociatePole:false,//关联灯杆
                setLoraSensorProject:false,//传感器绑定项目
                SetUp:false,//设置按钮
            },
            serverurl:localStorage.serverurl, 
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            serialNumber:'',
            options:[],
            props:{
                value: 'modelId',
                label:'text',
                children: 'children'
            },
            value:'',
            //添加/编辑
            type:'0',
            options2:[],
            networkIdChangeData:{},
            networkType:'',
            options3:[],
            referencePosition:'',
            data:{
                nickName:'',
                serialNumber:'',
                modelId:[],
                serviceProfileId:'',
                networkId:'',
                devAddr:'',
                nwksKey:'',
                appsKey:'',
                applicationKey:'',
                location:'',
                coord:'',
                remark:'',
            },
            //绑定灯杆页面
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10,
            //绑定项目
            options3:[],
            value3:'',
        }
    },
    mounted(){
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
        //添加,编辑 按钮
        addloraSensor(val){
            if(val=='0'){
                this.type = '0';
                this.serviceProfile();
                this.network();
                this.data.nickName = ''
                this.data.serialNumber = ''
                this.data.modelId = []
                this.data.serviceProfileId = ''
                this.data.networkId = ''
                this.data.devAddr = ''
                this.data.nwksKey = ''
                this.data.appsKey = ''
                this.data.applicationKey = ''
                this.data.location = ''
                this.data.remark = ''
                this.networkType = ''
                this.data.coord = ''
                this.referencePosition = ''
                this.site2 = []
                $('#myModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个传感器进行编辑!',
                        type: 'error'
                    });
                    return
                }
                this.type = '1';
                this.serviceProfile();
                this.network();
                this.data.nickName = this.site[0].nickName
                this.data.serialNumber = this.site[0].serialNumber
                this.data.modelId = []
                this.data.modelId.push(this.site[0].sensorsType)
                this.data.modelId.push(this.site[0].modelId)
                this.data.serviceProfileId = this.site[0].serviceProfileId
                this.data.networkId = this.site[0].networkId
                this.data.devAddr = this.site[0].devAddr
                this.data.nwksKey = this.site[0].nwksKey
                this.data.appsKey = this.site[0].appsKey
                this.data.applicationKey = this.site[0].applicationKey
                this.data.location = this.site[0].location
                this.data.remark = this.site[0].remark
                this.data.coord = this.site[0].coord
                this.referencePosition = this.site[0].coord
                $('#myModal').modal('show')
            }
        },
        //添加/编辑保存
        myModalSubmit(){
            var that = this;
            if(that.data.nickName==''||that.data.serialNumber==''||that.data.modelId.length==0||that.data.networkId==''||that.data.serviceProfileId==''){
                that.$message({
                    message: '必填数据不能为空!',
                    type: 'error'
                });
                retuen;
            }
            if(that.networkIdChangeData.name=='Device-profiles-abp'){
                if(that.data.devAddr==''||that.data.nwksKey==''||that.data.appsKey==''){
                    that.$message({
                        message: '必填数据不能为空!',
                        type: 'error'
                    });
                    retuen;
                }
            }
            if(that.networkIdChangeData.name=='Device-profiles-otaa'){
                if(that.data.applicationKey==''){
                    that.$message({
                        message: '必填数据不能为空!',
                        type: 'error'
                    });
                    retuen;
                }
            }
            var data= {}
            var type = ''
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id=that.site[0].id}
            data.nickName = that.data.nickName
            data.serialNumber = that.data.serialNumber
            data.modelId = that.data.modelId[1]
            data.serviceProfileId = that.data.serviceProfileId
            data.networkId = that.data.networkId
            data.devAddr = that.data.devAddr
            data.nwksKey = that.data.nwksKey
            data.appsKey = that.data.appsKey
            data.applicationKey = that.data.applicationKey
            data.location = that.data.location
            data.remark = that.data.remark
            data.projectId = sessionStorage.projectId
            data.coord = that.data.coord
            if(that.site2.length==0){
                if(that.type=='0'){
                    data.poleId='0'
                }else{
                    data.poleId=that.site[0].poleId
                }
            }else{
                data.poleId = that.site2[0].id
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/sensor',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#myModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击删除按钮
        deletloraSensor(){
            var that = this;
            if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个传感器进行删除!',
                        type: 'error'
                    });
                    retuen;
                }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选传感器？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'delete',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lora/sensor/'+arr.join(','),
                    contentType:'application/json;charset=UTF-8',
                    data:{},
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
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
                        if(that.type=='1'){
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
        //点击绑定项目
        loraSensorBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择传感器进行绑定项目!',
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
                        that.options3 = data.result.projects
                        that.value3 = ''
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
                url:that.serverurl+'/v1/solin/lora/device/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    loraSensors:arr,
                    projectId:that.value3
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
        //请求服务配置方式
        serviceProfile(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/sensor/service',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.serviceProfile
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求入网方式
        network(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/sensor/network',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.network
                        setTimeout(function(){
                            if(that.type=='1'){
                                var length=''
                                for(var i = 0;i<that.options2.length;i++){
                                    if(that.site[0].networkId!=that.options2[i].id){
                                        length++
                                    }
                                }
                                if(length==that.options2.length){
                                    that.data.networkId = ''
                                }else{
                                    that.networkIdChange(that.site[0].networkId)
                                }
                            }
                        },50)
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //入网方式change
        networkIdChange(val){
            this.networkIdChangeData = {} 
            for(var i = 0;i<this.options2.length;i++){
                if(val==this.options2[i].id){
                    this.networkIdChangeData = this.options2[i]
                }
            }
            if(this.networkIdChangeData.name!=undefined){
                if(this.networkIdChangeData.name.toLowerCase().indexOf('abp'.toLowerCase())!=-1){
                    this.networkType='0'
                }
                if(this.networkIdChangeData.name.toLowerCase().indexOf('otaa'.toLowerCase())!=-1){
                    this.networkType='1'
                }
            }
        },
        //请求lora传感器类型/型号
        modal(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/model',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求lora列表数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/sensor',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    serialNumber:that.serialNumber,
                    modelName:'',
                    online:'',
                    projectIds:sessionStorage.projectId,
                    sensorsType:that.value
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        SelectionChange(val){this.site = val;},
        currentchange(val){this.pageIndex = val;this.ready();},
        sizechange(val){this.pageSize = val;this.ready()},
        search(){this.ready();},
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
                            if(data.result.operats[i].code=='viewLoraSensorDeploy'){
                                that.JurisdictionS.viewLoraSensorDeploy = true
                            }
                            if(data.result.operats[i].code=='addLoraSensor'){
                                that.JurisdictionS.addLoraSensor = true
                            }
                            if(data.result.operats[i].code=='editLoraSensor'){
                                that.JurisdictionS.editLoraSensor = true
                            }
                            if(data.result.operats[i].code=='delLoraSensor'){
                                that.JurisdictionS.delLoraSensor = true
                            }
                            if(data.result.operats[i].code=='loraSensorAssociatePole'){
                                that.JurisdictionS.loraSensorAssociatePole = true
                            }
                            if(data.result.operats[i].code=='setLoraSensorProject'){
                                that.JurisdictionS.setLoraSensorProject = true
                                that.JurisdictionS.SetUp = true
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
        this.Jurisdiction()
        this.ready()
        this.modal()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.loraSensor{width: 100%;height: 100%;}
.loraSensor>div{width: 100%;position: absolute;}
.loraSensor_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.loraSensor_top>button,.loraSensor_top>div{height:33px;margin:8px 0 0 10px;}
.loraSensor_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.loraSensor_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
.block{text-align: center;}


.form_input{display:flex;justify-content: center;}
.form_input>label{width: 105px;line-height: 34px;text-align: center;}
.form_input>input{width: 196px;}
.mappoint{font-size: 24px;position: absolute;right: 110px;cursor: pointer;}

.map_Z{margin: 0;padding: 0;position: relative;}
.map_Z>div:nth-of-type(1){width: 100%;height: 30px;line-height: 30px;}
.map_Z>div:nth-of-type(2){width: 100%;position: absolute;top: 30px;bottom: 30px;}
.map_Z>div:nth-of-type(3){width: 100%;height: 30px;line-height: 30px;position: absolute;bottom: 1px;text-align: center;}
</style>

