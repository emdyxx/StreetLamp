<template>
    <div class="article">
        <!-- 项目 -->
        <div class="article_left">
            <div id="jstree"></div>
        </div>
        <div class="article_right">
            <div class="article_right_top">
                <el-button @click="addarticle(0)" type="primary" icon='el-icon-plus' size='small'>添加项目</el-button>
                <el-button @click="addarticle(1)" type="primary" icon="el-icon-edit" size='small'>编辑项目</el-button>
                <el-button @click="deletearticle" type="primary" icon='el-icon-delete' size='small'>删除项目</el-button>
            </div>
            <div class="article_right_bottom">
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
                    label="国家"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    align='center'
                    label="省份"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    align='center'
                    label="城市"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    align='center'
                    label="名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    align='center'
                    label="类型"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    align='center'
                    label="设备型号"
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
        </div>
        <!-- 添加修改模态框 -->
        <div class="modal fade" id="addarticles" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加项目</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑项目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" v-if="type=='0'">
                            <label>省:</label>
                            <el-select v-model="value" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group" v-if="type=='0'">
                            <label>市:</label>
                            <el-select v-model="value" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group" v-if="type=='0'">
                            <label>区/县:</label>
                            <el-select v-model="value" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>类型:</label>
                            <el-select v-model="value" size='small' style="width: 196px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label for="name">名称:</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label for="name">服务器:</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入名称">
                        </div>
                        <div class="form-group">
                            <label for="name">备注:</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入名称">
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
            site:[],
            type:'0',//添加编辑判断
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
            value: ''
        }
    },
    mounted(){
        var that = this
        $(function () {
            $('#jstree').jstree({
                'core' : {
                    'data' : [
                        {
                            "text" : "中国",
                            id:'1',
                            "state" : { "opened" : true },
                            "children" : [
                                {
                                    "text" : "浙江省",
                                    "icon" : "jstree-file",
                                    id:'2',
                                },
                                { 
                                    "text" : "河南省",
                                    "icon" : "jstree-file",
                                    id:'3',
                                },
                                { 
                                    "text" : "安徽省",
                                    "icon" : "jstree-file",
                                    id:'4',
                                }
                            ]
                        }
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            // console.log(data.node.id);
        });
    },
    methods:{
        // 点击添加编辑按钮
        addarticle(val){
            $('#addarticles').modal('show')
            this.type = val
            if(val=='0'){}
            if(val=='1'){}
        },
        //页面选中事件
        userSelectionChange(val){
            this.site = val
        },
        //删除项目
        deletearticle(){
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个项目进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此项目, 是否继续?', '提示', {
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
.article{width: 100%;height: 100%;padding: 5px;}
.article_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.article_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.article_right>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.article_right_top{height: 46px;border-bottom: none !important;display: flex;}
.article_right_top>button{height:33px;margin:8px 0 0 10px;}
.article_right_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.block{text-align: center;}


.form-group{display:flex;justify-content: center;}
.form-group>label{width: 60px;line-height: 32px;text-align: center;}
.form-group>input{width: 196px;height: 32px;}
</style>