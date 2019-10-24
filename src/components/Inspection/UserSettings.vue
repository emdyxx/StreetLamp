<template>
    <!-- 用户设置 -->
    <div class="section">
        <div class="section_top">
            <el-button @click="operationUserSettings(0)" v-if="JurisdictionS.addPatrolInspector" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="operationUserSettings(1)" v-if="JurisdictionS.editPatrolInspector" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="operationUserSettings(2)" v-if="JurisdictionS.delPatrolInspector" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <div class="search" v-if="JurisdictionS.viewPatrolInspector">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='姓名';types='1';">姓名</el-dropdown-item>
                        <el-dropdown-item @click.native="name='编号';types='2';">编号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='手机号';types='3';">手机号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="types=='1'">
                        <el-input v-model="inspectorName" size="small" placeholder="请输入姓名" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="types=='2'">
                        <el-input v-model="inspectorNumber" size="small" placeholder="请输入编号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="types=='3'">
                        <el-input v-model="mobile" size="small" placeholder="请输入手机号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="section_bottom">
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
                prop="inspectorName"
                align='center'
                label="姓名"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="sex"
                align='center'
                label="性别"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex=='0'">男</span>
                        <span v-if="scope.row.sex=='1'">女</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="inspectorNumber"
                align='center'
                label="编号"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align='center'
                label="手机号码"
                :formatter="formatRole"
                min-width="150">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                :formatter="formatRole"
                align='center'
                min-width="180"
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
        <!-- 添加  编辑用户  模态框 -->
        <div class="modal fade" id="addUserSettings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>手机号(账号):</label>
                            <input v-model="data.mobile" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入手机号码">
                        </div>
                        <div class="form-group" style='position:relative;'>
                            <label><span class="Required">*</span>密码:</label>
                            <input v-model="data.loginPwd" type="password" class="form-control password" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入密码">
                            <el-button @click="Password" type="warning" size="small" icon="el-icon-edit" circle style="position:absolute;right:20px;top:0;margin-top:0;"></el-button>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>确认密码:</label>
                            <input v-model="data.loginPwd2" type="password" class="form-control password" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入确认密码">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>巡检员姓名:</label>
                            <input v-model="data.inspectorName" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入巡检员姓名">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>巡检员编号:</label>
                            <input v-model="data.inspectorNumber" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入巡检员编号">
                        </div>
                        <div class="form-group">
                            <label>性别:</label>
                            <el-radio-group v-model="data.sex">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="form-group">
                            <label>类别:</label>
                            <el-radio-group v-model="data.inspectorType" style="margin-left:5px;">
                                <el-radio :label="1">普通巡检员</el-radio>
                                <el-radio :label="2" style="margin-left:0;">管理员</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="Submit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'UserSettings',
    data () {
        return {
            name:'姓名',
            types:'1',
            JurisdictionS:{
                viewPatrolInspector:false,//查看巡检员信息
                addPatrolInspector:false,//添加巡检员
                editPatrolInspector:false,//编辑巡检员
                delPatrolInspector:false,//删除巡检员
            },
            serverurl:localStorage.serverurl,
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            inspectorName:'',
            inspectorNumber:'',
            mobile:'',
            type:'0',
            //添加编辑参数
            data:{
                mobile:'',
                loginPwd:'',
                loginPwd2:'',
                inspectorName:'',
                inspectorNumber:'',
                sex:0,
                inspectorType:1,
            },
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.inspectorName=''
            this.inspectorNumber=''
            this.mobile=''
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
        //添加,编辑,删除用户
        operationUserSettings(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0'
                $('#addUserSettings').modal('show')
                that.data.mobile = ''
                that.data.loginPwd = ''
                that.data.loginPwd2 = ''
                that.data.inspectorName = ''
                that.data.inspectorNumber = ''
                that.data.sex = 0
                that.data.inspectorType = 1
            }
            if(val=='1'){
                that.type = '1'
                if(that.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择单个用户进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.data.mobile = that.site[0].mobile
                that.data.loginPwd = that.site[0].loginPwd
                that.data.loginPwd2 = that.site[0].loginPwd
                that.data.inspectorName = that.site[0].inspectorName
                that.data.inspectorNumber = that.site[0].inspectorNumber
                that.data.sex = Number(that.site[0].sex)
                that.data.inspectorType = Number(that.site[0].inspectorType)
                that.PasswordType = '0'
                $(".password").attr("disabled","disabled");
                $('#addUserSettings').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择用户进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选巡检员？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/inspector/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            inspectors:arr
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
        Password(){
            this.PasswordType = '1'
            $(".password").removeAttr("disabled");
            this.data.loginPwd = ''
            this.data.loginPwd2 = ''
        },
        //添加,编辑保存
        Submit(){
            var that = this;
            var type = ''
            var data = {}
            if(that.type=='0'){
                if(that.data.loginPwd!=that.data.loginPwd2){
                    that.$message({
                        message: '两次密码不一致!',
                        type: 'error'
                    });
                    return;
                }
                type='post';
                data.loginPwd = md5(that.data.loginPwd);
            }
            if(that.type=='1'){
                type='put';
                data.id = that.site[0].id;
                if(that.PasswordType=='1'){
                    if(that.data.loginPwd!=that.data.loginPwd2){
                        that.$message({
                            message: '两次密码不一致!',
                            type: 'error'
                        });
                        return;
                    }else{
                        data.loginPwd = md5(that.data.loginPwd);
                    }
                }else{
                   data.loginPwd = '' 
                }
            }
            data.mobile = that.data.mobile;
            data.inspectorName = that.data.inspectorName;
            data.inspectorNumber = that.data.inspectorNumber;
            data.sex = that.data.sex;
            data.inspectorType = that.data.inspectorType
            data.projectId = sessionStorage.projectId;
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/inspector',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#addUserSettings').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求列表数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/inspector',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    inspectorName:that.inspectorName,
                    inspectorNumber:that.inspectorNumber,
                    mobile:that.mobile,
                    projectIds:sessionStorage.projectId,
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
        search(){this.ready()},
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
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
                    // menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewPatrolInspector'){
                                that.JurisdictionS.viewPatrolInspector = true
                            }
                            if(data.result.operats[i].code=='addPatrolInspector'){
                                that.JurisdictionS.addPatrolInspector = true
                            }
                            if(data.result.operats[i].code=='editPatrolInspector'){
                                that.JurisdictionS.editPatrolInspector = true
                            }
                            if(data.result.operats[i].code=='delPatrolInspector'){
                                that.JurisdictionS.delPatrolInspector = true
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
.form-group>label{width: 95px;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
</style>