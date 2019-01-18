<template>
    <div class="program">
        <div class="program_top">
            <el-button @click="program(0)" type="primary" size='small'>创建简易节目</el-button>
            <el-button @click="program(1)" type="primary" size='small'>创建高级节目</el-button>
        </div>
        <div class="program_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="moviesTable" 
                border
                stripe
                size='small'
                tooltip-effect="dark"
                style="width: 100%;overflow:auto;max-height:80%;margin-bottom:10px;"
                @selection-change='TableChange'>
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="节目名称"
                min-width="150">
                </el-table-column>
                <el-table-column
                align='center'
                label="节目类型"
                min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.programType=='0'">简易节目</span>
                        <span v-if="scope.row.programType=='1'">高级节目</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="width"
                align='center'
                label="宽(像素)"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="height"
                align='center'
                label="高(像素)"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="创建时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                align='center'
                label="操作"
                min-width="200">
                    <template slot-scope="scope">
                        <el-button @click="modifyProgram(scope.row)" type="primary" size='small'>修改</el-button>
                        <el-button @click="primary_delete(scope.row.id)" type="primary" size='small'>删除</el-button>
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
                        <el-input v-model="width" size='small' style="width:256px;">
                            <template slot="prepend">宽</template>
                        </el-input>
                        <el-input v-model="height" size='small' style="width:256px;margin-left:20px;">
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
                        <el-input v-model="width" size='small' style="width:256px;">
                            <template slot="prepend">宽</template>
                        </el-input>
                        <el-input v-model="height" size='small' style="width:256px;margin-left:20px;">
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
            serverurl:localStorage.serverurl,
            tableData:[],
            noticeIndex:1,
            noticeSize:10,
            Total:10,
            width:'80',
            height:'160',
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
        TableChange(val){},
        //请求节目列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/program/getProgramList/'+that.noticeIndex+'/'+that.noticeSize,
                data:{
                //    pageNum:that.noticeIndex,
                //    pageSize:that.noticeSize,
                   programType:'',
                   nickName:'',
                   projectId:'1',
                //    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.Total = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //删除节目
        primary_delete(val){
            var that = this
            that.$confirm('是否删除所选节目？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/program/deleteProgram',
                    data:{
                        id:val
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            that.ready()
                        }else{
                            that.errorCode2(data.errorCode)
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
            if(val=='0'){
                $('#myModal').modal('show')
            }else{
                $('#myModal2').modal('show')
            }
        },
        //点击确定创建简易/高级节目按钮
        SuremyModal(val){
            var that = this;
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
            console.log(val);
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

    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>
.block{text-align: center;}
.program{width: 100%;height: 100%;padding: 5px;}
.program_top{width: 100%;height:46px;line-height:38px;padding-left:15px;border: 1px solid #cccccc;border-bottom: none;}
.program_bottom{position: absolute;top:46px;bottom:5px;left:5px;right:5px;border: 1px solid #cccccc;padding:5px;}
</style>