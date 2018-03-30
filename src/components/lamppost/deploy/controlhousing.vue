<template>
    <div class="controlhousing">
        <!-- 控制柜模式 -->
        <div class="controlhousing_top">
            <el-button @click="addcontrolhousing(0)" type="primary" icon='el-icon-plus' size='small'>添加控制柜</el-button>
            <el-button @click="addcontrolhousing(1)" type="primary" icon="el-icon-edit" size='small'>编辑控制柜</el-button>
            <el-button @click="deletecontrolhousing" type="primary" icon='el-icon-delete' size='small'>删除控制柜</el-button>
            <el-button type="primary" icon='el-icon-setting' size='small'>管理灯具控制柜</el-button>
        </div>
        <div class="controlhousing_bottom">
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
                label="集中器"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="位置编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="类目编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="附加信息"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="电表"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="开关"
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
                label="灯具"
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
                label="模拟量"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="数字量"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="防盗"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="光照度"
                width="80">
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
        <!-- 添加编辑控制柜 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加控制柜</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑控制柜</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>控制柜数量:</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>集中器型号:</label>
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
                            <label>控制柜型号:</label>
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
                            <input type="text" class="form-control" id="phone" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>经度:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label>纬度:</label>
                            <input type="text" class="form-control" id="email" placeholder="请输入名称">
                        </div> 
                        <div class="modal_body_table">
                            <div>
                                <el-button icon="el-icon-plus" size='small' type="primary">添加设备</el-button>
                                <el-button icon="el-icon-delete" size='small' type="primary">删除设备</el-button>
                                <el-button size='small' type="success">生成默认设备</el-button>
                            </div>
                            <div>
                                <el-table
                                    :data="tableData"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    align='center'
                                    label="名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    align='center'
                                    label="类型"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="型号"
                                    align='center'
                                    show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </div>
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
            addtype:'0',  //判断添加还是编辑控制柜
            site:[], //列表选中数据
            tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
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
            value: ''
        }
    },
    mounted(){
        // 
    },
    methods:{
        // 点击添加编辑按钮
        addcontrolhousing(val){
            // 0为添加 1为编辑
            this.addtype = val
            $('#addModal').modal('show')
            if(val=='0'){}
            if(val=='1'){}
        },
        //设备选中chang事件 进行添加,编辑操作,
        userSelectionChange(val){
            this.site = val
        },
        //删除控制柜按钮
        deletecontrolhousing(){
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个控制柜进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此控制柜, 是否继续?', '提示', {
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
.controlhousing{width: 100%;height: 100%;}
.controlhousing>div{width: 100%;position: absolute;}
.controlhousing_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.controlhousing_top>button{height:33px;margin:8px 0 0 10px;}
.controlhousing_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}


.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}
</style>