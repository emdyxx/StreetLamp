<template>
    <div class="article">
        <!-- 项目 -->
        <div class="article_left">
            <div id="jstree"></div>
        </div>
        <div class="article_right">
            <div class="article_right_top">
                <el-button v-if="addProject" @click="addarticle(0)" type="primary" icon='el-icon-plus' size='small'>添加项目</el-button>
                <el-button v-if="editProject" @click="addarticle(1)" type="primary" icon="el-icon-edit" size='small'>编辑项目</el-button>
                <el-button v-if="delProject" @click="deletearticle" type="primary" icon='el-icon-delete' size='small'>删除项目</el-button>
                <div class="search" v-if="viewProject">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='项目名称';types='1';">项目名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='负责人';types='2';">负责人</el-dropdown-item>
                            <el-dropdown-item @click.native="name='归属机构';types='3';">归属机构</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <el-input v-model="projectName2" size="small" placeholder="请输入项目名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="types=='2'">
                            <el-input v-model="principal2" size="small" placeholder="请输入负责人" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="types=='3'">
                            <el-cascader
                            size='small'
                            style="margin-top:6px;width:126px"
                            :props='optionspros'
                            :options="options"
                            clearable
                            :change-on-select=true
                            :show-all-levels="false"
                            v-model="orgId2">
                        </el-cascader>
                        </template>
                    </div>
                    <div>
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="article_right_bottom">
                <!-- <div class="article_right_bottom_top">
                    <div class="search">
                        <label>项目名称:</label>
                        <input type="text" v-model="projectName2" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入项目名称">
                    </div>
                    <div class="search">
                        <label>负责人:</label>
                        <input type="text" v-model="principal2" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入负责人">
                    </div>
                    <div class="search">
                        <label>归属机构:</label>
                        <el-cascader
                            size='small'
                            style="margin-top:6px;width:126px"
                            :props='optionspros'
                            :options="options"
                            clearable
                            :change-on-select=true
                            :show-all-levels="false"
                            v-model="orgId2">
                        </el-cascader>
                    </div>
                    <div style="margin-left:15px;">
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div> -->
                <div class="article_right_bottom_bottom">
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
                        prop="projectName"
                        align='center'
                        label="项目名称"
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        prop="principal"
                        align='center'
                        label="负责人"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="所属机构"
                        min-width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.org.orgName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="区域"
                        min-width="250">
                            <template slot-scope="scope">
                                <span>{{scope.row.area.mergerName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="sceneName"
                        align='center'
                        label="场景"
                        min-width="80">
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
                        min-width="160"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        background
                        @size-change="articlesizechange"
                        @current-change="articlecurrentchange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加修改模态框 -->
        <div class="modal fade" id="addarticles" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加项目</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑项目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name"><span class="Required">*</span>项目名称:</label>
                            <input type="text" v-model="projectName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="name" placeholder="请输入项目名称">
                        </div> 
                        <div class="form-group">
                            <label for="name2"><span class="Required">*</span>负责人:</label>
                            <input type="text" v-model="principal" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="name2" placeholder="请输入负责人">
                        </div> 
                        <div class="form-group">
                            <label>所属机构:</label>
                            <el-cascader
                                :options="options"
                                v-model="value"
                                :props='optionspros'
                                size='small'
                                change-on-select
                                style='width:196px'>
                            </el-cascader>
                        </div> 
                        <div class="form-group">
                            <label>省:</label>
                            <el-select @change="provinceChange" v-model="value1" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>市:</label>
                            <el-select  @change="cityChange" v-model="value2" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>区/县:</label>
                            <el-select v-model="value3" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>场景:</label>
                            <el-select v-model="value4" size='small' clearable style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options4"
                                :key="item.id"
                                :label="item.sceneName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>地图类型:</label>
                            <el-select v-model="value5" @change="mapChange" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group" v-if="mapType">
                            <label><span class="Required">*</span>平面图:</label>
                            <div class="images">
                                <label for="img1">
                                    <img :src=imageUrl1>
                                    <input type="file" ref="img1" id="img1" @change="images(1)">
                                    <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;font-weight:600;"></i>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name2">备注:</label>
                            <el-input
                                type="textarea"
                                style="width:196px"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="mark">
                            </el-input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">确定</button>
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
            name:'项目名称',
            types:'1',
            serverurl:localStorage.serverurl,
            viewProject:false,
            addProject:false,
            editProject:false,
            delProject:false,
            sizeType:{id:0}, //点击树节点ID
            site:[],
            type:'0',//添加编辑判断
            projectName2:'',
            principal2:'',
            options4:[],
            orgId2:[],
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            projectName:'',//项目名称
            principal:'', //负责人
            mark:'', //备注
            options: [],
            value:[],
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
            options1: [],
            value1:'',
            options2: [],
            value2:'',
            options3: [],
            value3:'',
            options4:[],
            value4:'',
            detailsData:[],//项目详情
            options5:[
                {
                    name:'百度地图',
                    id:'1'
                },
                {
                    name:'平面图',
                    id:'0'
                }
            ], //地图类型
            value5:'1',
            imgurl:'',
            imageUrl1:'',
            mapType:false,
        }
    },
    mounted(){
        var that = this
        this.leftReady()
        that.OrgTree(0)
    },
    methods:{
        handleCommand(){
            this.projectName2=''
            this.principal2=''
            this.orgId2=[]
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
        // 图片转base64位
        imgPreview (file,val) {
            var that = this;
            // 看支持不支持FileReader
            if (!file || !window.FileReader) return;
    
            if (/^image/.test(file.type)) {
                // 创建一个reader
                var reader = new FileReader();
                // 将图片将转成 base64 格式
                reader.readAsDataURL(file);
                // 读取成功后的回调
                reader.onloadend = function () {
                    if(val=='1'){that.imageUrl1 = this.result;}
                }
            }
        },
        //省请求
        province(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/0',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options1 = data.result.areas
                        if(val=='1'){
                            that.value1 = that.detailsData.firstAreaId
                        }else{
                            that.value1 = data.result.areas[0].id
                        }
                        that.city(val)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        provinceChange(){
            this.city()
        },
        //获取市的信息
        city(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value1,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.areas
                        if(val=='1'){
                            that.value2 = that.detailsData.secondAreaId
                        }else{
                           that.value2 = data.result.areas[0].id 
                        }
                        that.area(val)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        cityChange(){
            this.area()
        },
        //获取区的信息
        area(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value2,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.areas
                        if(val=='1'){
                            that.value3 = that.detailsData.thirdAreaId
                        }else{
                            that.value3 = data.result.areas[0].id
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取场景信息
        scene(val){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/scene',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options4 = data.result.scenes
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取归属机构树
        OrgTree(val){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/orgs/tree',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result
                        if(that.type=='0'){
                            that.value.push(data.result[0].id)
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 点击添加编辑按钮
        addarticle(val){
            var that = this;
            this.type = val
            if(val=='0'){
                this.province(val)
                this.OrgTree(1)
                this.scene(0)
                that.projectName = ''
                that.principal = ''
                that.mark = ''
                if(that.value5=='0'){
                    var file = document.getElementById('img1');
                    file.value = '';
                    that.imageUrl1 = ''
                }
                $('#addarticles').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择一条数据进行编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                this.OrgTree(1)
                this.details()
                this.scene(1)
                if(that.value5=='0'){
                    var file = document.getElementById('img1');
                    file.value = '';
                }
                $('#addarticles').modal('show')
            }
            /* 完成拖拽 */
            $('#addarticles').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addarticles').css("overflow", "hidden")
        },
        //获取项目详情
        details(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/projects/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.detailsData = data.result;
                        that.value = that.detailsData.orgIds
                        that.projectName = that.detailsData.projectName
                        that.principal = that.detailsData.pricipal
                        that.mark = that.site[0].remark
                        if(that.detailsData.scene==null||that.detailsData.scene==undefined){
                            that.value4 = ''
                        }else{
                            that.value4 = that.detailsData.scene
                        }
                        that.value5 = String(that.detailsData.locationType)
                        that.imgurl = that.detailsData.planUrl
                        if(that.detailsData.planUrl==''){}else{
                            that.imageUrl1 = that.serverurl+that.detailsData.planUrl
                        }
                        that.mapChange()
                        that.province(that.type)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        mapChange(){
            var that = this;
            if(that.value5=='0'){
                that.mapType = true
            }else{
                that.mapType = false
            }
        },
        images(val){
            var that = this;
            var type = ''
            if(val=='1'){
                type = this.$refs.img1.files[0].name.split('.')
            }
            if(type[1]=='png'||type[1]=='PNG'||type[1]=='jpg'||type[1]=='JPG'||type[1]=='jpeg'){
                if(val=='1'){this.imgPreview(this.$refs.img1.files[0],1)} 
            }else{
                this.$message({
                    message: '图片格式错误',
                    type:'error',
                    showClose: true,
                });
                if(val==1){this.imageUrl1 = ''}
            }
        },
        //添加修改保存
        addSubmit(){
            var that = this;
            var url = '';
            var data = {}
            var type = ''
            var formdate = new FormData();
            if(that.projectName==''||that.principal==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(this.type=='0'){
                url='/v1/manage/projects'
                type = 'post'
                if(this.value5=='0'){
                    if(this.$refs.img1.files[0]==''||this.$refs.img1.files[0]==undefined){
                        that.$message({
                            message: '平面图片不能为空!',
                            type: 'error'
                        });
                        return;
                    }
                    formdate.append("planFile", this.$refs.img1.files[0])
                }
            }
            if(this.type=='1'){
                url='/v1/manage/projects/'+that.site[0].id
                type = 'put'
                if(this.value5=='0'){
                    if(that.imageUrl1==''||that.imageUrl1==undefined){
                        that.$message({
                            message: '平面图片不能为空!',
                            type: 'error'
                        });
                        return;
                    }
                    formdate.append("planFile", this.$refs.img1.files[0])
                    formdate.append("planUrl", this.imgurl)
                }
            }
            formdate.append("projectName",that.projectName)
            formdate.append("principal",that.principal)
            formdate.append("areaId",that.value3)
            formdate.append("orgId",that.value[that.value.length-1])
            formdate.append("remark",that.mark)
            formdate.append("scene",that.value4)
            formdate.append("locationType",that.value5)
            $.ajax({
                url:that.serverurl+url,
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
                    that.leftReady(0)
                    $('#addarticles').modal('hide')
                    $('#jstree').jstree('select_node',that.sizeType.id);
                }else{
                    that.errorCode(data)
                }
            })
        },
        //页面选中事件
        userSelectionChange(val){
            this.site = val
        },
        //删除项目
        deletearticle(){
            var that = this;
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个项目进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('是否删除所选项目？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'delete',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/manage/projects/'+that.site[0].id,
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            $('#jstree').jstree(true).refresh();
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
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
        //请求左侧区域树
        leftReady(val){
            var that = this;
            $('#jstree').jstree("destroy");
            $('#jstree').jstree({
                "types" : {
                    "1" : {
                        "icon" : that.serverurl+"/image/1.png",
                    },
                    "2" : {
                        "icon" : that.serverurl+"/image/2.png",
                    }
                },
                // "state" : { "key" : that.sizeType.text },
                "plugins" : ['types'],
                'core' : {
                    'data':function(obj,callback){
                        var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        $.ajax({
                            type:"GET",
                            url:that.serverurl+'/v1/manage/owner/areas/projects/tree',
                            dataType:"json",
                            async: false,
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    for(var i=0;i<data.result.length;i++){
                                        data.result[i].state={"opened" : true}
                                        if(data.result[i].children==undefined){}else{
                                            for(var j=0;j<data.result[i].children.length;j++){
                                                data.result[i].children[j].state={"opened" : true}
                                            }
                                        }
                                    }
                                    that.regitReady()
                                    var data2={"text" : "中国",'id':'0','type':'0',"state": {"opened" : true}}
                                    data2.children = data.result
                                    jsonarray= data2;
                                }else{
                                    that.errorCode
                                }
                            }
                        });
                        callback.call(this, jsonarray);
                    }
                }
            });
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    that.sizeType = data.node.original
                    // sessionStorage.organization_type = data.node.original.id
                    that.regitReady()
                }
            });
            if(val=='0'||val=='1'){
                setTimeout(function(){
                    var instance = $('#jstree').jstree(true); 
                    instance.deselect_all();
                    instance.select_node(that.sizeType.id);
                },400)
            }
        },
        //请求右侧基本数据
        regitReady(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects/areas/'+that.sizeType.id,
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    projectName:that.projectName2,
                    principal:that.principal2,
                    orgId:that.orgId2[this.orgId2.length-1]
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.projects
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        search(){
            this.regitReady()
        },
        //条数/页数变化
        articlesizechange(val){this.pageSize=val;this.regitReady();},
        articlecurrentchange(val){this.pageIndex=val;this.regitReady();},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId2,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewProject'){
                                that.viewProject = true
                            }
                            if(data.result.operats[i].code=='addProject'){
                                that.addProject = true
                            }
                            if(data.result.operats[i].code=='editProject'){
                                that.editProject = true
                            }
                            if(data.result.operats[i].code=='delProject'){
                                that.delProject = true
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
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.article{width: 100%;height: 100%;padding: 5px;}
.article_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.article_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.article_right>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.article_right_top{height: 46px;border-bottom: none !important;display: flex;}
.article_right_top>button{height:33px;margin:8px 0 0 10px;}
.article_right_bottom{top: 45px;bottom: 0;padding: 5px;overflow: auto;}
/* .article_right_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;} */
.article_right_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}

.images{text-align: center;position: relative;}
.images>label{width: 150px;height: 100px;border: 1px dashed #d9d9d9;border-radius: 6px; cursor: pointer;text-align: center;line-height: 35px;position: relative;}
.images img{width: 100%;height: 100%;position: absolute;left: 0;}
.images>label:hover{border-color: #20a0ff;}
.images>label>input{margin-left: -9999px;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 90px;line-height: 32px;text-align: center;}
.form-group>input{width: 196px;height: 32px;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>