<template>
    <!-- 巡检地点 -->
    <div class="InspectionSite">
        <div class="InspectionSite_top">
            <el-button v-if="addPatrolSite" @click="addInspectionSite(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editPatrolSite" @click="addInspectionSite(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="delPatrolSite" @click="addInspectionSite(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
        </div>
        <div class="InspectionSite_bottom">
            <div class="InspectionSite_bottom_top">
                <div class="search">
                    <label>点名称:</label>
                    <input v-model="siteName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入点名称">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="InspectionSite_bottom_bottom">
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
                    prop="siteNumber"
                    align='center'
                    label="点编号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="siteName"
                    align='center'
                    label="点名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="点状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.siteStatus=='1'">正常</span>
                            <span v-if="scope.row.siteStatus=='2'">异常</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="点类型"
                    min-width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.siteType=='1'">固定时间检查点</span>
                            <span v-if="scope.row.siteType=='2'">随机时间检查点</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="offsetDistance"
                    align='center'
                    label="有效巡检距离"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
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
        <!-- 添加  编辑  模态框 -->
        <div class="modal fade" id="addInspectionSite" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:690px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加巡检点</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑巡检点</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:500px;overflow:auto;'>
                        <ul id="myTab" class="nav nav-tabs">
                            <li class="active">
                                <a href="#a" data-toggle="tab">基本信息</a>
                            </li>
                            <li>
                                <a href="#b" data-toggle="tab">巡检项</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade in active" id="a" style='margin-top:10px;'>
                                <div class="form-group">
                                    <label><span class="Required">*</span>点名称:</label>
                                    <input v-model.lazy="data.siteName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入点名称">
                                </div>
                                <div class="form-group">
                                    <label><span class="Required">*</span>点编号:</label>
                                    <input v-model="data.siteNumber" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入点编号">
                                </div>
                                <div class="form-group">
                                    <label for="phone">点状态:</label>
                                    <el-radio-group v-model="data.siteStatus">
                                        <el-radio :label='1'>正常</el-radio>
                                        <el-radio :label="2">异常</el-radio>
                                    </el-radio-group>
                                </div> 
                                <div class="form-group">
                                    <label for="phone">点类型:</label>
                                    <el-radio-group v-model="data.siteType">
                                        <el-radio :label="1">固定时间检查点</el-radio>
                                        <el-radio :label="2">随机时间检查点</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="form-group">
                                    <label for="phone">是否记录位置:</label>
                                    <el-radio-group v-model="data.location">
                                        <el-radio :label="0">是</el-radio>
                                        <el-radio :label="1">否</el-radio>
                                    </el-radio-group>
                                </div>  
                                <div class="form-group">
                                    <label>有效巡检距离:</label>
                                    <input v-model="data.offsetDistance" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入有效巡检距离(米)">
                                </div>
                                <div class="form-group">
                                    <label>参考位置:</label>
                                    <input v-model='data.referencePosition' type="text" class="form-control" placeholder="请输入参考位置">
                                    <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                                </div>
                                <div class="form-group">
                                    <label>最少拍照数量:</label>
                                    <input v-model='data.minPhoto' type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入最少拍照数量">
                                </div>
                                <div class="form-group">
                                    <label>最多拍照数量:</label>
                                    <input v-model='data.maxPhoto' type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入最多拍照数量">
                                </div>
                                <div class="form-group">
                                    <label>点图片:</label>
                                    <div>
                                        <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            action=""
                                            :on-change="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            :auto-upload="false"
                                            list-type="picture">
                                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="b">
                                <div class="model_bottom" style="padding:5px;">
                                    <div class="term">
                                        <div>
                                            <div style="font-size: 14px;color: #606266;margin:2px 5px 10px 5px;">
                                                已关联巡检项:
                                                <el-button @click='leftDelete' type="primary" size="mini">移除</el-button>  
                                                <el-button @click="Move(0)" type="primary" icon="el-icon-arrow-down" size="mini"></el-button>  
                                                <el-button @click="Move(1)" type="primary" icon="el-icon-arrow-up" size="mini"></el-button>  
                                            </div>
                                            <div class="term_left_data">
                                                <el-table
                                                    :data="termData_left"
                                                    border
                                                    stripe
                                                    size='small'
                                                    tooltip-effect="dark"
                                                    @selection-change="leftChange"
                                                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                                    <el-table-column
                                                    type="selection"
                                                    align='center'
                                                    width="55">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="itemName"
                                                    align='center'
                                                    label="巡检项名称"
                                                    min-width="80">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="categoryName"
                                                    label="归属分类"
                                                    min-width="80"
                                                    align='center'
                                                    show-overflow-tooltip>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                        <div>
                                            <el-button @click='moveIn' type="primary" icon="el-icon-d-arrow-left" size="mini"></el-button>
                                        </div>
                                        <div>
                                            <div style="font-size: 14px;color: #606266;margin:2px 5px 10px 5px;display:flex;">
                                                未关联巡检项:
                                                <el-select v-model="value" @change="categoryChange" size="mini" clearable style="width:106px;height:24px;" placeholder="请选择">
                                                    <el-option
                                                    v-for="item in options"
                                                    :key="item.id"
                                                    :label="item.categoryName"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="term_left_data">
                                                <el-table
                                                    :data="termData_right"
                                                    border
                                                    stripe
                                                    size='small'
                                                    tooltip-effect="dark"
                                                    @selection-change="rightChange"
                                                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                                    <el-table-column
                                                    type="selection"
                                                    align='center'
                                                    width="55">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="itemName"
                                                    align='center'
                                                    label="巡检项名称"
                                                    min-width="80">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="categoryName"
                                                    label="归属分类"
                                                    min-width="80"
                                                    align='center'
                                                    show-overflow-tooltip>
                                                    </el-table-column>
                                                </el-table>
                                                <div class="block">
                                                    <el-pagination
                                                        small
                                                        background
                                                        @current-change="currentchange1"
                                                        :current-page="pageIndex2"
                                                        layout="prev, pager, next"
                                                        :total="total2">
                                                    </el-pagination>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="submitInspectionSite" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <div class="modal fade" id="map" tabindex="-1" role="dialog" style="margin-top:15%;" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-body map_Z" style='height:300px'>
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
    name: 'InspectionSite',
    data () {
        return {
            addPatrolSite:false,  
            editPatrolSite:false,
            delPatrolSite:false,
            serverurl:localStorage.serverurl,
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            siteName:'',
            referencePosition:'',//地图坐标
            data:{
                siteName:'',
                siteNumber:'',
                siteStatus:1,
                siteType:1,
                location:0,
                offsetDistance:'',
                referencePosition:'',
                minPhoto:'',
                maxPhoto:'',
            },
            fileList: [],
            addfile:[],//添加的图片
            deletefile:[],//删除的图片
            //巡检项
            termData_left:[],
            leftSize:[],
            termData_right:[],
            rightSize:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
            options:[],//巡检分类
            value:'',
            details:{},
        }
    },
    mounted(){
        
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){this.$refs.moviesTable.toggleRowSelection(row)},   
        //图片发生变化事件
        handleRemove(file, fileList) {
            if(this.type=='1'){
                if(file.id==''||file.id==undefined||file.id==null){

                }else{
                    this.deletefile.push(file)
                }
            }
        },
        handlePreview(file,fileList) {
            this.fileList = fileList
        },
        // 添加  编辑  删除巡检地点
        addInspectionSite(val){
            var that = this;
            if(val=='0'){
                that.type = '0'
                this.data.siteName = ''
                this.data.siteNumber = ''
                this.data.offsetDistance = ''
                this.data.referencePosition = ''
                this.data.minPhoto = ''
                this.data.maxPhoto = ''
                this.termData_left = []
                this.leftSize = []
                this.termData_right = []
                this.rightSize = []
                this.value = ''
                this.fileList = []
                this.categoryData()
                this.itemData()
                $('#addInspectionSite').modal('show')
            }
            if(val=='1'){
                that.type = '1'
                if(that.site.length==0){
                    that.$message({
                        message: '请选择单个巡检点进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                this.fileList = []
                this.addfile = []
                this.deletefile = []
                this.categoryData()
                this.itemData()
                this.spotData()
                $('#addInspectionSite').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择巡检点进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选巡检点？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/site/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            sites:arr
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
        //添加编辑保存
        submitInspectionSite(){
            var that = this;
            if(that.data.siteName==''||that.data.siteNumber==''){
                that.$message({
                    message: '必填数据不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.termData_left.length==0){
                that.$message({
                    message: '请选择巡检项!',
                    type: 'error'
                });
                return;
            }
            var array = []
            for(var j=0;j<that.termData_left.length;j++){
                array.push(that.termData_left[j].id)
            }
            var formdate = new FormData();
            var type = ''
            if(that.type=='0'){
                type='post';
                for(var i=0;i<that.fileList.length;i++){
                    formdate.append("siteImgList", that.fileList[i].raw)
                }
            }
            if(that.type=='1'){
                type='put';
                formdate.append("id", that.site[0].id)
                var del = []
                for(var i=0;i<that.fileList.length;i++){
                    if(that.fileList[i].id==''||that.fileList[i].id==undefined||that.fileList[i].id==null){
                        formdate.append("siteImgList", that.fileList[i].raw)
                    }
                }
                for(var j = 0;j<that.deletefile.length;j++){
                    del.push(that.deletefile[j].id)
                }
                formdate.append("delImages", del.join(','))
            }
            formdate.append("patrolItems", array.join(','))
            formdate.append("siteName", that.data.siteName)
            formdate.append("siteNumber", that.data.siteNumber)
            formdate.append("siteStatus", that.data.siteStatus)
            formdate.append("siteType", that.data.siteType)
            formdate.append("location", that.data.location)
            formdate.append("offsetDistance", that.data.offsetDistance)
            formdate.append("referencePosition", that.data.referencePosition)
            formdate.append("minPhoto", that.data.minPhoto)
            formdate.append("maxPhoto", that.data.maxPhoto)
            formdate.append("projectId", sessionStorage.projectId)
            $.ajax({
                url:that.serverurl+'/v1/solin/patrol/site',
                type:type,
                cache:false,
                data:formdate,
                dataType:'json',
                processData: false,
                contentType: false
            }).done(function(data){
                if(data.errorCode=='0'){
                    that.$message({
                        message: '保存成功',
                        type:'success',
                        showClose: true,
                    });
                    that.ready()
                    $('#addInspectionSite').modal('hide')
                }else{
                    that.errorCode(data)
                }
            })
        },
        //获取巡检点详细信息
        spotData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/site/information/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.details = data.result
                        if(that.type=='1'){
                            that.data.siteName = that.details.patrolSite.siteName
                            that.data.siteNumber = that.details.patrolSite.siteNumber
                            that.data.siteStatus = that.details.patrolSite.siteStatus
                            that.data.siteType = that.details.patrolSite.siteType
                            that.data.location = that.details.patrolSite.location
                            that.data.offsetDistance = that.details.patrolSite.offsetDistance
                            that.data.referencePosition = that.details.patrolSite.referencePosition
                            that.data.minPhoto = that.details.patrolSite.minPhoto
                            that.data.maxPhoto = that.details.patrolSite.maxPhoto
                            for(var i=0;i<that.details.patrolSiteImgList.length;i++){
                                that.details.patrolSiteImgList[i].name = that.details.patrolSiteImgList[i].imgName
                                that.details.patrolSiteImgList[i].url = that.serverurl+that.details.patrolSiteImgList[i].imgUrl
                            }
                            that.fileList = that.details.patrolSiteImgList
                            for(var i=0;i<that.details.patrolItemList.length;i++){
                                that.details.patrolItemList[i].id = that.details.patrolItemList[i].itemId
                                that.details.patrolItemList[i].categoryName = that.details.patrolItemList[i].itemCategoryName
                            }
                            that.termData_left = that.details.patrolItemList
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
            var map = new BMap.Map("allmap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(120.20,30.19), 12);  // 初始化地图,设置中心点坐标和地图级别
            map.addEventListener("click", function(e){
                map.clearOverlays();
                var point = new BMap.Point(e.point.lng,e.point.lat);
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);              // 将标注添加到地图中  
                that.referencePosition = e.point.lng+','+e.point.lat
            });
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        },
        //地图确定
        mapSubmit(){
            $('#map').modal('hide')
            this.data.referencePosition = this.referencePosition
        },
        //请求巡检类别
        categoryData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/category',
                contentType:'application/json;charset=UTF-8',
                data:{
                    categoryName:'',
                    projectIds:sessionStorage.projectId,
                    page:1,
                    size:100,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //类别change事件
        categoryChange(){this.itemData();},
        //请求巡检项
        itemData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/item',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    size:that.pageSize2,
                    itemName:'',
                    categoryId:that.value,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.termData_right = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        leftChange(val){this.leftSize = val;},
        rightChange(val){this.rightSize = val;},
        currentchange1(val){this.pageIndex2=val;this.itemData();},
        //像左移动
        moveIn(){
            if(this.rightSize.length==0){return;}
            if(this.termData_left.length==0){
                this.termData_left = this.rightSize
            }else{
                var type = false
                for(var i=0;i<this.rightSize.length;i++){
                    type = true
                    for(var j=0;j<this.termData_left.length;j++){
                        if(this.rightSize[i].id==this.termData_left[j].id){
                            type = false
                        }
                    }
                    if(type==true){
                        this.termData_left.push(this.rightSize[i])
                    }
                }
            }
        },
        //已关联巡检项  移动位置
        Move(val){
            if(this.leftSize.length>=2){
                this.$message({
                    message: '请选择单个巡检项进行操作!',
                    type: 'error'
                });
                return
            }
            var data = this.leftSize[0]
            var length = this.termData_left.length
            var index = ''
            //上移一级
            if(val=='1'){
                for(var i=0;i<length;i++){
                    if(this.termData_left[i].id==this.leftSize[0].id){
                        index = i
                    }
                }
                if(index==0){return}
                this.termData_left.splice(index,1)
                this.termData_left.splice(index-1,0,data)
            }
            //下移一级
            if(val=='0'){
                for(var i=0;i<length;i++){
                    if(this.termData_left[i].id==this.leftSize[0].id){
                        index = i
                    }
                }
                if(index==length-1){return}
                this.termData_left.splice(index,1)
                this.termData_left.splice(index+1,0,data)
            }
        },
        //移除
        leftDelete(){
            if(this.leftSize.length==0||this.termData_left.length==0){return;}
            var type = true
            for(var i=0;i<this.termData_left.length;i++){
                type = false
                for(var j=0;j<this.leftSize.length;j++){
                    if(this.termData_left[i].id==this.leftSize[j].id){
                        type = true
                    }
                }
                if(type==true){
                    this.termData_left.splice(i,1)
                    i--
                }
            }
        },
        //请求巡检点列表
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/site',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    siteName:that.siteName,
                    siteStatus:'',
                    siteNumber:'',
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
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        search(){this.ready()},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+41,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addPatrolSite'){
                                that.addPatrolSite = true
                            }
                            if(data.result.operats[i].code=='editPatrolSite'){
                                that.editPatrolSite = true
                            }
                            if(data.result.operats[i].code=='delPatrolSite'){
                                that.delPatrolSite = true
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
.block{text-align: center;}
.InspectionSite{width: 100%;height: 100%;}
.InspectionSite>div{width: 100%;position: absolute;}
.InspectionSite_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.InspectionSite_top>button{height:33px;margin:6px 0 0 10px;}
.InspectionSite_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.InspectionSite_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.InspectionSite_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: center;}
.form-group>input{width: 216px;}
.form-group>div{width: 216px;display: flex;justify-content: center;align-items: center;}

.term{width: 100%;height: 350px;display: flex;}

.term>div:nth-of-type(1){width: 45%;border:1px solid #E4E4F1;position: relative;}
.term>div:nth-of-type(2){width: 10%;display: flex;justify-content: center;align-items: center;}
.term>div:nth-of-type(3){width: 45%;border:1px solid #E4E4F1;position: relative;}
.term_left_data{width:100%;position: absolute;top:33px;bottom: 0;}

.mappoint{font-size: 24px;position: absolute;right: 150px;cursor: pointer;}
.map_Z{margin: 0;padding: 0;position: relative;}
.map_Z>div:nth-of-type(1){width: 100%;height: 30px;line-height: 30px;}
.map_Z>div:nth-of-type(2){width: 100%;position: absolute;top: 30px;bottom: 30px;}
.map_Z>div:nth-of-type(3){width: 100%;height: 30px;line-height: 30px;position: absolute;bottom: 1px;text-align: center;}
</style>
