<template>
    <!-- 摄像头 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备部署>摄像头管理</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewCameraDeploy">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='IP';type1='2';">IP</el-dropdown-item>
                            <el-dropdown-item @click.native="name='状态';type1='3';">状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="type1=='1'">
                            <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type1=='2'">
                            <el-input v-model="ipAddress" size="small" placeholder="请输入IP" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type1=='3'">
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
                    <el-button v-if="JurisdictionS.addCameraDeploy" @click="CameraDeploy(0)" type="primary" plain icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button v-if="JurisdictionS.delCameraDeploy" @click="CameraDeploy(2)" type="primary" plain icon='el-icon-delete' size='small'>删除</el-button>
                    <el-button v-if="JurisdictionS.setCameraProject" @click="BindProjectss" type="primary" plain size='small'>绑定项目</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="myModalmoviesTable"
                    border
                    size='small'
                    slot="empty"
                    tooltip-effect="dark"
                    @selection-change="myModalChange"
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
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="ipAddress"
                    show-overflow-tooltip
                    label="IP"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="状态"
                    min-width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="producerName"
                    show-overflow-tooltip
                    label="厂商"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="cameraNumber"
                    show-overflow-tooltip
                    label="编号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    show-overflow-tooltip
                    label="所属灯杆"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="创建时间"
                    :formatter="formatRole"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button v-if="JurisdictionS.editCameraDeploy" @click="CameraDeploy(1,scope.row)" type="primary" size='mini'>编辑</el-button>
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
        <!-- 添加编辑模态框 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加摄像头</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑摄像头</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名&emsp;&emsp;称:</label>
                            <input type="text" v-model='data.nickName' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>I&emsp;&emsp;&emsp;P:</label>
                            <input type="text" v-model='data.ipAddress' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入IP">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>厂&emsp;&emsp;商:</label>
                            <el-cascader
                            v-model="data.producerId"
                            size="small"
                            :props='props'
                            :options="options2"
                            style="width:196px;">
                            </el-cascader>
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>用&ensp;户&ensp;名:</label>
                            <input type="text" v-model='data.username' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>密&emsp;&emsp;码:</label>
                            <input type="password" v-model='data.userPwd' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入密码">
                        </div> 
                        <div class="form-group">
                            <label>编&emsp;&emsp;号:</label>
                            <input type="text" v-model='data.cameraNumber' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入编号">
                        </div> 
                        <div class="form-group">
                            <label>RTSP端口:</label>
                            <input type="text" v-model='data.rtspPort' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入RTSP端口">
                        </div> 
                        <div class="form-group">
                            <label>服务端口:</label>
                            <input type="text" v-model='data.serverPort' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入服务端口">
                        </div> 
                        <div class="form-group">
                            <label>位&emsp;&emsp;置:</label>
                            <input type="text" v-model="data.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>  
                        <div class="form-group">
                            <label>备&emsp;&emsp;注:</label>
                            <el-input
                                v-model="data.remark"
                                type="textarea"
                                :rows="1"
                                style="width:195px;"
                                placeholder="请输入备注">
                            </el-input>
                        </div>                                                                                             
                        <div class="form-group" v-if="addType=='0'">
                            <el-button @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="submit" type="button" class="btn btn-primary">确定</button>
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
        <!-- 绑定项目 -->
        <div class="modal fade" id="BindProjectsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                        <button type="button" @click="Submit_BindProjects" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'SolinCameraDeploy',
    data () {
        return {
            JurisdictionS:{
                viewCameraDeploy:false,//查看摄像头部署
                addCameraDeploy:false,//添加摄像头
                editCameraDeploy:false,//编辑摄像头
                delCameraDeploy:false,//删除摄像头
                setCameraProject:false,//摄像头绑定项目
                SetUp:false,//设置按钮
            },
            serverurl:localStorage.serverurl,
            name:'名称',
            type1:'1',
            nickName:'',
            ipAddress:'',
            options:[
                {
                    value:1,
                    label:'在线'
                },
                {
                    value:0,
                    label:'离线'
                }
            ],
            value:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            referencePosition:'',
            addType:'0',
            cameraSite:[],
            options2:[],
            props:{
                label:'text',
                value:'id',
                children:'children'
            },
            options3:[],
            value3:'',
            data:{
                nickName:'',
                ipAddress:'',
                producerId:[],
                username:'',
                userPwd:'',
                cameraNumber:'',
                rtspPort:'554',
                serverPort:'8000',
                coord:'',
                remark:'',
            },
            

            tableData2:[],
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
            this.ipAddress=''
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
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        //点击 添加/编辑/删除
        CameraDeploy(val,row){
            var that = this;
            if(val=='0'){
                this.addType='0'
                this.data.nickName = ''
                this.data.ipAddress = ''
                this.data.producerId = []
                this.data.username = ''
                this.data.userPwd = ''
                this.data.cameraNumber = ''
                this.data.rtspPort = '554'
                this.data.serverPort = '8000'
                this.data.coord = ''
                this.data.remark = ''
                this.referencePosition = ''
                this.site2 = []
                this.producer()
                $('#addModal').modal('show')
            }
            if(val=='1'){
                this.addType='1'
                this.producer()
                this.details(row)
                this.cameraSite = row
                $('#addModal').modal('show')
            }
            if(val=='2'){
                var arr = []
                if(this.site.length==0){
                    this.$message({
                        message: '请选择摄像头进行删除!',
                        type: 'warning'
                    });
                    return;
                }
                for(var i=0;i<this.site.length;i++){
                    arr.push(this.site[i].id)
                }
                that.$confirm('是否删除所选摄像头？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/camera/device/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            cameras:arr
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
        },
        //编辑获取详情
        details(row){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/information/'+row.id,
                contentType:'application/json;charset=UTF-8',
                data:{
                    
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.data.producerId = []
                        that.data.nickName = data.result.camera.nickName
                        that.data.ipAddress = data.result.camera.ipAddress
                        that.data.producerId.push(data.result.camera.producerName)
                        that.data.producerId.push(Number(data.result.camera.producerId))
                        that.data.username = data.result.camera.username
                        that.data.userPwd = data.result.camera.userPwd
                        that.data.cameraNumber = data.result.camera.cameraNumber
                        if(data.result.camera.rtspPort==null||data.result.camera.rtspPort==''){
                            that.data.rtspPort = '554'
                        }else{
                            that.data.rtspPort = data.result.camera.rtspPort
                        }
                        if(data.result.camera.serverPort==null||data.result.camera.serverPort==''){
                            that.data.serverPort = '8000'
                        }else{
                            that.data.serverPort = data.result.camera.serverPort
                        }
                        that.data.coord = data.result.camera.coord
                        that.referencePosition = data.result.camera.coord
                        that.data.remark = data.result.camera.remark
                        
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //添加  编辑  保存
        submit(){
            var that = this
            if(that.data.nickName==''||that.data.ipAddress==''||that.data.producerId.length==0){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.data.username==''||that.data.userPwd==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            var url = '/v1/solin/camera/device'
            var type = ''
            var data = {}
            data = JSON.parse(JSON.stringify(that.data))
            data.projectId = sessionStorage.projectId
            data.producerId = data.producerId[1]
            if(this.addType=='0'){
                type = 'post'
                if(this.site2.length==0){
                    data.poleId='0'
                }else{
                    data.poleId = this.site2[0].id
                }
            }
            if(this.addType=='1'){
                data.id = that.cameraSite.id
                data.poleId = that.cameraSite.poleId
                type = 'put'
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        $('#addModal').modal('hide')
                        if(that.addType=='0'){
                            that.$message({
                                message: '添加成功',
                                type: 'success',
                                showClose: true,
                            });
                        }
                        if(that.addType=='1'){
                            that.$message({
                                message: '编辑成功',
                                type: 'success',
                                showClose: true,
                            });
                        }
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //初始化列表数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    ipAddress:that.ipAddress,
                    online:that.value,
                    projectIds:sessionStorage.projectId,
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
        myModalChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready();},
        currentchange(val){this.pageIndex = val;this.ready();},
        search(){this.ready()},
        //请求设备厂商
        producer(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/producer',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.producers
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
                serialNumber:'',
                poleType:'',
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
                        if(that.addType=='1'){
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
            if(this.site2.length>=2||this.site2.length==0){
                this.$message({
                    message: '只能关联一个灯杆!',
                    type: 'warning'
                });
                return;
            }
            $('#LampPole_data').modal('hide')
        },
        //绑定项目
        BindProjectss(){
            var that = this;
            if(this.site.length==0){
                this.$message({
                    message: '请选择摄像头进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            that.value3 = Number(sessionStorage.projectId)
            $('#BindProjectsModal').modal('show')
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
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //绑定项目提交
        Submit_BindProjects(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    cameras:arr,
                    projectId:that.value3
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#BindProjectsModal').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
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
                            if(data.result.operats[i].code=='viewCameraDeploy'){
                                that.JurisdictionS.viewCameraDeploy = true
                            }
                            if(data.result.operats[i].code=='addCameraDeploy'){
                                that.JurisdictionS.addCameraDeploy = true
                            }
                            if(data.result.operats[i].code=='editCameraDeploy'){
                                that.JurisdictionS.editCameraDeploy = true
                            }
                            if(data.result.operats[i].code=='delCameraDeploy'){
                                that.JurisdictionS.delCameraDeploy = true
                            }
                            if(data.result.operats[i].code=='setCameraProject'){
                                that.JurisdictionS.setCameraProject = true
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
    },
}
</script>
<style scoped>

</style>