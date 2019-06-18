<template>
    <div class="concentrator">
        <!-- 集中器模式 -->
        <div class="concentrator_top">
            <el-button @click="myModalOperation(0)" type="primary" icon='el-icon-plus' size='small'>添加集中器</el-button>
            <el-button @click="myModalOperation(1)" type="primary" icon="el-icon-edit" size='small'>编辑集中器</el-button>
            <el-button @click="myModalOperation(2)" type="primary" icon='el-icon-delete' size='small'>删除集中器</el-button>
        </div>
        <div class="concentrator_bottom">
            <el-table
                :data="myModaltableData"
                @row-click="clickRow3" 
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
                prop="concentratorName"
                align='center'
                label="集中器名字"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="concentratorSn"
                align='center'
                label="集中器序列号"
                min-width="100">
                </el-table-column>
                <el-table-column
                align='center'
                label="集中器状态"
                min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
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
                @size-change="myModalsizechange"
                @current-change="myModalcurrentchange"
                :current-page="myModalpageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="myModalpageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="myModaltotal">
                </el-pagination>
            </div>
        </div>
        <!-- 集中器添加修改模态框 -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="myModal=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="myModal=='1'" class="modal-title" id="myModalLabel">修改</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label style="width:105px"><span class="Required">*</span>集中器名字:</label>
                            <input style="width:155px" type="text" v-model="myModaldata.concentratorName" class="form-control" id="serialNumber" placeholder="请输入集中器名字" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                        </div>
                        <div class="form-group" v-if="myModal=='0'">
                            <label style="width:105px"><span class="Required">*</span>集中器序列号:</label>
                            <input style="width:155px" type="text" v-model="myModaldata.concentratorSn" class="form-control" id="concentratorSN" placeholder="请输入集中器序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="myModalsave" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'concentrator',
    data () {
        return {
            serverurl:localStorage.serverurl,
            myModaltableData:[],
            myModalSite:[],
            myModalpageIndex:1,
            myModalpageSize:10,
            myModaltotal:10,
            myModal:'0',
            myModaldata:{
                concentratorName:'',
                concentratorSn:''
            }
        }
    },
    mounted(){
        // 
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow3(row){
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        //集中器管理添加,修改,删除
        myModalOperation(val){
            var that = this;
            if(val=='0'){
                that.myModal = '0'
                $('#myModal2').modal('show')
                that.myModaldata.concentratorName = ''
                that.myModaldata.concentratorSn = ''
            }
            if(val=='1'){
                if(that.myModalSite.length==0||that.myModalSite.length>1){
                    that.$message({
                        message: '请选择单条数据修改!',
                        type: 'error'
                    });
                    return;
                }
                that.myModal = '1'
                $('#myModal2').modal('show')
                that.myModaldata.concentratorName = that.myModalSite[0].concentratorName
                that.myModaldata.concentratorSn = that.myModalSite[0].concentratorSn
            }
            if(val=='2'){
                if(that.myModalSite.length==0){
                    that.$message({
                        message: '请选择数据进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i = 0;i<that.myModalSite.length;i++){
                    arr.push(that.myModalSite[i].id)
                }
                this.$confirm('是否删除所选灯具？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/concentrator/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            concentrators:arr
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
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            }
        },
        //集中器管理添加,修改保存
        myModalsave(){
            var that = this
            if(that.myModaldata.concentratorName==''||that.myModaldata.concentratorSn==''){
                that.$message({
                    message: '必填数据不能为空!',
                    type: 'error'
                });
                return;
            }
            var type = ''
            var url = ''
            var data = {}
            if(that.myModal == '0'){
                type = 'post' 
            }
            if(that.myModal == '1'){
                type = 'put'
                data.id = that.myModalSite[0].id
            }
            data.concentratorName = that.myModaldata.concentratorName
            data.concentratorSn = that.myModaldata.concentratorSn
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                       that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#myModal2').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击集中器管理
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.myModalpageIndex,
                    size:that.myModalpageSize,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                       that.myModaltableData = data.result.list
                       that.myModaltotal = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        myModalChange(val){this.myModalSite = val},
        myModalsizechange(val){this.myModalpageSize = val;this.ready();},
        myModalcurrentchange(val){this.myModalpageIndex = val;this.ready();},
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.concentrator{width: 100%;height: 100%;}
.concentrator>div{width: 100%;position: absolute;}
.concentrator_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.concentrator_top>button{height:33px;margin:8px 0 0 10px;}
.concentrator_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}


.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}

</style>