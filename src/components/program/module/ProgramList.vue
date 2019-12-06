<template>
    <!-- 节目管理 -->
    <div class="section">
        <div class="section_top">                       
            <p style="left:20px;">位置: &nbsp;设备操作>LED屏幕>节目制作>节目管理</p>
            <div>
                <span @click="ScreenManage">屏幕操作</span>
                <span style="background: #4382e6;color:white;">节目制作</span>
            </div>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="section_bottom_right" v-if="addProgram">
                    <el-button @click="addPrograms" size="small" icon='el-icon-plus' type="primary" plain>创建节目</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    size='small'
                    border
                    style="width: 100%;overflow:auto;max-height:90%;">
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="节目名称"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="节目类型"
                    min-width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.programType=='0'">简易节目</span>
                            <span v-if="scope.row.programType=='1'">高级节目</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="programSizeM"
                    show-overflow-tooltip
                    label="大小"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="width"
                    show-overflow-tooltip
                    label="宽(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="height"
                    show-overflow-tooltip
                    label="高(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="audit"
                    show-overflow-tooltip
                    label="审核状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.audit=='0'">未审核</span>
                            <span v-if="scope.row.audit=='1'">审核中</span>
                            <span v-if="scope.row.audit=='2'" style="color:#4dd3c5">已通过</span>
                            <el-tooltip class="item" effect="dark" :content=scope.row.auditContent placement="top">
                                <span v-if="scope.row.audit=='3'" style="color:red;">未通过</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="创建时间"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="180">
                        <template slot-scope="scope">
                            <el-button v-if="editProgram" @click="EditPargram(scope.row)" type="primary" size="mini">编辑节目</el-button>
                            <el-dropdown size="mini" trigger="click" split-button type="primary">
                                更多
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="handleCommand(6,scope.row.id)">预览</el-dropdown-item>
                                    <el-dropdown-item v-if="delProgram" @click.native="handleCommand(1,scope.row.id)">删除节目</el-dropdown-item>
                                    <el-dropdown-item v-if="submitReview" @click.native="handleCommand(4,scope.row.id)">提交审核</el-dropdown-item>
                                    <el-dropdown-item v-if="review" @click.native="handleCommand(5,scope.row.id)">审核节目</el-dropdown-item>
                                    <el-dropdown-item v-if="shortcutTask" @click.native="handleCommand(3,scope.row.id)">生成任务</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                @size-change="sizechange"
                @current-change="currentchange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="750px">
            <span>
                <div class="ProgramSize" v-if="type=='0'">
                    <div @click="active='1'" :class="active == '1' ? 'StyleDiv' : ''">100 * 200</div>
                    <div @click="active='2'" :class="active == '2' ? 'StyleDiv' : ''">120 * 240</div>
                    <div @click="active='3'" :class="active == '3' ? 'StyleDiv' : ''">140 * 280</div>
                    <div @click="active='4'" :class="active == '4' ? 'StyleDiv' : ''">160 * 300</div>
                </div>
                <div class="ProgramBranch" v-if="type=='1'">
                    <div class="ProgramBranch01" @click="active2='1'" :class="active2 == '1' ? 'ProgramBranchStyle' : ''">{{widths}}*{{heights}}</div>
                    <div class="ProgramBranch02" @click="active2='2'" :class="active2 == '2' ? 'ProgramBranchStyle' : ''">
                        <div>{{widths}}*{{heights-20}}</div>
                        <div>文本框{{widths}}*20</div>
                    </div>
                    <div class="ProgramBranch03" @click="active2='3'" :class="active2 == '3' ? 'ProgramBranchStyle' : ''">
                        <div>{{widths}}*{{heights/2}}</div>
                        <div>{{widths}}*{{heights/2}}</div>
                    </div>
                    <div class="ProgramBranch04" @click="active2='4'" :class="active2 == '4' ? 'ProgramBranchStyle' : ''">
                        <div>{{widths}}*{{(heights-20)/2}}</div>
                        <div>{{widths}}*{{(heights-20)/2}}</div>
                        <div>文本框{{widths}}*20</div>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="type=='0'" @click="NextStep" type="primary">下 一 步</el-button>
                <el-button v-if="type=='1'" @click="ProgramSure" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <el-dialog
            title="重命名"
            :visible.sync="dialogVisible2"
            width="30%">
            <span>
                <el-input v-model='inputColumn' size="small" placeholder="请输入新名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog> -->
        <el-dialog
            title="节目审核"
            :visible.sync="dialogVisible3"
            width="350px">
            <span>
                <div>
                    <span style="margin-right: 20px;">审核意见:</span>
                    <el-radio v-model="radio" label="2">通过</el-radio>
                    <el-radio v-model="radio" label="3">不通过</el-radio>
                </div>
                <div v-if="radio=='3'" style="display:flex;margin-top:15px;">
                    <span style="width:45px;">原因:</span>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea"
                        size='small'>
                    </el-input>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ToExamineSubmit" type="primary" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <MyPreview v-show="show" v-on:close='close' v-bind:sendData=sendData ref="Intive"></MyPreview>
    </div>
</template>
<script>
import MyPreview from '../../assembly/ProgramPreview/Mypreview'
export default {
    name:'ProgramList',
    components: {
        //调用组件
        MyPreview,
    },
    data () {
        return {
            show:false,
            addProgram:false,
            editProgram:false,
            delProgram:false,
            shortcutTask:false,
            submitReview:false,
            review:false,
            serverurl:localStorage.serverurl,
            tableData:[],
            pageIndex:1,
            pageSize:10,
            Total:10,
            dialogVisible:false,
            title:'请选择屏幕尺寸',
            type:'0',
            active:'1',
            widths:'',
            heights:'',
            active2:'1',
            dialogVisible2:false,
            inputColumn:'',
            programId:"",
            dialogVisible3:false,
            radio:'2',
            textarea:'',
            sendData:{}
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
        close(){
            this.show = false
        },
        //编辑节目
        EditPargram(val){
            sessionStorage.width = val.width
            sessionStorage.height = val.height
            sessionStorage.programType = '1'
            sessionStorage.programId = val.id
            this.$router.push({path: '/Programming'})
        },
        //创建节目
        addPrograms(){
            this.title = '请选择屏幕尺寸';
            this.type = '0';
            this.active = '1'
            this.dialogVisible = true;
        },
        //下一步
        NextStep(){
            if(this.active==''){
                this.$message({
                    message: '请选择屏幕尺寸!',
                    type: 'error'
                });
                return
            }
            if(this.active==1){this.widths='100';this.heights='200';}
            if(this.active==2){this.widths='120';this.heights='240';}
            if(this.active==3){this.widths='140';this.heights='280';}
            if(this.active==4){this.widths='160';this.heights='300';}
            this.title = '请选择分屏方式';
            this.type = '1';
            this.active2 = '1'
        },
        //确定
        ProgramSure(){
            if(this.active2==''){
                this.$message({
                    message: '请选择屏幕分屏!',
                    type: 'error'
                });
                return
            }
            sessionStorage.width = this.widths
            sessionStorage.height = this.heights
            sessionStorage.active2 = this.active2
            sessionStorage.programType = '0'
            this.$router.push({path:'Programming'})
        },
        //点击删除节目,重命名,生成任务,提交审核,审核节目,预览
        handleCommand(val,id){
            var that = this;
            that.programId = id
            if(val=='1'){
                var data = {}
                data.programs = [id]
                that.$confirm('是否删除所选节目？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/program/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
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
            if(val=='2'){
                this.dialogVisible2 = true;
                this.inputColumn = ''
            }
            if(val=='3'){
                that.$confirm('是否生成快捷任务？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/task/shortcut',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            programId:id,
                            projectId:sessionStorage.projectId
                        }),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '设置成功!',
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
                        message: '已取消'
                    });          
                });
            }
            if(val=='4'){
                that.$confirm('确认提交审核？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/program/sub?programId='+id,
                        contentType:'application/json;charset=UTF-8',
                        data:{},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '提交成功!',
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
                        message: '已取消'
                    });          
                });
            }
            if(val=='5'){
                that.dialogVisible3 = true
                that.radio = '2'
                that.textarea = ''
            }
            if(val=='6'){
                that.sendData = {
                    active2:'',
                    myArray01:[],
                    myArray02:[],
                    myArray03:{
                        text:''
                    }
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/program/information/'+id,
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            var active01 = ''
                            var active02 = ''
                            var active03 = ''
                            for(var i=0;i<data.result.list.length;i++){
                                if(data.result.list[i].layer=='1'){
                                    that.sendData.myArray01.push(data.result.list[i])
                                    active01='1'
                                }
                                if(data.result.list[i].layer=='2'){
                                    that.sendData.myArray02.push(data.result.list[i])
                                    active02='1'
                                }
                                if(data.result.list[i].layer=='3'){
                                    that.sendData.myArray03.text = data.result.list[i].textMsg
                                    active03='1'
                                }
                            }
                            if(active01=='1'&&active02==''&&active03==''){
                                that.sendData.active2 = '1'
                            }
                            if(active01=='1'&&active02==''&&active03=='1'){
                                that.sendData.active2 = '2'
                            }
                            if(active01=='1'&&active02=='1'&&active03==''){
                                that.sendData.active2 = '3'
                            }
                            if(active01=='1'&&active02=='1'&&active03=='1'){
                                that.sendData.active2 = '4'
                            }
                            
                            console.log(that.sendData.active2)
                            that.show = true
                            setTimeout(() => {
                                that.$refs.Intive.readyIntive();
                            }, 200);
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //审核节目提交
        ToExamineSubmit(){
            var that = this;
            if(that.radio=='3'){
                if(that.textarea==''){
                    this.$message({
                        message: '审核理由不能为空!',
                        type: 'error'
                    });
                    return
                }
            }
            var data = {}
            data.auditContent = that.textarea
            data.auditStatus = that.radio
            data.programId = that.programId
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program/audit',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '审核成功!',
                            type: 'success'
                        });
                        that.dialogVisible3 = false
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求节目列表
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    programType:'',
                    nickName:'',
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.Total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
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
                            for(var i=0;i<data.result.operats.length;i++){
                                if(data.result.operats[i].code=='addProgram'){
                                    that.addProgram = true
                                }
                                if(data.result.operats[i].code=='editProgram'){
                                    that.editProgram = true
                                }
                                if(data.result.operats[i].code=='delProgram'){
                                    that.delProgram = true
                                }
                                if(data.result.operats[i].code=='shortcutTask'){
                                    that.shortcutTask = true
                                }
                                if(data.result.operats[i].code=='submitReview'){
                                    that.submitReview = true
                                }
                                if(data.result.operats[i].code=='review'){
                                    that.review = true
                                }
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //屏幕--节目管理按钮
        ScreenManage(){
            this.$router.push({path:'/solinScreenManage'})
        },
    },
    created(){
        this.Jurisdiction()
        this.ready()
    }
}
</script>
<style scoped>
.ProgramList{width: 100%;height: 100%;}
.ProgramList_top{height: 50px;border-bottom: 1px solid #efefef;padding-left: 20px;display: flex;align-items: center;position: relative;}
.ProgramList_top>span{font-size: 18px;line-height: 70px;}
.operation{position: absolute;right: 15px;;height: 100%;line-height: 70px;}
.ProgramList_bottom{position: absolute;top: 55px;bottom: 5px;left: 5px;right: 5px;}

.ProgramSize{width: 100%;display: flex;}
.ProgramSize>div{width: 167px;height: 238px;box-sizing: border-box;margin: 0 15px 0 15px;border: 1px solid #b0b0b0;text-align: center;font-size: 14px;line-height: 238px;cursor: default;}
.ProgramSize>div>p{line-height:200px;height: 10px;font-size: 32px;}
.ProgramSize>div{line-height:238px;text-indent:1px;background:linear-gradient(58.5deg, transparent 49.5%, #b0b0b0, #b0b0b0, transparent 50.5%);}
.StyleDiv{color: #4dd3c5;border: 1px solid #4dd3c5 !important;background:linear-gradient(58.5deg, transparent 49.5%, #4dd3c5, #4dd3c5, transparent 50.5%) !important;}


.ProgramBranch{width: 100%;display: flex;}
.ProgramBranch>div{width: 167px;height: 238px;box-sizing: border-box;margin: 0 15px 0 15px;background:#f6f6f6;border: 1px solid #c0c0c0;cursor: default;font-size: 14px;position: relative;box-shadow: -0.5px 1px 3px gray;}
.ProgramBranch01,.ProgramBranch02>div,.ProgramBranch03>div,.ProgramBranch04>div{display: flex;justify-content: center;align-items: center;}
.ProgramBranch02>div:nth-of-type(1){border-bottom: 1px solid #c0c0c0;position: absolute;top: 0;bottom: 20px;left: 0;right: 0;}
.ProgramBranch02>div:nth-of-type(2){position: absolute;bottom: 0;left: 0;right: 0;}
.ProgramBranch03>div{width: 100%;height: 50%;}
.ProgramBranch03>div:nth-of-type(1){border-bottom: 1px solid #c0c0c0;}
.ProgramBranch04>div{width: 100%;}
.ProgramBranch04>div:nth-of-type(1){height: 109px;border-bottom: 1px solid #c0c0c0;}
.ProgramBranch04>div:nth-of-type(2){height: 109px;border-bottom: 1px solid #c0c0c0;}
.ProgramBranch04>div:nth-of-type(3){height: 20px;}
.ProgramBranchStyle{border: 1px solid #4dd3c5 !important;background: white !important;color: #4dd3c5;box-shadow: -0.5px 1px 3px #4dd3c5 !important;}
.ProgramBranchStyle>div{border-bottom: 1px solid #4dd3c5 !important; }
.ProgramBranch_input{margin-top: 30px;border-top: 1px solid #efefef;font-size: 16px;}
.ProgramBranch_input>p{margin: 15px 0 15px 0;}
.ProgramBranch_input>div{width: 196px;}
.ProgramBranch_input input{border:none !important;}
</style>
<style lang='less'>
.ProgramBranch_input{
    input{border-top:none !important;border-left:none !important;border-right:none !important;border-radius: 0;}
}
</style>
