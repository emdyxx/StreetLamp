<template>
    <div class="section">
        <div class="section_top">
            <el-button v-if="addProgram" @click="program(0)" type="primary" size='small'>创建简易节目</el-button>
            <el-button v-if="addProgram" @click="program(1)" type="primary" size='small'>创建高级节目</el-button>
            <el-button v-if="delProgram" @click="primary_delete" type="primary" size='small'>删除节目</el-button>
            <el-button @click="Backoff" style="position:absolute;right:20px;top:4px;" type="warning" icon="el-icon-arrow-left" size='small'>返回</el-button>
        </div>
        <div class="section_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="moviesTable" 
                border
                size='small'
                tooltip-effect="dark"
                style="width: 100%;overflow:auto;max-height:80%;margin-bottom:10px;"
                @selection-change='TableChange'>
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
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
                min-width="60">
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
                prop="createTime"
                show-overflow-tooltip
                label="创建时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                label="操作"
                min-width="180">
                    <template slot-scope="scope">
                        <el-button v-if="editProgram" @click="modifyProgram(scope.row)" type="primary" size='mini'>修改</el-button>
                        <el-button @click="Quick(scope.row)" type="primary" size='mini'>设为快捷任务</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                background
                @size-change="sizechange"
                @current-change="currentchange"
                :current-page="noticeIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="noticeSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Total">
                </el-pagination>
            </div>
        </div>
        <!-- 简易节目模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">创建节目</h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                        <el-input v-model="width" size='small' maxlength="10" style="width:256px;">
                            <template slot="prepend">宽</template>
                        </el-input>
                        <el-input v-model="height" size='small' maxlength="10" style="width:256px;margin-left:20px;">
                            <template slot="prepend">高</template>
                        </el-input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="SuremyModal(0)" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 高级节目模态框 -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">创建节目</h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                        <el-input v-model="width" size='small' maxlength="10" style="width:256px;">
                            <template slot="prepend">宽</template>
                        </el-input>
                        <el-input v-model="height" size='small' maxlength="10" style="width:256px;margin-left:20px;">
                            <template slot="prepend">高</template>
                        </el-input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="SuremyModal(1)" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'program',
    data () {
        return {
            addProgram:false,
            editProgram:false,
            delProgram:false,
            serverurl:localStorage.serverurl,
            tableData:[],
            site:[],
            noticeIndex:1,
            noticeSize:10,
            Total:10,
            width:'',
            height:'',
            type:'0',
            programType:'',
        }
    },
    mounted(){},
    methods:{
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        sizechange(val){this.noticeSize = val;this.ready();},
        currentchange(val){this.noticeIndex = val;this.ready();},
        TableChange(val){this.site = val},
        //请求节目列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program',
                data:{
                    page:that.noticeIndex,
                    size:that.noticeSize,
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
        //删除节目
        primary_delete(){
            var that = this
            if(that.site.length==0){
                that.$message({
                    message: '请选择节目进行删除!',
                    type: 'error'
                });
                return
            }
            var array = []
            var data = {}
            for(let i = 0;i<that.site.length;i++){
                array.push(that.site[i].id)
            }
            data.programs = array
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
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //创建简易/高级节目
        program(val){
            var that = this;
            that.type = '0';
            that.width = ''
            that.height = ''
            if(val=='0'){
                $('#myModal').modal('show')
            }else{
                $('#myModal2').modal('show')
            }
        },
        //点击确定创建简易/高级节目按钮
        SuremyModal(val){
            var that = this;
            console.log(that.width,that.height)
            var num = /^[+]{0,1}(\d+)$/
            if(num.test(that.width)==false||num.test(that.height)==false){
                that.$message({
                    message: '宽,高只能为数值!',
                    type: 'error'
                });
                return;
            }
            sessionStorage.width = that.width
            sessionStorage.height = that.height
            sessionStorage.programtype = that.type
            if(val=='0'){
                $('#myModal').modal('hide')
                that.$router.push({'path':'/programSimple'})
            }else{
                $('#myModal2').modal('hide')
                that.$router.push({'path':'/programSenior'})
            }
        },
        //点击修改节目进行跳转
        modifyProgram(val){
            var that = this;
            that.width = val.width;
            that.height = val.height;
            that.type = '1';
            sessionStorage.programId = val.id
            if(val.programType=='0'){
                $('#myModal').modal('show')
            }else{
                $('#myModal2').modal('show')
            }
        },
        //设为快捷节目
        Quick(val){
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task/shortcut',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    programId:val.id,
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
        },
        //返回
        Backoff(){
            this.$router.push({path:'solinScreenManage'})
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
                            if(data.result.operats[i].code=='addProgram'){
                                that.addProgram = true
                            }
                            if(data.result.operats[i].code=='editProgram'){
                                that.editProgram = true
                            }
                            if(data.result.operats[i].code=='delProgram'){
                                that.delProgram = true
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