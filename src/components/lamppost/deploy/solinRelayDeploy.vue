<template>
    <!-- 继电器部署 -->
    <div class="SolinRelayDeploy">
        <div class="solinRelayDeploy_top">
            <el-button v-if="addRelay" @click="solinRelayDeployOpreat(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editRelay" @click="solinRelayDeployOpreat(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="delRelay" @click="solinRelayDeployOpreat(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type1='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='状态';type1='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type1=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='2'">
                        <el-input v-model="relayNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='3'">
                        <el-select v-model="value" size='small' style="width:194px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="solinRelayDeploy_bottom"> 
            <div class="solinRelayDeploy_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
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
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="relayNumber"
                    align='center'
                    :formatter="formatRole"
                    label="序列号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    align='center'
                    label="型号"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorName"
                    align='center'
                    :formatter="formatRole"
                    label="集中器名称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    :formatter="formatRole"
                    label="集中器序列号"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    align='center'
                    :formatter="formatRole"
                    label="备注"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
                    :formatter="formatRole"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    background
                    @size-change="sizechange"
                    @current-change="currentchange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 添加/编辑继电器模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加继电器</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑继电器</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form_input">
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model.lazy="data.nickName" maxlength="40" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入继电器名称">
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>序列号:</label>
                            <el-input-number v-model.lazy="data.relayNumber" :min="1" :max="253" size="small" style="width:196px;" label="继电器序列号"></el-input-number>
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>型号:</label>
                            <el-select v-model="data.modelId" @change="modelChange" size='small' clearable style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form_input">
                            <label><span class="Required">*</span>集中器:</label>
                            <el-select v-model="data.concentratorSn" size='small' clearable style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.concentratorSn"
                                :label="item.concentratorName"
                                :value="item.concentratorSn">
                                    <span style="float: left">{{ item.concentratorName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.concentratorSn }}</span>
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form_input">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="data.remark"
                                style="width:196px;">
                            </el-input>
                        </div>
                        <div class="passageway">
                            <div class="passageway_div1">
                                <span>输入通道</span>
                                <span>通道名称</span>
                                <span>输出通道</span>
                                <span>通道名称</span>
                            </div>
                            <div class="passageway_div2">
                                <div>
                                    <div v-for="(item,index) in data.inputChannelDTOs" :key='item.id'>
                                        <span>{{index+1}}</span>
                                        <span style="padding:3px;">
                                            <input type="text" v-model.lazy=item.channelName style="height:27px;" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="通道名称">
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div v-for="(item,index) in data.outputChannelDTOs" :key='item.id'>
                                        <span>{{index+1}}</span>
                                        <span style="padding:3px;">
                                            <input type="text" v-model.lazy=item.channelName style="height:27px;" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="通道名称">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="RelayDeploySubmit" class="btn btn-primary">保存</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'SolinRelayDeploy',
    data () {
        return {
            name:'名称',
            type1:'1',
            addRelay:false,
            editRelay:false,
            delRelay:false,
            serverurl:localStorage.serverurl, 
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            relayNumber:'',
            value:'',
            options:[
                {
                    name:'离线',
                    id:'0'
                },
                {
                    name:'在线',
                    id:'1'
                }
            ],
            type:'0',
            options2:[], //集中器序列号
            options3:[],//继电器型号
            data:{
                nickName:'',
                relayNumber:'',
                concentratorSn:'',
                modelId:'',
                remark:'',
                inputChannelDTOs:[],
                outputChannelDTOs:[],
            }
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.relayNumber=''
            this.value=''
        },
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        //点击添加,编辑,删除按钮
        solinRelayDeployOpreat(val){
            var that = this;
            if(val=='0'){
                this.type = '0'
                this.concentratorSnData()
                this.modelData()
                that.data.nickName=''
                that.data.relayNumber=''
                that.data.concentratorSn=''
                that.data.modelId=''
                that.data.remark=''
                that.data.passagewayList=[]
                $('#myModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个继电器进行编辑!',
                        type: 'error'
                    });
                    return
                }
                this.type = '1'
                that.data.inputChannelDTOs = []
                that.data.outputChannelDTOs = []
                this.concentratorSnData()
                this.modelData()
                this.passageway()
                that.data.nickName=this.site[0].nickName
                that.data.relayNumber=this.site[0].relayNumber
                that.data.concentratorSn=this.site[0].concentratorSn
                that.data.modelId=this.site[0].modelId
                that.data.remark=this.site[0].remark
                $('#myModal').modal('show')
            }
            if(val=='2'){
                if(this.site.length==0){
                    this.$message({
                        message: '请选择继电器进行删除!',
                        type: 'error'
                    });
                    return
                }
                var array = []
                for(var i = 0;i<this.site.length;i++){
                    array.push(this.site[i].id)
                }
                this.$confirm('是否删除所选继电器？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/relay/device/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            relays:array
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
        //添加,编辑  保存
        RelayDeploySubmit(){
            var that = this;
            if(that.data.nickName==''||that.data.relayNumber==''||that.data.concentratorSn==''||that.data.modelId==''){
                that.$message({
                    message: '必填数据不能为空!',
                    type: 'error'
                });
                return
            }
            var type = ''
            var data = {}
            data = that.data
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id = that.site[0].id}
            data.projectId	= sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/device',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#myModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求继电器所有的通道
        passageway(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/channel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    relayIds:that.site[0].id,
                    nickName:'',
                    channelType:'',
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.list.length;i++){
                            if(data.result.list[i].channelType=='0'){
                                that.data.inputChannelDTOs.push({
                                    channelName:data.result.list[i].nickName,
                                    channelNumber:data.result.list[i].channelNumber
                                })
                            }
                            if(data.result.list[i].channelType=='1'){
                                that.data.outputChannelDTOs.push({
                                    channelName:data.result.list[i].nickName,
                                    channelNumber:data.result.list[i].channelNumber
                                })
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                },
            }) 
        },
        //集中器序列号
        concentratorSnData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //继电器型号
        modelData(){
            var that = this;       
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/model',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.mapList
                    }else{
                        that.errorCode(data)
                    }
                },
            })  
        },
        //继电器型号change事件请求继电器通道数量
        modelChange(val){
            var that = this
            var inputChannelTotal = '';
            var outputChannelTotal = '';
            var array = []
            var array2 = []
            for(var i = 0;i<this.options3.length;i++){
                if(this.options3[i].id==val){
                    inputChannelTotal = this.options3[i].inputChannelTotal
                    outputChannelTotal = this.options3[i].outputChannelTotal
                }
            }
            for(var j = 0;j<inputChannelTotal;j++){
                array.push({
                    channelName:'',
                    channelNumber:j+1,
                })
                array2.push({
                    channelName:'',
                    channelNumber:j+1,
                })
            }
            this.data.inputChannelDTOs = array
            this.data.outputChannelDTOs = array2
        },
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    concentratorSn:'',
                    relayNumber:that.relayNumber,
                    online:that.value,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        SelectionChange(val){this.site = val;},
        currentchange(val){this.pageIndex = val;this.ready();},
        sizechange(val){this.pageSize = val;this.ready()},
        search(){this.ready();},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addRelay'){
                                that.addRelay = true
                            }
                            if(data.result.operats[i].code=='editRelay'){
                                that.editRelay = true
                            }
                            if(data.result.operats[i].code=='delRelay'){
                                that.delRelay = true
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created(){
        this.Jurisdiction()
        this.ready()
    }
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.SolinRelayDeploy{width: 100%;height: 100%;}
.SolinRelayDeploy>div{width: 100%;position: absolute;}
.solinRelayDeploy_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.solinRelayDeploy_top>button,.solinRelayDeploy_top>div{height:33px;margin:8px 0 0 10px;}
.solinRelayDeploy_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.solinRelayDeploy_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
.block{text-align: center;}

.form_input{display:flex;justify-content: center;}
.form_input>label{width: 105px;line-height: 34px;text-align: center;}
.form_input>input{width: 196px;}

.passageway{width: 100%;padding: 5px;border: 1px solid #dcdfe6;margin-top:10px;}
.passageway>div{width:100%;}
.passageway_div1{display: flex;border: 1px solid #dcdfe6;}
.passageway_div1>span{display: inline-block;width: 25%;text-align: center;border-right: 1px solid #dcdfe6;box-sizing: border-box;}
.passageway_div2{display: flex;}
.passageway_div2>div{width: 50%;}
.passageway_div2>div>div{display: flex;}
.passageway_div2 span{display: inline-block;width: 100%;text-align: center;line-height: 34px;box-sizing: border-box;border-bottom: 1px solid #dcdfc6;border-left: 1px solid #dcdfc6;}
.passageway_div2 span>input{width: 100%;}
</style>
