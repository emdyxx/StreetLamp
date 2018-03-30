<template>
    <div class="lampslanternstwo">
        <!-- 灯杆模式 -->
        <div class="lampslanternstwo_top">
            <el-button @click="addlampslanternstwo(0)" type="primary" icon='el-icon-plus' size='small'>添加灯杆</el-button>
            <el-button @click="addlampslanternstwo(1)" type="primary" icon="el-icon-edit" size='small'>编辑灯杆</el-button>
            <el-button @click="deletelampslanternstwo" type="primary" icon='el-icon-delete' size='small'>删除灯杆</el-button>
        </div>
        <div class="lampslanternstwo_bottom">
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
                label="启用"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="校检"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="灯杆"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="灯头号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="终端"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="输出通道"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="位置编号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="类目编号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="灯杆型号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="灯具型号"
                width="80">
                </el-table-column><el-table-column
                prop="name"
                align='center'
                label="终端型号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="date"
                label="启停时间"
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
        <!-- 添加编辑灯杆 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加灯杆</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑灯杆</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <el-radio v-model="radio1" label="0">使用终端 UID 作为灯杆名称</el-radio>
                        </div>
                        <div>
                            <el-radio  v-model="radio1" label="1">
                                灯杆(名称)从:<input type="text" class="form-control" style="width:50px;height:26px;display:inline-block;">
                                到<input type="text" class="form-control" style="width:50px;height:26px;display:inline-block;">
                                每次递增<input type="text" class="form-control" style="width:50px;height:26px;display:inline-block;">杆
                            </el-radio>
                        </div>
                        <div class="form-group">
                            <label>终端类型:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>终端型号:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>灯具型号:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>灯杆型号:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>终端输出:</label>
                            <el-select v-model="value" size='small' style="width:196px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>UID:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>经度:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>纬度:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
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
            site:[], //列表选中数据 进行编辑,删除操作
            addtype:'0', //判断是添加还是编辑的参数
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
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            radio1: '0', //模态框单选按钮
        }
    },
    mounted(){
        
    },
    methods:{
        // 点击添加还是编辑按钮
        addlampslanternstwo(val){
            // 0位添加 1为删除
            this.addtype = val
            $('#addModal').modal('show')
            if(val=='0'){}
            if(val=='1'){}
        },
        // 列表输出chang事件
        userSelectionChange(val){
            this.site = val
        },
        //删除按钮
        deletelampslanternstwo(){
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个灯杆进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此灯杆, 是否继续?', '提示', {
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
.lampslanternstwo{width: 100%;height: 100%;}
.lampslanternstwo>div{width: 100%;position: absolute;}
.lampslanternstwo_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.lampslanternstwo_top>button{height:33px;margin:8px 0 0 10px;}
.lampslanternstwo_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}


.modal-body>div{margin-bottom: 10px;text-align: center;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}
</style>