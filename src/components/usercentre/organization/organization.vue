<template>
    <div class="organization">
        <!-- 机构 -->
        <div class="organization_left">
            <div id="jstree"></div>
        </div>
        <div class="organization_right">
            <div class="organization_right_top">
                <el-button v-if="addOrg" @click="addorganization(0)" type="primary" icon='el-icon-plus' size='small'>添加机构</el-button>
                <el-button v-if="editOrg" @click="addorganization(1)" type="primary" icon="el-icon-edit" size='small'>编辑机构</el-button>
                <el-button v-if="delOrg" @click="deleteorganization" type="primary" icon='el-icon-delete' size='small'>删除机构</el-button>
                <div class="search">
                        <el-dropdown size="small" split-button @command="handleCommand">
                            {{name}}
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="name='机构名称';types='1';">机构名称</el-dropdown-item>
                                <el-dropdown-item @click.native="name='负责人';types='2';">负责人</el-dropdown-item>
                                <el-dropdown-item @click.native="name='电话';types='3';">电话</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <div>
                            <template v-if="types=='1'">
                                <el-input v-model="orgName" size="small" placeholder="请输入机构名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                            </template>
                            <template v-if="types=='2'">
                                <el-input v-model="principal" size="small" placeholder="请输入负责人" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                            </template>
                            <template v-if="types=='3'">
                                <el-input v-model="mobile" size="small" placeholder="请输入电话" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                            </template>
                        </div>
                        <div>
                            <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                        </div>
                    </div>
            </div>
            <div class="organization_right_bottom">
                <!-- <div class="organization_right_bottom_top">
                    <div class="search">
                        <label>机构名称:</label>
                        <input type="text" v-model="orgName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入机构名称">
                    </div>
                    <div class="search">
                        <label>负责人:</label>
                        <input type="text" v-model="principal" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入负责人">
                    </div>
                    <div class="search">
                        <label>电话:</label>
                        <input type="text" v-model="mobile" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入电话">
                    </div>
                    <div style="margin-left:15px;">
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div> -->
                <div class="organization_right_bottom_bottom">
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
                        prop="orgName"
                        align='center'
                        label="机构名称"
                        min-width="160">
                        </el-table-column>
                        <el-table-column
                        prop="parentName"
                        align='center'
                        label="所属机构"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="principal"
                        align='center'
                        label="负责人"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        align='center'
                        label="电话"
                        min-width="130">
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
                        @size-change="organizationsizechange"
                        @current-change="organizationcurrentchange"
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
        <!--添加编辑模态框-->
        <div class="modal fade" id="addorganizations" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style='width:450px;'>
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加机构</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑机构</h4>
                    </div>  
                    <div class="modal-body">
                        <ul id="myTab" class="nav nav-tabs">
                            <li class="active">
                                <a href="#a" data-toggle="tab">基本信息</a>
                            </li>
                            <li>
                                <a href="#b" data-toggle="tab">管理员</a>
                            </li>
                            <li>
                                <a href="#c" data-toggle="tab">权限</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade in active" id="a" style='padding-left: 70px;'>
                                <div class="form-group">
                                    <label for="name"><span class="Required">*</span>机构名称:</label>
                                    <input type="text" v-model="data.orgName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入机构名称">
                                </div> 
                                <div class="form-group">
                                    <label for="password"><span class="Required">*</span>负责人:</label>
                                    <input type="text" v-model="data.principal" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入负责人">
                                </div> 
                                <div class="form-group">
                                    <label for="password2"><span class="Required">*</span>电话:</label>
                                    <input type="text" v-model="data.orgMobile" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                                </div> 
                                <div class="form-group">
                                    <label for="name2">邮箱:</label>
                                    <input type="email" v-model="data.email" class="form-control" placeholder="请输入邮箱">
                                </div> 
                                <div class="form-group" v-if="type=='0'">
                                    <label for="phone">所属机构:</label>
                                    <div class="block">
                                        <el-cascader
                                            :options="options"
                                            v-model="data.optionsValue"
                                            :props='optionspros'
                                            size='small'
                                            change-on-select
                                            style='width:196px'>
                                        </el-cascader>
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <label>背景图片:</label>
                                    <div class="images">
                                        <i @click="cancelImage(1)" class="iconfont icon-guanbi cancel"></i>
                                        <label for="img1">
                                            <img :src=imageUrl1>
                                            <input type="file" ref="img1" id="img1" @change="images(1)">
                                            <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;font-weight:600;"></i>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group"  v-if="type=='1'" style="justify-content: center;margin-left:-50px;">
                                    <el-button @click="Appoint" size='small' type="primary">指定机构管理员</el-button>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="b" style='padding-left: 70px;'>
                                <div class="form-group" v-if="type=='0'">
                                    <label for="name"><span class="Required">*</span>用户名:</label>
                                    <input type="text" v-model="data.userName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                                </div> 
                                <div class="form-group" v-if="type=='0'">
                                    <label for="username"><span class="Required">*</span>密码:</label>
                                    <input type="password" v-model="data.userPwd" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入密码">
                                </div> 
                                <div class="form-group">
                                    <label for="password"><span class="Required">*</span>姓名:</label>
                                    <input type="text" v-model="data.fullName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                                </div> 
                                <div class="form-group">
                                    <label for="password2"><span class="Required">*</span>电话:</label>
                                    <input type="text" v-model="data.userMobile" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                                </div> 
                                <div class="form-group">
                                    <label for="name2">邮箱:</label>
                                    <input type="email" v-model="data.userEmail" class="form-control" placeholder="请输入邮箱">
                                </div> 
                                <div class="form-group">
                                    <label for="phone">性别:</label>
                                    <template>
                                        <el-radio v-model="data.sex" label="0">男</el-radio>
                                        <el-radio v-model="data.sex" label="1">女</el-radio>
                                    </template>
                                </div> 
                                <div class="form-group">
                                    <label>头像:</label>
                                    <div class="images">
                                        <i @click="cancelImage(2)" class="iconfont icon-guanbi cancel"></i>
                                        <label for="img2">
                                            <img :src=imageUrl2>
                                            <input type="file" ref="img2" id="img2" @change="images(2)">
                                            <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;font-weight:600;"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="c">
                                <div>
                                    <template>
                                        <el-checkbox v-model="radio1" @change="radioChange">读取权限</el-checkbox>
                                        <el-checkbox v-model="radio2" @change="radioChange">操作权限</el-checkbox>
                                    </template>
                                </div>
                                <el-tree
                                :data="data2"
                                show-checkbox
                                accordion
                                :default-expanded-keys='[1]'
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps">
                                </el-tree>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addsubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <div class="modal fade" id="AppointModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style='width:500px;'>
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">指定管理员</h4>
                    </div>  
                    <div class="modal-body">
                        <i>默认选中第一个为有效管理员</i>
                        <el-table
                            :data="tableData2"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="AppointModalChange"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="fullName"
                            align='center'
                            label="姓名"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="mobile"
                            align='center'
                            label="电话"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="email"
                            label="邮箱"
                            align='center'
                            width='162'>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="Appointsizechange"
                            @current-change="Appointcurrentchange"
                            :current-page="AppointpageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="AppointpageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="Appointtotal">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addUsername" aria-hidden="true" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'user',
    data () {
        return {
            name:'机构名称',
            types:'1',
            serverurl:localStorage.serverurl,
            addOrg:false,
            editOrg:false,
            delOrg:false,
            activeName:'1',
            sizeType:{id:1}, //点击树节点ID
            detailsData:{},//机构详情
            detailsData2:{},//管理员详情
            site:[],
            type:'',//添加编辑类型
            orgName:'',
            principal:'',
            mobile:'',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            options:[],//所属组织数据
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
            data:{
                orgName:'',
                principal:'',
                orgMobile:'',
                email:'',
                optionsValue:[],

                userName:'',
                userPwd:'',
                fullName:'',
                userMobile:'',
                userEmail:'',
                sex:'1',
                icon:''
            },
            icon:'',
            icon1:'',
            userId:'',
            imageUrl1:'',
            imageUrl2:'',
            radio1:false,//权限类型
            radio2:false,
            data2:[],
            defaultProps:{
                children: 'children',
                label: 'text',
            },
            //用户列表
            tableData2:[],
            AppointSite:[],
            AppointpageIndex:1,
            AppointpageSize:10,
            Appointtotal:10,
        }
    },
    mounted(){
        var that = this
        //初始化左侧树
        this.readyLeft()
    },
    methods:{
        handleCommand(){
            this.orgName=''
            this.principal=''
            this.mobile=''
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        // 用户选中(进行修改,删除操作)
        userSelectionChange(val){
            this.site = val
        },
        //点击指定管理员
        Appoint(){
            $('#AppointModal').modal('show')
            this.user()
        },
        Appointsizechange(val){this.AppointpageSize = val;this.user();},
        Appointcurrentchange(val){this.AppointpageIndex = val;this.user();},
        //选中管理员change事件
        AppointModalChange(val){
            this.AppointSite = val
        },
        //选中管理员确定
        addUsername(){
            var that = this
            if(this.AppointSite.length>=2){
                this.$message({
                    message: '管理员只能指定一位!',
                    type: 'error'
                });
                return;
            }
            //获取当前选中管理员详细信息
            that.details2(this.AppointSite[0].id)
            that.detailsData.adminId = this.AppointSite[0].id
            $('#AppointModal').modal('hide')
        },
        //获取机构详细信息
        details(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/orgs/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.detailsData = data.result
                        that.details2(that.detailsData.adminId)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取用户详情
        details2(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/users/'+val,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.detailsData2 = data.result
                        setTimeout(function(){
                            that.data.fullName = data.result.baseInformation.fullName
                            that.data.userMobile = data.result.baseInformation.mobile
                            that.data.userEmail = data.result.baseInformation.email
                            that.data.sex = String(data.result.baseInformation.sex)
                            that.imageUrl2 = that.serverurl+data.result.baseInformation.icon
                            that.$refs.tree.setCheckedKeys(data.result.operationIds)
                            that.icon1 = data.result.baseInformation.icon
                            that.userId = data.result.baseInformation.id
                        },200)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 添加编辑机构
        addorganization(val){
            var that = this;
            // 0位添加 1为编辑
            this.type = val
            if(val=='0'){
                that.OrgTree(0);
                that.treetwo();
                this.data.orgName = '';
                this.data.principal = '';
                this.data.orgMobile = '';
                this.data.email = '';

                this.data.userName = '';
                this.data.userPwd = '';
                this.data.fullName = '';
                this.data.userMobile = '';
                this.data.userEmail = '';
                this.imageUrl1 = ''
                this.imageUrl2 = ''
                this.radio1 = false
                this.radio2 = false
                $('#addorganizations').modal('show');
                $('#myTab a:first').tab('show')
                var file = document.getElementById('img1');
                var file1 = document.getElementById('img2');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                file1.value = '';
                this.$refs.tree.setCheckedKeys([]);
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择一个机构进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.treetwo();
                this.details();
                $('#addorganizations').modal('show')
                $('#myTab a:first').tab('show')
                this.data.orgName = this.site[0].orgName
                this.data.principal = this.site[0].principal
                this.data.orgMobile = this.site[0].mobile
                this.data.email = this.site[0].email
                this.imageUrl1 = that.serverurl+this.site[0].backdrop
                this.icon = this.site[0].backdrop
                var file = document.getElementById('img1');
                var file1 = document.getElementById('img2');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
                file1.value = '';

                that.data.fullName = ''
                that.data.userMobile = ''
                that.data.userEmail = ''
                that.data.sex = ''
                that.imageUrl2 = ''
                that.icon1 = ''
                that.userId = ''
            }
            /* 完成拖拽 */
            $('#addorganizations').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addorganizations').css("overflow", "hidden")
        },
        //获取所有当前机构用户
        user(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/users/orgs/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.AppointpageIndex,
                    size:that.AppointpageSize, 
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.users
                    }else{
                        that.errorCode(data)
                    }
                }
            })
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
                    if(val=='2'){that.imageUrl2 = this.result;}
                }
            }
        },
        images(val){
            var type = ''
            if(val=='1'){
                type = this.$refs.img1.files[0].name.split('.')
            }
            if(val=='2'){
                type = this.$refs.img2.files[0].name.split('.')
            }
            if(type[1]=='png'||type[1]=='PNG'||type[1]=='jpg'||type[1]=='JPG'||type[1]=='jpeg'){
                if(val=='1'){this.imgPreview(this.$refs.img1.files[0],1)} 
                if(val=='2'){this.imgPreview(this.$refs.img2.files[0],2)}  
            }else{
                this.$message({
                    message: '图片格式错误',
                    type:'error',
                    showClose: true,
                });
                if(val==1){this.imageUrl1 = ''}
                if(val==2){this.imageUrl2 = ''}
            }
        },
        //取消图片
        cancelImage(val){
            if(val=='1'){
                this.imageUrl1='';
                this.icon=''
                var file = document.getElementById('img1');
                file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
            }
            if(val=='2'){
                this.imageUrl2='';
                this.icon1=''
                var file1 = document.getElementById('img2');
                file1.value = '';
            }
        },
        //获取所有机构
        OrgTree(val){
            var that = this;
            var url = ''
            var data = {};
            if(val=='0'){
                url='/v1/manage/owner/orgs/tree'
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result
                        if(val=='0'){
                            setTimeout(function(){
                                that.data.optionsValue=[data.result[0].id]   //所属机构
                            },200)
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取权限树
        treetwo(){
            var that = this;
            $.ajax({
                type: "GET",
                url:that.serverurl+'/v1/manage/owner/privilege',
                dataType:"json",
                async: false,
                data:{},
                success:function(data) {
                    if(data.errorCode=='0'){
                        that.data2= data.result;
                    }else{
                        that.errorCode
                    }
                }
            });
        },
        //权限类型改变
        radioChange(){
            var that = this;
            var arr = ''
            if(this.radio1==false&&this.radio2==false){
                that.$refs.tree.setCheckedKeys([])
                return;
            }
            if(this.radio1==true){
                arr='1'
            }
            if(this.radio2==true){
                arr='2'
            }
            if(this.radio1==true&&this.radio2==true){
                arr='3'
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/privilege/'+arr,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$refs.tree.setCheckedKeys(data.result.operatorIds);
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //添加/修改机构欧保存
        addsubmit(){
            var that=this;
            var formdate = new FormData();
            var url = ''
            var type = ''
            //手机号码验证
            var phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            //中文验证
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            //字母与数字组合
            var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if(this.data.orgName==''||this.data.principal==''||this.data.orgMobile==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(!phone.test(this.data.orgMobile)){
                that.$message({
                    message: '电话不符合格式',
                    type: 'error',
                    showClose: true,
                });
                return false;
            }
            if(this.type=='0'){
                url = '/v1/manage/orgs'
                type = 'post'
                if(this.data.userName==''||this.data.userPwd==''||this.data.fullName==''||this.data.userMobile==''){
                    this.$message({
                        message: '必填字段不能为空!',
                        type: 'error'
                    });
                    return;
                }
                if(result.test(this.data.userPwd)){
                    that.$message({
                        message: '密码字段不能有中文',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!phone.test(this.data.userMobile)){
                    that.$message({
                        message: '电话不符合格式',
                        type: 'error',
                        showClose: true,
                    });
                    return false;
                }
                if(!reg.test(this.data.userPwd)){
                    that.$message({
                        message: '密码字段必须为字母与数字组合',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
            }
            if(this.type=='1'){
                url = '/v1/manage/orgs/'+this.site[0].id
                type = 'put'
                // formdate.append("id", this.site[0].id)
                formdate.append("backdrop", that.icon)
                formdate.append("icon", that.icon1)
                if(this.AppointSite.length>=1){
                    formdate.append("userId", this.AppointSite[0].id)
                }else{
                    if(this.userId==''){}else{
                        formdate.append("userId", this.userId)
                    }
                }
            }
            formdate.append("backdropFile", this.$refs.img1.files[0])
            // formdate.append("file", this.$refs.img1.files[0])
            formdate.append("orgName", this.data.orgName)
            formdate.append("principal", this.data.principal)
            formdate.append("orgMobile", this.data.orgMobile)
            formdate.append("email", this.data.email)
            formdate.append("parentId", this.data.optionsValue[this.data.optionsValue.length-1])
            
            //权限数组
            var array = this.$refs.tree.getCheckedNodes()
            var arrar2 = [];
            for(let i=0;i<array.length;i++){
                if(array[i].type=='2'||array[i].type=='1'){
                    array.splice(i,1)
                    i--
                }
            }
            for(let i=0;i<array.length;i++){
                arrar2.push(array[i].id)
            }
            formdate.append("iconFile", this.$refs.img2.files[0])
            formdate.append("userName", this.data.userName)
            formdate.append("userPwd", md5(this.data.userPwd))
            formdate.append("mqttPassword", this.data.userPwd)
            formdate.append("fullName", this.data.fullName)
            formdate.append("userMobile", this.data.userMobile)
            formdate.append("userEmail", this.data.userEmail)
            formdate.append("sex", this.data.sex)
            formdate.append("operationIds", arrar2.join(','))
            $.ajax({
                url: that.serverurl+url,
                type: type,
                cache: false,
                data: formdate,
                dataType:'json',
                processData: false,
                contentType: false
            }).done(function(data){
                if(data.errorCode=='0'){
                    that.readyLeft(0)
                    that.$message({
                        message: '保存成功',
                        type:'success',
                        showClose: true,
                    });
                    that.imageUrl1 = ''
                    that.imageUrl2 = ''
                    $('#addorganizations').modal('hide')
                }else{
                    that.errorCode(data)
                }
            })
        },
        //删除机构
        deleteorganization(){
            var that = this;
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个机构进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('是否删除所选机构?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 这里进行删除请求
                $.ajax({
                    type:'delete',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/manage/orgs/'+that.site[0].id,
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            $('#jstree').jstree(true).refresh();
                            that.readyRight();
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
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //请求左侧树
        readyLeft(val){
            var that = this;
            $('#jstree').jstree("destroy");
            $('#jstree').jstree({
                "types" : {
                    "1" : {
                        "icon" : 'jstree_mechanism1',
                    },
                    "2" : {
                        "icon" : 'jstree_mechanism2',
                    },
                    "3" : {
                        "icon" : 'jstree_mechanism3',
                    },
                    "4" : {
                        "icon" : 'jstree_mechanism4',
                    },
                    "5" : {
                        "icon" : 'jstree_mechanism5',
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
                            url:that.serverurl+'/v1/manage/owner/orgs/tree',
                            dataType:"json",
                            async: false,
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    that.readyRight()
                                    var data2={"text" : "机构中心",'id':'1','type':'1',"state": {"opened" : true}}
                                    data2.children = data.result[0].children
                                    for(var i=0;i<data.result[0].children.length;i++){
                                        data.result[0].children[i].state={"opened" : true}
                                        if(data.result[0].children[i].children==undefined){}else{
                                            for(var j=0;j<data.result[0].children[i].children.length;j++){
                                                data.result[0].children[i].children[j].state={"opened" : true}
                                            }
                                        }
                                    }
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
                    that.readyRight()
                }
            });
            if(val=='0'){
                setTimeout(function(){
                    var instance = $('#jstree').jstree(true); 
                    instance.deselect_all();
                    instance.select_node(that.sizeType.id);
                },400)
            }
        },
        //请求右侧基本数据
        readyRight(){
            var that = this;
            if(that.sizeType.id=='0'){
                return
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/orgs/'+that.sizeType.id+'/all-orgs',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    orgName:that.orgName,
                    principal:that.principal,
                    mobile:that.mobile
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
        search(){this.readyRight()},
        //条数/页数变化
        organizationsizechange(val){this.pageSize=val;this.readyRight();},
        organizationcurrentchange(val){this.pageIndex=val;this.readyRight();},
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
                            if(data.result.operats[i].code=='addOrg'){
                                that.addOrg = true
                            }
                            if(data.result.operats[i].code=='editOrg'){
                                that.editOrg = true
                            }
                            if(data.result.operats[i].code=='delOrg'){
                                that.delOrg = true
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
.organization{width: 100%;height: 100%;padding: 5px;}
.organization_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.organization_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.organization_right>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.organization_right_top{height: 46px;border-bottom: none !important;display: flex;}
.organization_right_top>button{height:33px;margin:8px 0 0 10px;}
.organization_right_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
/* .organization_right_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;} */
.organization_right_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.organization_little{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;}
.organization_little>table{box-shadow: 0 0 3px gray;border-radius: 8px;}
.organization_little>table tr{width: 500px;}
.organization_little>table tr>td{width: 250px;height:50px;font-size: 18px;padding-left: 5px;font-weight: 600;}
.organization_little>table tr>td>i{font-size: 14px;color: #606266;}
.block{text-align: center;}
.images{text-align: center;position: relative;}
.images>label{width: 150px;height: 100px;border: 1px dashed #d9d9d9;border-radius: 6px; cursor: pointer;text-align: center;line-height: 35px;position: relative;}
.images img{width: 100%;height: 100%;position: absolute;left: 0;}
.images>label:hover{border-color: #20a0ff;}
.images>label>input{margin-left: -9999px;}
.cancel{position: absolute;top:-3px;right: -20px;font-size: 20px;}
.cancel:hover{color: #20a0ff;}

.form-group{display:flex;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>