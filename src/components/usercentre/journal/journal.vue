<template>
    <div class="journal">
        <!-- 日志 -->
        <div class="journal_top">
            <div>
                <span>项目:</span>
                <el-select style="width:156px;" v-model="value4" size='small' clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div >
                <span>操作类型:</span>
                <el-select style="width:156px;" v-model="value4" size='small' clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>日期:</span>
                <el-date-picker
                v-model="value6"
                style="width:250px;"
                size='small'
                type="daterange"
                range-separator="--"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button type="primary" size='small' :loading="true" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="journal_bottom">
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
                label="项目"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="机构名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="用户名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="操作类型"
                width="180">
                </el-table-column>
                <el-table-column
                prop="date"
                label="描述"
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
</template>
<script>
export default {
  name: 'journal',
  data () {
    return {
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
        value4: '',
        value6:''
    }
  },
  mounted(){
    
  },
  methods:{
    
  },
  created(){
    
  },
}
</script>
<style scoped>
.journal{width:100%;height:100%;position: relative;}
.journal>div{border: 1px solid #E4E4F1;position: absolute;}
.journal_top{height: 46px;top:5px;left:5px;right: 5px;border-bottom: none !important;display: flex;align-items: center;}
.journal_top>div{margin-left: 15px;}
.journal_top>button{height:33px;margin-left: 15px;}
.journal_bottom{top: 51px;left:5px;right: 5px;bottom: 5px;padding: 5px;overflow: auto;}
.block{text-align: center;}
</style>