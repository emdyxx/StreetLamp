<template>
  <div class="index">
    <div class="index_top">
        <img src="../assets/img/biaoti.png" alt="">
        <div class="index_top_right">
            <span>欢迎您 !</span>
            <span>{{data.username}}</span>
            <img :src=data.icon alt="">
            <span>V3.1.0</span>
        </div>
        <div class="index_top_psd">
            <div>
                <img :src=data.icon alt="">
                <div>
                    <p v-if="data.userType=='1'" style="font-size:16px;color:black;">管理员</p>
                    <p v-else>普通用户</p>
                    <p style="font-size:14px;color:#7e7e7e;">{{data.username}}</p>
                </div>
            </div>
            <hr style="margin-top:10px;margin-bottom:30px;">
            <el-button @click="removePassword" type="text">修改密码</el-button>
            <el-button @click="dropout" type="text">退出登录</el-button>
            <hr style="margin-top:30px;margin-bottom:13px;">
            <p style="font-size:12px;">登录时间:{{data.ts}}</p>
        </div>
    </div>
    <div class="index_bottom">
        <div v-if="menu.length<3">
            
        </div>
        <div v-if="menu.length==3">
            <div class="div_01" style="width:1165px">
                <div class="div_02">
                    <template v-for="item in menu">
                        <!-- 系统管理 -->
                        <template v-if="item.code=='managementService'">
                            <div @click="usermanage(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/managementService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/managementService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/managementService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/managementService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/managementService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 设备管理 -->
                        <template v-if="item.code=='solinDeviceService'">
                            <div @click="lamppost(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinDeviceService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinDeviceService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinDeviceService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinDeviceService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinDeviceService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>  
                        </template>
                        <!-- GIS地图 -->
                        <template v-if="item.code=='solinMapService'">
                            <div @click="map(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinMapService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinMapService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinMapService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinMapService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinMapService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>  
                        </template>
                        <!-- 智能巡检 -->
                        <template v-if="item.code=='patrolService'">
                            <div @click="Inspection(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/patrolService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/patrolService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/patrolService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/patrolService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/patrolService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 灯具 -->
                        <template v-if="item.code=='solinLampMap'">
                            <div @click="Lamp(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinLampMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinLampMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinLampMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinLampMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinLampMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 摄像头 -->
                        <template v-if="item.code=='solinCameraMap'">
                            <div @click="Camera(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinCameraMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinCameraMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinCameraMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinCameraMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinCameraMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- LED屏幕 -->
                        <template v-if="item.code=='solinScreenMap'">
                            <div @click="LED(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinScreenMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinScreenMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinScreenMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinScreenMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinScreenMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div v-if="menu.length>=4">
            <p v-if="menu.length>4">
                <img @click="LeftShift" src="../assets/img/TurnLeft.png" alt="">
            </p>
            <div class="div_01">
                <div class="div_02">
                    <template v-for="item in menu">
                        <!-- 系统管理 -->
                        <template v-if="item.code=='managementService'">
                            <div @click="usermanage(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/managementService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/managementService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/managementService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/managementService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/managementService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 设备管理 -->
                        <template v-if="item.code=='solinDeviceService'">
                            <div @click="lamppost(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinDeviceService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinDeviceService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinDeviceService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinDeviceService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinDeviceService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>  
                        </template>
                        <!-- GIS地图 -->
                        <template v-if="item.code=='solinMapService'">
                            <div @click="map(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinMapService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinMapService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinMapService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinMapService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinMapService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>  
                        </template>
                        <!-- 智能巡检 -->
                        <template v-if="item.code=='patrolService'">
                            <div @click="Inspection(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/patrolService01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/patrolService02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/patrolService03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/patrolService04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/patrolService05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 灯具 -->
                        <template v-if="item.code=='solinLampMap'">
                            <div @click="Lamp(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinLampMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinLampMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinLampMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinLampMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinLampMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- 摄像头 -->
                        <template v-if="item.code=='solinCameraMap'">
                            <div @click="Camera(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinCameraMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinCameraMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinCameraMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinCameraMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinCameraMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                        <!-- LED屏幕 -->
                        <template v-if="item.code=='solinScreenMap'">
                            <div @click="LED(item.id)" :id=item.id :key=item.id :style="'margin-left:'+item.left+'px'">
                                <template v-if="item.type=='right'&&item.size=='1'">
                                    <img src="../assets/img/solinScreenMap01.png" alt="">
                                </template>
                                <template v-if="item.type=='right'&&item.size=='2'">
                                    <img src="../assets/img/solinScreenMap02.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='2'">
                                    <img src="../assets/img/solinScreenMap03.png" alt="" style="padding-top:53px;">
                                </template>
                                <template v-if="item.type=='left'&&item.size=='1'">
                                    <img src="../assets/img/solinScreenMap04.png" alt="">
                                </template>
                                <template v-if="item.type=='center'">
                                    <img src="../assets/img/solinScreenMap05.png" alt="" style="padding-top:53px;">
                                </template>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <p v-if="menu.length>4">
                <img @click="RightShift" src="../assets/img/TurnRight.png" alt="">
            </p>
        </div>
    </div>
    <!-- <div class="index_top">
        <div class="index_top_right">
            <div class="index_top_right_text">
                <p style="padding-top:10px;margin:0;">{{data.username}}</p>
                <p @click="dropout" style="padding-top:7px;margin:0;cursor: pointer;">退出登录</p>
                <p @click="dropout" style="padding-top:7px;margin:0;">{{versionNumber}}</p>
            </div>
            <div class="index_top_right_img" @click="imagemanage">
                <img :src=data.icon alt="">
            </div>
        </div>
    </div>
    <div class="modal fade" id="MyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="display:flex;">
                    <div class="header_img">
                        <img :src=data.icon alt="">
                    </div>
                    <div class="header_right">
                        <p>
                            <span v-if="data.userType=='1'">管理员</span>
                            <span v-else>普通用户</span>
                        </p>
                        <p>
                            <span>登录时间 : {{data.ts}}</span>
                        </p>
                        <button type="button" @click="removePassword" class="btn btn-success">修改密码</button>
                    </div>
                </div>
                <div class="modal-body">
                    <table style="width:100%;">
                        <tbody class="table_body">
                            <tr>
                                <td>
                                    <div>账号:{{data.username}}</div>
                                </td>
                                <td>
                                    <div>姓名:{{data.fullName}}</div>
                                </td>
                                <td>
                                    <div>手机:{{data.mobile}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>邮箱:{{data.email}}</div>
                                </td>
                                <td>
                                    <div>归属机构:{{data.org.orgName}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="index_center">
        <template v-for="item in menu">
            <template v-if="item.code=='managementService'">
                <div class=index_center_top_usercentre @click="usermanage(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/user.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>
            </template>
            <template v-if="item.code=='solinDeviceService'">
                <div class='index_center_top_lampost' @click="lamppost(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/smartpole.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>  
            </template>
            <template v-if="item.code=='solinMapService'">
                <div class='index_center_top_coordinate' @click="map(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/coordinate.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>  
            </template>
            <template v-if="item.code=='videoService'">
                <div class='index_center_bottom_video' @click="video(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/video.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>  
            </template>
            <template v-if="item.code=='wifiService'">
                <div class='index_center_bottom_wifi' @click="wifi(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/wifi.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>  
            </template>
            <template v-if="item.code=='broadcastService'">
                <div class='index_center_bottom_broadcast' @click="wifi(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/broadcast.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>  
            </template>
            <template v-if="item.code=='patrolService'">
                <div class="index_center_bottom_Inspection" @click="Inspection(item.id)" :id=item.id :key=item.id>
                    <img src="../assets/Inspection.png" alt="">
                    <span>{{item.menuName}}</span>
                </div>
            </template>
        </template>
    </div>
    -->
    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width:270px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">修改密码</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="password1">原始密码:</label>
                        <input type="password" v-model="password1" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入原始密码">
                    </div>
                    <div class="form-group">
                        <label for="password2">新密码:</label>
                        <input type="password" v-model="password2" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入新密码">
                    </div>
                    <div class="form-group">
                        <label for="password3">确认密码:</label>
                        <input type="password" v-model="password3" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请确认新密码">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" @click="addSubmit" class="btn btn-primary">保存</button>
                </div>
            </div>
        </div>
    </div> 
  </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            serverurl:localStorage.serverurl,
            versionNumber:localStorage.versionNumber,  //版本号
            menu:[],
            data:{
                org:{orgName:''},
                icon:''
            },
            password1:'',
            password2:"",
            password3:'',
            mediaUrl:'',
        }
    },
    mounted(){
    },
    methods:{
        // 退出登录
        dropout(){
            var that = this;
            sessionStorage.token = ''
            that.$router.push({'path':'/'})
        },
        //点击修改密码弹出框
        removePassword(){
            $('#myModal2').modal('show')
            this.password1 = ''
            this.password2 = ''
            this.password3 = ''
        },
        //修改密码提交
        addSubmit(){
            var that = this;
            if(this.password1==''||this.password2==''||this.password3==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(this.password1==this.password2){
                this.$message({
                    message: '新密码不能与旧密码相同!',
                    type: 'error'
                });
                return;
            }
            if(this.password2!=this.password3){
                this.$message({
                    message: '两次新密码不一致!',
                    type: 'error'
                });
                return;
            }
            var data = {
                newPassword:md5(that.password2),
                confirmPassword:md5(that.password3),
                oldPassword:md5(that.password1),
                mqttPassword:that.password1
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/password',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '密码修改成功!',
                            type: 'success'
                        });
                        $('#myModal2').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击右上角图像
        imagemanage(){
            $('#MyModal').modal('show')
        },
        //菜单左侧移动
        LeftShift(){
            var that = this
            var step = -1530
            var width = $('.div_02').width()
            var left = $('.div_02').position().left
            if(left+step<step){
                return;
            }
            $('.div_02').css('left',left+step+'px')

            // var data = that.menu.shift()
            // that.menu.push(data)
            // that.manageChange()
        },
        //菜单右侧移动
        RightShift(){
            var that = this
            var step = 1530
            var width = $('.div_02').width()
            var left = $('.div_02').position().left
            if(left+step>0){
                return;
            }
            $('.div_02').css('left',left+step+'px')

            // var data = that.menu.pop()
            // that.menu.unshift(data)
            // that.manageChange()
        },
        //菜单数据位置变化  //让vue重新渲染,造成菜单切换假象
        manageChange(){
            var that = this;
            var length = that.menu.length
            that.menu[0].type = 'right';
            that.menu[0].size = '1';
            for(var i=0;i<that.menu.length;i++){
                if(i==0||i==4||i==8){
                    that.menu[i].left = '25';
                }else{
                   that.menu[i].left = '0'; 
                }
            }
            //小于2的菜单朝向以及大小
            if(length==2){
                that.menu[1].type = 'left';
                that.menu[1].size = '1';
            }
            if(length==3){
                that.menu[1].type = 'center';
                that.menu[1].size = '';
                that.menu[2].type = 'left';
                that.menu[2].size = '1';
            }
            if(length>=4){
                that.menu[1].type = 'right';
                that.menu[1].size = '2';
                that.menu[2].type = 'left';
                that.menu[2].size = '2';
                that.menu[3].type = 'left';
                that.menu[3].size = '1';
            }
            if(length>=5){
                that.menu[4].type = 'right';
                that.menu[4].size = '1';
            }
            //菜单大于6第二页的朝向
            if(length==6){
                that.menu[5].type = 'left';
                that.menu[5].size = '1';
            }
            if(length==7){
                that.menu[5].type = 'center';
                that.menu[5].size = '';
                that.menu[6].type = 'left';
                that.menu[6].size = '1';
            }
            if(length>=8){
                that.menu[5].type = 'right';
                that.menu[5].size = '2';
                that.menu[6].type = 'left';
                that.menu[6].size = '2';
                that.menu[7].type = 'left';
                that.menu[7].size = '1';
            }
            if(length>=9){
                that.menu[8].type = 'right';
                that.menu[8].size = '1';
            }
            if(length==10){
                that.menu[9].type = 'left';
                that.menu[9].size = '1';
            }
            if(length==11){
                that.menu[9].type = 'center';
                that.menu[9].size = '';
                that.menu[10].type = 'left';
                that.menu[10].size = '1';
            }
            if(length==12){
                that.menu[9].type = 'right';
                that.menu[9].size = '2';
                that.menu[10].type = 'left';
                that.menu[10].size = '2';
                that.menu[11].type = 'left';
                that.menu[11].size = '1';
            } 
        },
        //系统管理
        usermanage(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '1'
            this.$router.push({'path':'/usercenter'})
        },
        //设备管理
        lamppost(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '2'
            this.$router.push({'path':'/lamppost'})
        },
        //gis地图系统
        map(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '1'
            this.$router.push({'path':'/mapHomg',query:{id:val}})
        },
        //灯具地图系统
        Lamp(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '2'
            this.$router.push({'path':'/SingleLamp',query:{id:val}})
        },
        //摄像头地图系统
        Camera(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '2'
            this.$router.push({'path':'/Camera',query:{id:val}})
        },
        //LED地图系统
        LED(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '2'
            this.$router.push({'path':'/LED',query:{id:val}})
        },
        //视频管理
        video(val){
            sessionStorage.menuId = val
            this.$router.push({'path':'/video'})
        },
        //wifi管理
        wifi(val){
            sessionStorage.menuId = val
            this.$router.push({'path':'/wifi'})
        },
        //广播管理
        broadcast(val){
            sessionStorage.menuId = val
            this.$router.push({'path':'/broadcast'})
        },
        //巡检管理
        Inspection(val){
            sessionStorage.menuId = val
            sessionStorage.menuId3 = '38'
            this.$router.push({'path':'/Inspection'})
        },
        //请求权限
        Jurisdiction(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/menu/3',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode==0){
                        that.menu = data.result.menus
                        $.ajax({
                            type:'get',
                            async:true,
                            dataType:'json',
                            url:that.serverurl+'/v1/manage/menu/0',
                            contentType:'application/json;charset=UTF-8',
                            data:{},
                            success:function(data){
                                if(data.errorCode==0){
                                    that.menu.unshift(data.result.menus[0])
                                    console.log(that.menu)
                                    that.manageChange()
                                }else{
                                    that.errorCode(data)
                                }
                            },
                        })
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求用户基本信息
        ready(){
            var that = this;
            var myDate = new Date();
            var ts = myDate.toLocaleString();
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/information',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.data = data.result.user
                        that.data.ts = ts
                        sessionStorage.userId = data.result.user.id
                        var url=that.serverurl+data.result.user.org.backdrop
                        that.data.icon = that.serverurl+data.result.user.icon
                        $('.index').css({
                            "background-image":"url("+url+")",
                            "background-size":"100% 100%",
                            "background-repeat":"no-repeat",
                        })
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created() {
        this.Jurisdiction();
        this.ready();
    },
}
</script>
<style scoped>
/* /StreetLamp */
.index{width: 100%;height: 100%;}
.index_top{width: 100%;height: 360px;display: flex;justify-content: center;align-items: center;}
.index_top_right{position: absolute;top: 30px;right: 10px;display: flex;color: white;font-size: 17px;line-height: 60px;}
.index_top_right>img{width: 60px;height:60px;border-radius: 60px;}
.index_top_right>span{padding: 0 10px 0 10px;}
.index_top_psd{position: absolute;top: 105px;right: 80px;width: 212px;height: 220px;padding:15px 10px 20px 10px;background: white;border-radius: 5px;box-shadow: 1px 0px 5px -2px black;}
.index_top_psd>div>img{width: 40px;height:40px;border-radius: 40px;}
.index_top_psd>div{display: flex;}
.index_top_psd>div>div{padding-left: 10px;}
.index_top_psd>div>div>p{margin: 0;}
.index_top_psd>button{display: block;}
.index_top_psd>button:nth-of-type(1){padding: 0 0 0 20px;}
.index_top_psd>button:nth-of-type(2){padding: 20px 0 0 20px;margin:0;}

.index_bottom{width:100%;position: absolute;top:360px;bottom: 0;display: flex;justify-content: center;}
.index_bottom>div{display: flex;width: 100%;justify-content: center;}
.index_bottom>div>p{margin: 0;cursor: pointer;padding: 200px 15px 0 15px;}
.div_01{width: 1544px;overflow: hidden;position: relative;padding:35px 0 0 0;}
.div_02{display: flex;position: absolute;transition: all .5s;-webkit-transition: all .5s;}
.div_02>div,.index_bottom>div>p>img{transition: all .5s;-webkit-transition: all .5s;}
.div_02>div:hover,.index_bottom>div>p>img:hover{
    transform: scale(1.1);
    -ms-transform:scale(1.1);     /* IE 9 */
    -moz-transform:scale(1.1);     /* Firefox */
    -webkit-transform:scale(1.1); /* Safari 和 Chrome */
    -o-transform:scale(1.1);
}
</style>
