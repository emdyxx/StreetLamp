<template>
    <div class="advertisingscreen">
        <!-- 广告屏 -->
        <div class="advertisingscreen_top">
            <el-button @click="addadvertisingscreen(0)" type="primary" icon='el-icon-plus' size='small'>添加广告屏</el-button>
            <el-button @click="addadvertisingscreen(1)" type="primary" icon="el-icon-edit" size='small'>编辑广告屏</el-button>
            <el-button @click="deleteadvertisingscreen" type="primary" icon='el-icon-delete' size='small'>删除广告屏</el-button>
        </div>
        <div class="advertisingscreen_bottom">
            <el-table
                :data="tableData"
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
                prop="nickName"
                align='center'
                label="名称"
                width="80">
                </el-table-column>
                <el-table-column
                prop="width"
                align='center'
                label="宽度"
                width="80">
                </el-table-column>
                <el-table-column
                prop="height"
                align='center'
                label="高度"
                width="80">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="屏幕序列号"
                width="130">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="设备型号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="address"
                align='center'
                label="设备地址"
                width="80">
                </el-table-column>
                <el-table-column
                prop="remark"
                align='center'
                label="备注"
                width="180">
                </el-table-column>
                <el-table-column
                prop="ts"
                label="创建时间"
                align='center'
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                background
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 添加编辑模态框 -->
        <div class="modal fade" id="addModal" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加广告屏</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑广告屏</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>名称:</label>
                            <input type="text" v-model='form.nickName' class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>宽度:</label>
                            <input type="text" v-model='form.width' class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备地址">
                        </div> 
                        <div class="form-group">
                            <label>高度:</label>
                            <input type="text" v-model='form.height' class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备地址">
                        </div> 
                        <div class="form-group">
                            <label>设备型号:</label>
                            <input type="text" v-model='form.model' class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备型号">
                        </div> 
                        <div class="form-group">
                            <label>屏幕序列号:</label>
                            <input type="text" v-model="form.serialNumber" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备ID">
                        </div> 
                        <div class="form-group">
                            <label>设备地址:</label>
                            <input type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入设备地址">
                        </div> 
                        <div class="form-group">
                            <label>关联灯杆:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择关联灯杆">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                v-model='form.remark'
                                :rows="2"
                                style="width:196px;"
                                placeholder="请输入备注">
                            </el-input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="submit" class="btn btn-primary">确定</button>
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
            site:[], //列表数据选中  进行修改编辑操作
            addType:'0',  //添加编辑类型
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:50, 
            options:[
                {
                    value: 1,
                    label: '浙江',
                    children:[
                        {
                            value: 2,
                            label: '杭州',
                        },
                        {
                            value: 3,
                            label: '嘉兴',
                        },
                    ]
                }
            ],
            value:'',
            form:{
                nickName:'',
                width:'',
                height:'',
                model:'',
                serialNumber:'',
                remark:'',
            },
        }
    },
    mounted(){
        // 
    },
    methods:{
        // 列表数据change事件 进行编辑,删除操作
        userSelectionChange(val){
            this.site = val
        },
        //添加 编辑点击事件
        addadvertisingscreen(val){
            var that = this
            // 0为添加 1为删除
            this.addType = val
            if(val=='0'){
                that.form.nickName = ''
                that.form.width = ''
                that.form.height = ''
                that.form.model = ''
                that.form.serialNumber = ''
                that.form.remark = ''
                $('#addModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择一条数据进行编辑!',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }else{
                    that.form.nickName = that.site[0].nickName
                    that.form.width = that.site[0].width
                    that.form.height = that.site[0].height
                    that.form.model = that.site[0].model
                    that.form.serialNumber = that.site[0].serialNumber
                    that.form.remark = that.site[0].remark
                    $('#addModal').modal('show')
                }
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //删除广告屏
        deleteadvertisingscreen(){
            var that = this
            if(this.site.length==0||this.site.length>1){
                this.$message({
                    message: '请选择一个广告屏进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此广告屏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/screen/deleteScreen',
                    data:{
                        id:that.site[0].id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
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
        //获取列表信息
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/screen/getScreenList',
                // contentType:'application/json;charset=UTF-8',
                data:{
                   page:that.pageIndex,
                   rows:that.pageSize,
                   serialNumber:'',
                   status:''
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //添加修改广告屏提交
        submit(){
            var that = this
            var url = ''
            if(this.addType=='0'){
                url = '/screen/addScreen'
            }
            if(this.addType=='1'){
                url = '/screen/updateScreen'
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+url,
                data:that.form,
                success:function(data){
                    if(data.errorCode=='0'){
                        $('#addModal').modal('hide')
                        if(that.addType=='0'){
                            that.$message({
                                message: '添加成功',
                                type: 'success',
                                showClose: true,
                            });
                        }
                        if(that.addType=='1'){
                            that.$message({
                                message: '修改成功',
                                type: 'success',
                                showClose: true,
                            });
                        }
                        that.ready()
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
    },
    created(){
        var that = this
        that.ready()
    },
}
</script>
<style lang='less' scoped>
.advertisingscreen{width: 100%;height: 100%;}
.advertisingscreen>div{width: 100%;position: absolute;}
.advertisingscreen_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.advertisingscreen_top>button{height:33px;margin:8px 0 0 10px;}
.advertisingscreen_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow: auto;}
.block{text-align: center;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}
</style>