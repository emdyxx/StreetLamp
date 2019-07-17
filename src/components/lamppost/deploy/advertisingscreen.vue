<template>
    <div class="advertisingscreen">
        <!-- 广告屏 -->
        <div class="advertisingscreen_top">
            <el-button v-if="addScreenDeployment" @click="addadvertisingscreen(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editScreenDeployment" @click="addadvertisingscreen(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="delScreenDeployment" @click="deleteadvertisingscreen" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <el-dropdown size="small" split-button type="primary">
                <i class="el-icon-setting el-icon--left"></i>设置
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="screenBindProject" @click.native="screenBindProjectss">绑定项目</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='状态';type='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='3'">
                        <el-select v-model="value4" size='small' style="width:194px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options4"
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
        </div>
        <div class="advertisingscreen_bottom">
            <div class="advertisingscreen_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="userSelectionChange"
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
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="在线状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    align='center'
                    label="型号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="width"
                    align='center'
                    label="宽度(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="height"
                    align='center'
                    label="高度(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    align='center'
                    label="归属灯杆"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    align='center'
                    label="备注"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align='center'
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
        <!-- 添加编辑模态框 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加屏幕</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑屏幕</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model='form.nickName' class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>序列号:</label>
                            <input type="text" v-model="form.serialNumber" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>型号:</label>
                            <el-select v-model="form.modelId" size='small' style='width:195px;' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>屏宽(像素):</label>
                            <input type="text" v-model='form.width' class="form-control" maxlength="10" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入宽度">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>屏高(像素):</label>
                            <input type="text" v-model='form.height' class="form-control" maxlength="10" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入高度">
                        </div>
                        <div class="form-group">
                            <label>位置:</label>
                            <input type="text" v-model="form.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>  
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                v-model='form.remark'
                                :rows="2"
                                style="width:195px;"
                                placeholder="请输入备注">
                            </el-input>
                        </div>                                                                                             
                        <div class="form-group">
                            <el-button v-if="relationPole" @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="submit" class="btn btn-primary">确定</button>
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
                            prop="location"
                            align='center'
                            label="位置"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
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
        <div class="modal fade" id="screenBindProjectsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                        <button type="button" @click="Submit_screenBindProjects" class="btn btn-primary">确定</button>
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
            addScreenDeployment:false,
            editScreenDeployment:false,
            delScreenDeployment:false,
            relationPole:false,
            screenBindProject:false,
            projectId:sessionStorage.projectId,
            site:[], //列表数据选中  进行修改编辑操作
            addType:'0',  //添加编辑类型
            options5:[],
            value5:'',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            nickName:'',
            serialNumber:'',
            options4:[
                {
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
                }
            ],
            value4:'',
            options:[],
            value:'',
            referencePosition:'',
            form:{
                nickName:'',
                width:'',
                height:'',
                modelId:'',
                serialNumber:'',
                remark:'',
                brightness:'1',
                coord:'',
            },
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10,
        }
    },
    mounted(){
        // 
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
            this.value4=''
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
                if(that.form.coord!=''){
                    coord = that.form.coord
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
            this.form.coord = this.referencePosition
        },
        // 列表数据change事件 进行编辑,删除操作
        userSelectionChange(val){
            this.site = val
        },
        //获取型号列表
        ModelData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/model',
                contentType:'application/json;charset=UTF-8',
                data:{
                    modelType:'2'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.mapList
                        if(that.addType=='0'){
                            that.form.modelId = data.result.mapList[0].id
                        }
                        if(that.addType=='1'){
                            that.form.modelId = that.site[0].modelId
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //添加 编辑点击事件
        addadvertisingscreen(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            var that = this
            // 0为添加 1为编辑
            if(val=='0'){
                this.addType = val
                this.ModelData()
                that.form.nickName = ''
                that.form.width = ''
                that.form.height = ''
                that.form.serialNumber = ''
                that.form.remark = ''
                that.form.coord = ''
                this.referencePosition = ''
                $('#addModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择一条数据进行编辑!',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                this.addType = val
                this.ModelData()
                setTimeout(function(){
                    that.form.nickName = that.site[0].nickName
                    that.form.width = that.site[0].width
                    that.form.height = that.site[0].height
                    that.form.serialNumber = that.site[0].serialNumber
                    that.form.remark = that.site[0].remark
                    that.form.coord = that.site[0].coord
                },400)
                
                $('#addModal').modal('show')
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //删除广告屏
        deleteadvertisingscreen(){
            var that = this
            var arr = []
            if(this.site.length==0){
                this.$message({
                    message: '请选择屏幕进行删除!',
                    type: 'warning'
                });
                return;
            }
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            this.$confirm('是否删除所选屏幕？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/device/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        screens:arr
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
        //绑定项目
        screenBindProjectss(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择屏幕进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            $('#screenBindProjectsModal').modal('show')
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
        Submit_screenBindProjects(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    screens:arr,
                    projectId:that.value5
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#screenBindProjectsModal').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
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
        //获取列表信息
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   nickName:that.nickName,
                   serialNumber:that.serialNumber,
                   online:that.value4,
                   poleId:'',
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
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
        search(){
            this.ready()
        },
        //添加修改广告屏提交
        submit(){
            var that = this
            var url = ''
            var data = that.form
            var type = ''
            if(that.form.nickName==''||that.form.width==''||that.form.height==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.form.serialNumber==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(this.addType=='0'){
                url = '/v1/solin/screen/device'
                type = 'post'
            }
            if(this.addType=='1'){
                data.id = that.site[0].id
                data.status = that.site[0].status
                url = '/v1/solin/screen/device' 
                type = 'put'
            }
            data.projectId=sessionStorage.projectId
            data.coord = that.form.coord
            if(this.site2.length==''){
                if(this.addType=='0'){
                    data.poleId='0'
                }else{
                    data.poleId=that.site[0].poleId
                }
            }else{
                data.poleId = this.site2[0].id
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
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addScreen'){
                                that.addScreenDeployment = true
                            }
                            if(data.result.operats[i].code=='editScreen'){
                                that.editScreenDeployment = true
                            }
                            if(data.result.operats[i].code=='delScreen'){
                                that.delScreenDeployment = true
                            }
                            if(data.result.operats[i].code=='screenAssociatePole'){
                                that.relationPole = true
                            }
                            if(data.result.operats[i].code=='setScreenProject'){
                                that.screenBindProject = true
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
        var that = this
        that.ready()
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.advertisingscreen{width: 100%;height: 100%;}
.advertisingscreen>div{width: 100%;position: absolute;}
.advertisingscreen_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.advertisingscreen_top>button,.advertisingscreen_top>div{height:33px;margin:8px 0 0 10px;}
.advertisingscreen_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow: auto;}
.advertisingscreen_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 195px;}
.mappoint{font-size: 24px;position: absolute;right: 110px;cursor: pointer;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}

.map_Z{margin: 0;padding: 0;position: relative;}
.map_Z>div:nth-of-type(1){width: 100%;height: 30px;line-height: 30px;}
.map_Z>div:nth-of-type(2){width: 100%;position: absolute;top: 30px;bottom: 30px;}
.map_Z>div:nth-of-type(3){width: 100%;height: 30px;line-height: 30px;position: absolute;bottom: 1px;text-align: center;}
</style>