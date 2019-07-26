<template>
    <!-- 光照度 -->
    <div class="solinIlluminance_">
        <div class="solinIlluminance_top">
            <el-button @click="operation(0)" v-if="addIlluminance" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="operation(1)" v-if="editIlluminance" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="operation(2)" v-if="delIlluminance" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
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
                        <el-input v-model="concentratorSn" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
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
        </div>
        <div class="solinIlluminance_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="myModalmoviesTable"
                border
                stripe
                size='small'
                slot="empty"
                tooltip-effect="dark"
                @selection-change="myModalChange"
                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;margin-top:10px;">
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
                prop="lightNumber"
                align='center'
                label="序列号"
                min-width="100">
                </el-table-column>
                <el-table-column
                align='center'
                label="在线状态"
                min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="concentratorName"
                align='center'
                label="集中器"
                :formatter="formatRole"
                min-width="100">
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
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="创建时间"
                :formatter="formatRole"
                xshow-overflow-tooltip>
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
        <!-- 添加编辑模态框 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model="data.nickName" class="form-control" id="nickName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>序列号:</label>
                            <input type="text" v-model="data.lightNumber" class="form-control" maxlength="16" id="serialNumber" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>型号:</label>
                            <el-select v-model="data.modelId" size='small' style='width:195px;' placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>集中器:</label>
                            <el-select v-model="data.concentratorSn" clearable size='small' style='width:195px;' placeholder="请选择">
                                <el-option
                                    v-for="item in myModaltableData"
                                    :key="item.concentratorSn"
                                    :label="item.concentratorSn"
                                    :value="item.concentratorSn">
                                    <span style="float: left">{{ item.concentratorName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.concentratorSn }}</span>
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label>位置:</label>
                            <input type="text" v-model="data.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                style="width:195px"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="data.remark">
                            </el-input>
                        </div>
                        <div class="form-group">
                            <el-button @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="addSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div>
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
                            :formatter="formatRole"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            :formatter="formatRole"
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
    </div>
</template>
<script>
export default {
    name: 'solinIlluminance_',
    data () {
        return {
            addIlluminance:false,
            editIlluminance:false,
            delIlluminance:false,
            illuminanceAssociatePole:false,
            serverurl:localStorage.serverurl,
            name:'名称',
            type:'1',
            nickName:'',
            lightNumber:'',
            options:[
                {
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
                }
            ],
            value:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            addType:'',
            data:{
                nickName:'',
                lightNumber:'',
                modelId:'',
                concentratorSn:'',
                coord:'',
                remark:'',
            },
            referencePosition:'',
            options2:[],//型号
            myModaltableData:[],//集中器

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
            this.lightNumber=''
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
        //点击添加,编辑,删除
        operation(val){
            var that = this
            if(val=='0'){
                that.addType = '0'
                that.modalData()
                that.concentrator()
                that.data.nickName = ''
                that.data.lightNumber = ''
                that.data.modelId = ''
                that.data.concentratorSn = ''
                that.data.coord = ''
                that.data.remark = ''
                $('#addModal').modal('show')
            }
            if(val=='1'){
                if(that.site.length>=2){
                    that.$message({
                        message: '请选择单条信息进行编辑!',
                        type: 'error'
                    });
                    return; 
                }
                that.addType = '1'
                that.modalData()
                that.concentrator()
                setTimeout(function(){
                    that.data.nickName = that.site[0].nickName
                    that.data.lightNumber = that.site[0].lightNumber
                    that.data.modelId = that.site[0].modelId
                    that.data.concentratorSn = that.site[0].concentratorSn
                    that.data.coord = that.site[0].coord
                    that.data.remark = that.site[0].remark
                },50)
                $('#addModal').modal('show')
            }
            if(val=='2'){
                var arr = []
                if(this.site.length==0){
                    this.$message({
                        message: '请选择设备进行删除!',
                        type: 'warning'
                    });
                    return;
                }
                for(var i=0;i<this.site.length;i++){
                    arr.push(this.site[i].id)
                }
                that.$confirm('是否删除所选设备？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/lightSensors/device/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            lights:arr
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
        //添加,编辑保存
        addSubmit(){
            var that = this;
            if(that.data.nickName==''||that.data.lightNumber==''||that.data.modelId==''||that.data.concentratorSn==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return; 
            }
            var type = ''
            var data = {}
            data = that.data
            data.projectId = sessionStorage.projectId
            if(that.site2.length==0){
                if(that.addType=='0'){
                    data.poleId='0'
                }else{
                    data.poleId=that.site[0].poleId
                }
            }else{
                data.poleId = that.site2[0].id
            }
            if(that.addType == '0'){
                type='post'
            }
            if(that.addType == '1'){
                data.id = that.site[0].id
                type='put'
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lightSensors/device',
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
                url:that.serverurl+'/v1/solin/lightSensors/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    lightNumber:that.lightNumber,
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
        //请求型号
        modalData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lightSensors/model',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                       that.options2 = data.result.mapList
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求集中器
        concentrator(){
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
                       that.myModaltableData = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                }
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
                            console.log(that.site)
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
                            if(data.result.operats[i].code=='addIlluminance'){
                                that.addIlluminance = true
                            }
                            if(data.result.operats[i].code=='editIlluminance'){
                                that.editIlluminance = true
                            }
                            if(data.result.operats[i].code=='delIlluminance'){
                                that.delIlluminance = true
                            }
                            if(data.result.operats[i].code=='illuminanceAssociatePole'){
                                that.illuminanceAssociatePole = true
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
.Required{color: red;font-size: 17px;}
.solinIlluminance_{width: 100%;height: 100%;}
.solinIlluminance_>div{width: 100%;position: absolute;}
.solinIlluminance_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.solinIlluminance_top>button,.solinIlluminance_top>div{height:33px;margin:8px 0 0 10px;}
.solinIlluminance_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}
.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 195px;}
.mappoint{font-size: 24px;position: absolute;right: 110px;cursor: pointer;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}
.map_Z{margin: 0;padding: 0;position: relative;}
.map_Z>div:nth-of-type(1){width: 100%;height: 30px;line-height: 30px;}
.map_Z>div:nth-of-type(2){width: 100%;position: absolute;top: 30px;bottom: 30px;}
.map_Z>div:nth-of-type(3){width: 100%;height: 30px;line-height: 30px;position: absolute;bottom: 1px;text-align: center;}
</style>
