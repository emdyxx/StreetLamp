<template>
    <div class="lampslanterns">
        <!-- 灯杆 -->
        <div class="lampslanterns_top">
            目录:
            <el-cascader
            size='small'
            :options="options"
            v-model="selectedOptions3">
            </el-cascader>
            <el-dropdown style="margin-left:25px;">
                <el-button type="primary" size='small' style="width:85px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>开灯</el-dropdown-item>
                    <el-dropdown-item>关灯</el-dropdown-item>
                    <el-dropdown-item>调光</el-dropdown-item>
                    <el-dropdown-item>状态查询</el-dropdown-item>
                    <el-dropdown-item>数据查询</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="lampslanterns_bottom">
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
                label="区域"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="控制柜"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="集中器"
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
                label="状态"
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
                label="灯状态"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="警报"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="电压(V)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="调光值"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="电流(A)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="功率(W)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="功率因数"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="电能(Wh)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="亮灯(小时:分钟)"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="漏电压(V)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="date"
                label="采集时间"
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
    name: 'lampslanterns',
    data () {
        return {
            selectedOptions3:[1,2],
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
        }
    },
    mounted(){

    },
    methods:{
        
    },
}
</script>
<style scoped>
.lampslanterns{width: 100%;height: 100%;}
.lampslanterns>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.lampslanterns_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.lampslanterns_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.block{text-align: center;}
</style>