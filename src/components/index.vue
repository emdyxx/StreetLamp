<template>
  <div class="index">
    <div class="index_top">
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
    <!-- 点击图片模态框（Modal） -->
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
                                    <div>归属组织:{{data.org.orgName}}</div>
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
    <!-- 修改密码模态框 -->
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
            </div><!-- /.modal-content -->
        </div>
    </div><!-- /.modal -->
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
        //用户管理系统(用户中心)
        usermanage(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '1'
            this.$router.push({'path':'/usercenter'})
        },
        //智慧灯杆系统
        lamppost(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '2'
            this.$router.push({'path':'/lamppost'})
        },
        //gis地图系统
        map(val){
            sessionStorage.menuId = val
            sessionStorage.headercolorType = '1'
            this.$router.push({'path':'/mapHomgPage'})
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
.index_top{width: 100%;position: relative;height: 115px;}
.index_top_left{padding:20px 25px;border: 2px solid white;border-radius: 10px;position: absolute;top:20px;left: 100px;display: flex;justify-content: center;align-items: center;}
.index_top_left>i{color: white;font-size: 36px;margin-top:-10px;margin-bottom: 10px;}
.index_top_left>p{color: white;font-size: 18px;position: absolute;bottom: 0;left: 24px;margin-bottom: 5px;}
.index_top_right{position: absolute;top:25px;right: 25px;}
.index_top_right{display: flex;flex-wrap: nowrap;}
.index_top_right_text{width: 100px;height: 100%;text-align: center;}
.index_top_right_text>p{color:white;font-size: 16px;}
.index_top_right_img>img{width:90px;height: 90px;border-radius: 50%;}

.index_center{position: absolute;top: 25%;left: 25%;width: 140px;height: 125px;}
.index_center>div{width:140px;height: 125px;background-size:100% 100%;text-align: center;color: white;cursor: pointer;background-repeat: no-repeat;position: absolute;}
.index_center>div:hover{width:140px;height: 125px;background-size:100% 100%;text-align: center;color: white;cursor: pointer;background-repeat: no-repeat;position: absolute;}
.index_center>div>span{position: absolute;bottom:5px;width: 100%;left: 0;}
.index_center>div>img{width: 100px;height: 100px;}
.index_center_top_usercentre{background: url('../assets/images/L-1-1.png');}
.index_center_top_usercentre:hover{background: url('../assets/images/L-1-2.png');}
.index_center_top_lampost{background: url('../assets/images/L-2-1.png');}
.index_center_top_lampost:hover{background: url('../assets/images/L-2-2.png');}
.index_center_top_coordinate{background: url('../assets/images/L-3-1.png');}
.index_center_top_coordinate:hover{background: url('../assets/images/L-3-2.png');}
.index_center_top_coordinate>img{width: 90px !important;height: 90px !important;margin-top: 5px;}
.index_center_bottom_video{background: url('../assets/images/L-4-1.png');}
.index_center_bottom_video:hover{background: url('../assets/images/L-4-2.png');}
.index_center_bottom_video>img{width: 75px !important;height: 75px !important;margin-top: 15px;margin-left: 3px;}
.index_center_bottom_wifi{background: url('../assets/images/L-5-1.png');}
.index_center_bottom_wifi:hover{background: url('../assets/images/L-5-2.png');}
.index_center_bottom_wifi>img{width: 95px !important;height: 95px !important;margin-top: 5px;}
.index_center_bottom_broadcast{background: url('../assets/images/L-6-1.png');}
.index_center_bottom_broadcast:hover{background: url('../assets/images/L-6-2.png');}
.index_center_bottom_broadcast>img{width: 77px !important;height: 77px !important;margin-top: 15px;margin-left: 10px;}
.index_center_bottom_Inspection{background: url('../assets/images/L-7-1.png');}
.index_center_bottom_Inspection:hover{background: url('../assets/images/L-7-2.png');}
.index_center_bottom_Inspection>img{width: 77px !important;height: 77px !important;margin-top: 15px;margin-left: 0px;}
.index_center>div:nth-of-type(2){top: -65px;left: 110px;}
.index_center>div:nth-of-type(3){top: 65px;left: 110px;}
.index_center>div:nth-of-type(4){top: 0;left: 220px;}
.index_center>div:nth-of-type(5){top: -65px;left: 330px;}
.index_center>div:nth-of-type(6){top: 65px;left: 330px;}
.index_center>div:nth-of-type(7){top: 0px;left: 440px;}

.header_img{text-align: left;margin-left: 30px;}
.header_img>img{width: 80px;height: 80px;border-radius: 50%;}
.header_right{height: 40px;margin-left: 30px;margin-top: 20px;text-align: left;font-size: 13px;}
.header_right>button{position: absolute;top: 40px;right: 15px;}
.table_body>tr>td{padding-bottom: 15px;padding-top: 5px;}
.form-group{display:flex;}
.form-group>label{width: 65px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
</style>
