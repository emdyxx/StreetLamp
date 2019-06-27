<template>
    <div class="concentrator">
        <!-- 集中器模式 -->
        <div class="concentrator_top">
            <el-button @click="myModalOperation(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="myModalOperation(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="myModalOperation(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <div class="search">
                <el-dropdown size="small" split-button>
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type1='2';">序列号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type1=='1'">
                        <el-input v-model="concentratorName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='2'">
                        <el-input v-model="concentratorSn" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
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
                label="名称"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="concentratorSn"
                align='center'
                label="序列号"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop=""
                align='center'
                label="关联设备数量"
                :formatter="formatRole"
                min-width="100">
                    <!-- <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template> -->
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
                        <h4 v-if="myModal=='0'" class="modal-title" id="myModalLabel">添加集中器</h4>
                        <h4 v-if="myModal=='1'" class="modal-title" id="myModalLabel">修改集中器</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model="myModaldata.concentratorName" class="form-control" id="serialNumber" placeholder="请输入集中器名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                        </div>
                        <div class="form-group" v-if="myModal=='0'">
                            <label><span class="Required">*</span>序列号:</label>
                            <input type="text" v-model="myModaldata.concentratorSn" class="form-control" id="concentratorSN" placeholder="请输入集中器序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                        </div>
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="myModaldata.remark">
                            </el-input>
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
            name:'名称',
            type1:'1',
            concentratorName:'',
            concentratorSn:'',
            serverurl:localStorage.serverurl,
            myModaltableData:[],
            myModalSite:[],
            myModalpageIndex:1,
            myModalpageSize:10,
            myModaltotal:10,
            myModal:'0',
            myModaldata:{
                concentratorName:'',
                concentratorSn:'',
                remark:'',
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
                that.myModaldata.remark = ''
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
                that.myModaldata.remark = that.myModalSite[0].remark
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
            data.remark = that.myModaldata.remark
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
                    concentratorName:that.concentratorName,
                    concentratorSn:that.concentratorSn,
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
        search(){this.ready();},
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
.concentrator_top>button,.concentrator_top>div{height:33px;margin:8px 0 0 10px;}
.concentrator_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: center;}
.form-group>input,.form-group>div{width: 155px;}
</style>