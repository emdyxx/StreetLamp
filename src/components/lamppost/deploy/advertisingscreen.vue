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
                prop="name"
                align='center'
                label="区域"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="名称"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="网关UID"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="设备地址"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="型号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="备注"
                width="180">
                </el-table-column>
                <el-table-column
                prop="date"
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
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>设备型号:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>设备ID:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>设备地址:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:196px;"
                                placeholder="请输入内容"
                                v-model="textarea">
                            </el-input>
                        </div> 
                        <div class="form-group">
                            <label>关联灯杆:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
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
            tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            pageSize:10,
            pageIndex:1,
            total:50, 
            textarea:'', //弹框文本域
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
            // 0为添加 1为删除
            this.addType = val
            $('#addModal').modal('show')
            if(val=='0'){}
            if(val=='1'){}
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //删除广告屏
        deleteadvertisingscreen(){
            if(this.site.length=='0'||this.site.length>='2'){
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
                // 这里进行删除请求
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    },
    created(){
        
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