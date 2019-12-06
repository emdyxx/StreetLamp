<template>
    <!-- 继电器部署 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备部署>继电器管理</p>
        </div>
        <div class="section_bottom"> 
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewRelayDeploy">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='地址';type1='2';">地址</el-dropdown-item>
                            <el-dropdown-item @click.native="name='状态';type1='3';">状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="type1=='1'">
                            <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type1=='2'">
                            <el-input type="number" v-model="relayNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                            <!-- <el-input-number v-model="relayNumber" size="small" :precision="0" :min="1" :max="253" label="请输入地址" style="width:200px;"></el-input-number> -->
                            <!-- <el-input v-model="relayNumber" size="small" placeholder="请输入地址" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
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
                <div class="section_bottom_right">
                    <el-button v-if="JurisdictionS.addRelay" @click="solinRelayDeployOpreat(0)" type="primary" plain icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button v-if="JurisdictionS.delRelay" @click="solinRelayDeployOpreat(2)" type="primary" plain icon='el-icon-delete' size='small'>删除</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="relayNumber"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="地址"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorName"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="集中器"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="备注"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="创建时间"
                    :formatter="formatRole"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button v-if="JurisdictionS.editRelay" @click="solinRelayDeployOpreat(1,scope.row)" type="primary" size='mini'>编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
                        <div class="form-group">
                            <label><span class="Required">*</span>名&emsp;&emsp;称:</label>
                            <input type="text" v-model.lazy="data.nickName" maxlength="40" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入继电器名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>地&emsp;&emsp;址:</label>
                            <el-input-number v-model.lazy="data.relayNumber" :precision="0" :min="1" :max="253" size="small" style="width:196px;" label="地址"></el-input-number>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>型&emsp;&emsp;号:</label>
                            <el-select v-model="data.modelId" @change="modelChange" size='small' clearable style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>集&ensp;中&ensp;器:</label>
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
                        <div class="form-group">
                            <label>备&emsp;&emsp;注:</label>
                            <el-input
                                type="textarea"
                                :rows="1"
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
            JurisdictionS:{
                viewRelayDeploy:false,//查看继电器部署
                addRelay:false,//添加继电器
                editRelay:false,//编辑继电器
                delRelay:false,//删除继电器
            },
            serverurl:localStorage.serverurl, 
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            relaySite:[],
            nickName:'',
            relayNumber:'',
            value:'',
            options:[
                {
                    name:'在线',
                    id:'1'
                },
                {
                    name:'离线',
                    id:'0'
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
        solinRelayDeployOpreat(val,row){
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
                that.data.inputChannelDTOs = []
                that.data.outputChannelDTOs = []
                $('#myModal').modal('show')
            }
            if(val=='1'){
                this.type = '1'
                that.data.inputChannelDTOs = []
                that.data.outputChannelDTOs = []
                this.concentratorSnData()
                this.modelData()
                this.passageway(row)
                that.relaySite = row
                that.data.nickName=row.nickName
                that.data.relayNumber=row.relayNumber
                that.data.concentratorSn=row.concentratorSn
                that.data.modelId=row.modelId
                that.data.remark=row.remark
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
            if(that.type=='1'){type='put';data.id = that.relaySite.id}
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
        passageway(row){
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
                    relayIds:row.id,
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
                            if(data.result.operats[i].code=='viewRelayDeploy'){
                                that.JurisdictionS.viewRelayDeploy = true
                            }
                            if(data.result.operats[i].code=='addRelay'){
                                that.JurisdictionS.addRelay = true
                            }
                            if(data.result.operats[i].code=='editRelay'){
                                that.JurisdictionS.editRelay = true
                            }
                            if(data.result.operats[i].code=='delRelay'){
                                that.JurisdictionS.delRelay = true
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
.passageway{width: 100%;padding: 5px;border: 1px solid #dcdfe6;margin-top:30px;}
.passageway>div{width:100%;}
.passageway_div1{display: flex;border: 1px solid #dcdfe6;}
.passageway_div1>span{display: inline-block;width: 25%;text-align: center;border-right: 1px solid #dcdfe6;box-sizing: border-box;}
.passageway_div2{display: flex;}
.passageway_div2>div{width: 50%;}
.passageway_div2>div>div{display: flex;}
.passageway_div2 span{display: inline-block;width: 100%;text-align: center;line-height: 34px;box-sizing: border-box;border-bottom: 1px solid #dcdfc6;border-left: 1px solid #dcdfc6;}
.passageway_div2 span>input{width: 100%;} 
</style>
