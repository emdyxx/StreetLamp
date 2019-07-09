<template>
    <div class="user">
        <!-- 用户 -->
        <div class="user-left">
            <div id="jstree"></div>
        </div>
        <div class="user-right">
            <div class="usermanage">
                <!-- 用户详细信息 -->
                <div class="usermanage_top">
                    <el-button v-if="addUser" @click="adduser(0)" type="primary" icon='el-icon-plus' size='small'>添加用户</el-button>
                    <el-button v-if="editUser" @click="adduser(1)" type="primary" icon="el-icon-edit" size='small'>编辑用户</el-button>
                    <el-button v-if="delUser" @click="deleteuser" type="primary" icon='el-icon-delete' size='small'>删除用户</el-button>
                </div>
                <div class="usermanage_bottom">
                    <div class="usermanage_bottom_top">
                        <div class="search">
                            <label>用户名:</label>
                            <input type="text" v-model="username" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                        </div>
                        <div class="search">
                            <label>姓名:</label>
                            <input type="text" v-model="fullname" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                        </div>
                        <div class="search">
                            <label>电话:</label>
                            <input type="text" v-model="mobile" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                        </div>
                        <div style="margin-left:15px;">
                            <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                        </div>
                    </div>
                    <div class="usermanage_bottom_bottom">
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
                            prop="username"
                            align='center'
                            label="用户名"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="fullName"
                            align='center'
                            label="用户姓名"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="userType"
                            align='center'
                            label="用户类型"
                            min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.userType=='0'">普通用户</span>
                                    <span v-if="scope.row.userType=='1'">管理员</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="mobile"
                            align='center'
                            label="电话"
                            min-width="150">
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="所属机构"
                            min-width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.org.orgName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="状态"
                            min-width="80"
                            v-if="enabledUser">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status=='0'">启用</span>
                                    <span v-if="scope.row.status=='1'">禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            align='center'
                            label="创建时间"
                            min-width="180">
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            min-width="180"
                            show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.status=='0'" @click="userStatus(scope.row.id,scope.row.status)" type="danger" size='mini'>禁用</el-button>
                                    <el-button v-if="scope.row.status=='1'" @click="userStatus(scope.row.id,scope.row.status)" type="primary" size='mini'>启用</el-button>
                                    <el-button v-if="resetPassword" @click="resetPasswords(scope.row.id)" type="primary" size='mini'>重置密码</el-button>
                                </template>
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
            </div>
        </div>
        <!-- 添加  修改  用户 -->
        <div class="modal fade" id="addedituser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加用户</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑用户</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <ul id="myTab" class="nav nav-tabs">
                            <li class="active">
                                <a href="#a" data-toggle="tab">基本信息</a>
                            </li>
                            <li>
                                <a href="#b" data-toggle="tab">用户权限</a>
                            </li>
                            <li>
                                <a href="#c" data-toggle="tab">项目设置</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade in active" id="a" style='padding-left: 70px;'>
                                <div class="form-group" v-if="type=='0'">
                                    <label for="username"><span class="Required">*</span>用户名:</label>
                                    <input type="text" v-model="data.username" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="username" placeholder="请输入用户名">
                                </div>
                                <div class="form-group" v-if="type=='0'">
                                    <label for="userPwd"><span class="Required">*</span>密码:</label>
                                    <input type="password" v-model="data.userPwd" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="userPwd" placeholder="请输入密码">
                                </div>
                                <div class="form-group">
                                    <label for="fullName"><span class="Required">*</span>用户姓名:</label>
                                    <input type="text" v-model="data.fullName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户姓名">
                                </div> 
                                <div class="form-group">
                                    <label for="mobile"><span class="Required">*</span>电话:</label>
                                    <input type="text" v-model="data.mobile" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="mobile" placeholder="请输入电话">
                                </div> 
                                <div class="form-group">
                                    <label for="email">邮箱:</label>
                                    <input type="email" v-model="data.email" class="form-control" id="email" placeholder="请输入邮箱">
                                </div> 
                                <div class="form-group">
                                    <label for="phone">性别:</label>
                                    <template>
                                        <el-radio v-model="data.sex" label="0">男</el-radio>
                                        <el-radio v-model="data.sex" label="1">女</el-radio>
                                    </template>
                                </div> 
                                <div class="form-group">
                                    <label for="phone">状态:</label>
                                    <el-select v-model="value" size='small' style="width:196px;" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div> 
                                <div class="form-group">
                                    <label for="phone"><span class="Required">*</span>所属机构:</label>
                                    <div class="block">
                                        <el-cascader
                                            :options="options1"
                                            v-model="options1Value"
                                            :props='optionspros'
                                            size='small'
                                            change-on-select
                                            style='width:196px'>
                                        </el-cascader>
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <label for="phone">头像:</label>
                                    <div class="images">
                                        <i @click="cancelImage()" class="iconfont icon-guanbi cancel"></i>
                                        <label for="img1">
                                            <img :src=imageUrl1>
                                            <input type="file" ref="img1" id="img1" @change="images(1)">
                                            <i class="el-icon-plus avatar-uploader-icon" style="font-size:20px;font-weight:600;"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="b">
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
                                    node-key="id"
                                    ref="tree"
                                    :default-expanded-keys="[1]"
                                    highlight-current
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                            <div class="tab-pane fade" id="c">
                                <div class="model_bottom" style="padding:5px;">
                                    <el-table
                                        :data="tableData2"
                                        ref='multipleTable'
                                        @row-click="clickRow2" 
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        @selection-change="userSelectionChange2"
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
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="principal"
                                        align='center'
                                        label="负责人"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        label="区域"
                                        width="152"
                                        align='center'
                                        show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span>{{scope.row.area.mergerName}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
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
            serverurl:localStorage.serverurl,
            addUser:false,
            editUser:false,
            delUser:false,
            enabledUser:false,
            resetPassword:false,
            sizeType:{id:1}, //点击树节点ID
            site:[],
            type:'0',//添加编辑判断
            username:'',
            fullname:'',
            mobile:'',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            data:{
                username:'',
                userPwd:'',
                fullName:'',
                mobile:'',
                email:'',
                sex:'1',
            },
            icon:'',
            tableData2:[],//项目数组
            site2:[],
            options:[{label:'启用',value:'0'},{label:'禁用',value:'1'}],//状态
            value:'0',
            options1:[],//所属机构
            options1Value:[],
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
            imageUrl1:'',
            detailsData:[],//用户详情
            data2:[],
            defaultProps:{
                children: 'children',
                label: 'text',
            },
            radio1:false,//权限类型
            radio2:false,
        }
    },
    mounted(){
        var that = this
        //初始化左侧树
        this.readyLeft()
    },
    methods:{
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },    
        clickRow2(row){
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        // 用户选中(进行修改,删除操作)
        userSelectionChange(val){
            this.site = val;
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
        images(val){
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
        //获取项目列表
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects',
                contentType:'application/json;charset=UTF-8',
                data:{
                    // page:that.pageIndex2,
                    // size:that.pageSize2
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        userSelectionChange2(val){this.site2 = val;},
        // sizechange2(val){this.pageSize2=val;this.project();},
        // currentchange2(val){this.pageIndex2=val;this.project();},
        //获取用户详情
        details(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/users/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.detailsData = data.result
                        that.data2= data.result.userPrivilege;
                        var arr = [];
                        for(var i=0;i<that.detailsData.projects.length;i++){
                            arr.push(that.detailsData.projects[i].project)
                        }
                        that.tableData2 = arr
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取所有机构
        mechanism(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/orgs/tree',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options1 = data.result
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
        // 添加修改用户
        adduser(val){
            var that = this;
            // val为0是添加  1为修改
            this.type = val
            if(val=='0'){
                this.treetwo()
                this.mechanism()
                this.project();
                $('#addedituser').modal('show')
                this.data.username=''
                this.data.userPwd=''
                this.data.fullName=''
                this.data.mobile=''
                this.data.email=''
                this.data.sex='1'
                this.value='0'
                this.options1Value=[1]
                this.imageUrl1=''
                var file = document.getElementById('img1');
                file.value = '';
                this.$refs.tree.setCheckedKeys([]);
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择一个用户进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                this.mechanism()
                this.details();
                $('#addedituser').modal('show')
                setTimeout(function(){
                    that.data.username = that.detailsData.baseInformation.username
                    that.data.userPwd = that.detailsData.baseInformation.userPwd
                    that.data.fullName = that.detailsData.baseInformation.fullName
                    that.data.mobile = that.detailsData.baseInformation.mobile
                    that.data.email = that.detailsData.baseInformation.email
                    that.data.sex = String(that.detailsData.baseInformation.sex)
                    that.value = String(that.detailsData.baseInformation.status)
                    that.options1Value = that.detailsData.orgIds
                    
                    that.imageUrl1 = that.serverurl+that.detailsData.baseInformation.icon
                    that.$refs.tree.setCheckedKeys(that.detailsData.operationIds);
                    var arr = [];
                    for(var i=0;i<that.detailsData.projects.length;i++){
                        if(that.detailsData.projects[i].checked=='1'){
                            arr.push(that.detailsData.projects[i].project)
                        }
                    }
                    setTimeout(function(){
                        arr.forEach(arrs => {
                            that.$refs.multipleTable.toggleRowSelection(arrs);
                        });
                        that.site2 = arr
                    },400)
                    that.icon = that.detailsData.baseInformation.icon
                    var file = document.getElementById('img1');
                    file.value = '';
                },400)
            }
            /* 完成拖拽 */
            $('#addedituser').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addedituser').css("overflow", "hidden")
        },
        //清除图片
        cancelImage(){
            this.imageUrl1=''
            this.icon = ''
            var file = document.getElementById('img1');
            file.value = '';
        },
        //添加/修改保存
        addSubmit(){
            var that = this;
            var url = '';
            var projectIds = [];
            var type = ''
            var formdate = new FormData();
            //中文验证
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            //手机号码验证
            var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[35784]\d{9}))$/;
            //字母与数字组合
            var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            for(var i=0;i<that.site2.length;i++){
                projectIds.push(that.site2[i].id)
            }
            var array = this.$refs.tree.getCheckedNodes()
            var arrar2 = [];
            for(let i=0;i<array.length;i++){
                if(array[i].type=='2'||array[i].type=='1'){
                    array.splice(i,1);
                    i--;
                }
            }
            for(let i=0;i<array.length;i++){
                arrar2.push(array[i].id)
            }
            if(this.type=='0'){
                url='/v1/manage/users';
                type = 'post'
                if(this.data.username==''||this.data.userPwd==''){
                    this.$message({
                        message: '必填字段不能为空!',
                        type: 'error'
                    });
                    return;
                }
                if(result.test(this.data.username)){
                    that.$message({
                        message: '用户名不能有中文',
                        type: 'error',
                        showClose: true,
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
                url='/v1/manage/users/'+that.site[0].id;
                type = 'put'
                formdate.append("icon",that.icon )
            }
            if(this.data.fullName==''||this.data.mobile==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(arrar2.length==0){
                this.$message({
                    message: '用户权限不能为空!',
                    type: 'error'
                });
                return;
            }
            if(!phone.test(this.data.mobile)){
                that.$message({
                    message: '电话不符合格式',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            if(that.options1Value.length==0||that.options1Value==''||that.options1Value==undefined||that.options1Value==null){
                that.$message({
                    message: '所属机构不能为空',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            formdate.append("username", this.data.username)
            formdate.append("userPwd", md5(this.data.userPwd))
            formdate.append("mqttPassword", this.data.userPwd)
            formdate.append("fullName", this.data.fullName)
            formdate.append("mobile", this.data.mobile)
            formdate.append("email", this.data.email)
            formdate.append("sex", this.data.sex)
            formdate.append("status", that.value)
            formdate.append("orgId", that.options1Value[that.options1Value.length-1])
            formdate.append("status", that.value)
            formdate.append("file", this.$refs.img1.files[0])
            formdate.append("projectIds",projectIds.join(','))
            formdate.append("operationIds",arrar2.join(','))
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
                    that.readyRight()
                    that.$message({
                        message: '保存成功',
                        type:'success',
                        showClose: true,
                    });
                    that.imageUrl1 = ''
                    $('#addedituser').modal('hide')
                }else{
                    that.errorCode(data)
                }
            })
        },
        //重置密码
        resetPasswords(val){
            var that = this;
            $.ajax({
                type:'put',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/users/'+val+'/password',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '重置密码成功',
                            type: 'success'
                        });
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //删除用户
        deleteuser(){
            var that = this
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个用户进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('是否删除所选用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 这里进行删除请求
                $.ajax({
                    type:'delete',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/manage/users/'+that.site[0].id,
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
                                    var data2={"text" : "用户中心",'id':'1','type':'1',"state": {"opened" : true}}
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
                                    that.errorCode(data)
                                }
                            }
                        });
                        callback.call(this, jsonarray);
                    },
                    
                }
            });
            
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                console.log(data.node);
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
                url:that.serverurl+'/v1/manage/orgs/'+that.sizeType.id+'/users/tree',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    username:that.username,
                    fullname:that.fullname,
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
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        //更改用户状态 启用/禁用
        userStatus(id,val){
            var that = this
            var status = ''
            var message = ''
            if(val=='0'){
                status='1'
                message='是否禁用该用户？'
            }
            if(val=='1'){
                status='0'
                message='是否启用该用户？'
            }
            this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'put',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/manage/users/'+id+'/status/'+status,
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.readyRight();
                            that.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消此操作'
                });          
            });
        },
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
                            if(data.result.operats[i].code=='addUser'){
                                that.addUser = true
                            }
                            if(data.result.operats[i].code=='editUser'){
                                that.editUser = true
                            }
                            if(data.result.operats[i].code=='delUser'){
                                that.delUser = true
                            }
                            if(data.result.operats[i].code=='enabledUser'){
                                that.enabledUser = true
                            }
                            if(data.result.operats[i].code=='resetPassword'){
                                that.resetPassword = true
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
        setTimeout(function(){
            that.Jurisdiction()
        },500)
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.user{width:100%;height: 100%;padding: 5px;display: flex;}
.user-left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.user-left>ul{background:#eef1f6;}
.user-right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.usermanage{width:100%;height:100%;}
.usermanage>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.usermanage_top{height: 46px;border-bottom: none !important;display: flex;}
.usermanage_top>button{height:33px;margin:6px 0 0 10px;}
.usermanage_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.usermanage_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.usermanage_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
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

.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>
