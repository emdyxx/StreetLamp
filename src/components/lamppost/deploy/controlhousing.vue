<template>
    <div class="controlhousing">
        <!-- 控制柜模式 -->
        <div class="controlhousing_top">
            <el-button @click="addcontrolhousing(0)" type="primary" icon='el-icon-plus' size='small'>添加控制柜</el-button>
            <el-button @click="addcontrolhousing(1)" type="primary" icon="el-icon-edit" size='small'>编辑控制柜</el-button>
            <el-button @click="deletecontrolhousing" type="primary" icon='el-icon-delete' size='small'>删除控制柜</el-button>
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
                align='center'
                label="灯杆"
                width="120">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                        <button @click="relevancelamppost" style="height:20px;line-height:15px;">...</button>
                    </template>
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
        <div class="modal fade" id="addModal" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加控制柜</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑控制柜</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>位置编号:</label>
                            <input type="text" class="form-control" id="name" placeholder="位置编号">
                        </div> 
                        <div class="form-group">
                            <label>类目编号:</label>
                            <input type="text" class="form-control" id="name" placeholder="类目编号">
                        </div> 
                        <div class="form-group">
                            <label>区域:</label>
                            <input type="text" class="form-control" id="name" placeholder="区域">
                        </div> 
                        <div class="form-group">
                            <label>附加信息:</label>
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
                        <div class="form-group">
                            <label>是否启用:</label>
                            <el-radio v-model="radio" label="1">是</el-radio>
                            <el-radio v-model="radio" label="2">否</el-radio>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联灯杆 -->
        <div class="modal fade" id="relevancelampposts" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button @click="relevancelamppoststwo" type="primary" size='small'>关联灯杆</el-button>
                            <el-button type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div>已关联灯杆:</div>
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
                            label="位置编号"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="创建时间"
                            align='center'
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联灯杆 -->
        <div class="modal fade" id="relevancelamppoststwo" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择灯杆进行关联</h4>
                    </div>
                    <div class="modal-body">
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
                            label="位置编号"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="创建时间"
                            align='center'
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确认</button>
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
            serverurl:localStorage.serverurl,
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
            value: '',
            radio:'1'
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
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
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
        //关联灯杆
        relevancelamppost(){
            $('#relevancelampposts').modal('show')
            /* 完成拖拽 */
            $('#relevancelampposts').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#relevancelampposts').css("overflow", "hidden")
        },
        //点击关联灯杆
        relevancelamppoststwo(){
            $('#relevancelamppoststwo').modal('show')
            /* 完成拖拽 */
            $('#relevancelamppoststwo').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#relevancelamppoststwo').css("overflow", "hidden")
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

</style>