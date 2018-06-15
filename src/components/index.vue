<template>
  <div class="index">
    <div class="index_top">
        <div class="index_top_right">
            <div class="index_top_right_text">
                <p style="padding-top:30px;">机构管理员</p>
                <p @click="dropout" style="padding-top:0px;cursor: pointer;">退出登录</p>
            </div>
            <div class="index_top_right_img" @click="imagemanage">
                <img src="../assets/bg1.jpg" alt="">
            </div>
        </div>
    </div>
    <!-- 点击图片模态框（Modal） -->
    <div class="modal fade" id="MyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="display:flex;">
                    <div class="header_img">
                        <img src="../assets/bg1.jpg" alt="">
                    </div>
                    <div class="header_right">
                        <p>机构管理员</p>
                        <p>
                            <span>登录时间 : 2018-03-15 09:28:17</span>
                            <span style="margin-left: 15px;">创建时间 : 2018-01-15 13:13:45</span>
                        </p>
                        <button type="button" class="btn btn-success">修改密码</button>
                    </div>
                </div>
                <div class="modal-body">
                    <table style="width:100%;">
                        <tbody class="table_body">
                            <tr>
                                <td>
                                    <div>账号:123456</div>
                                </td>
                                <td>
                                    <div>名称:123456</div>
                                </td>
                                <td>
                                    <div>手机:123456</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>邮箱:123456</div>
                                </td>
                                <td>
                                    <div>备注:123456</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="index_center">
        <div class="index_center_top">
            <div class="index_center_top_usercentre" @click="usermanage">系统管理</div>
            <div class="index_center_top_lampost" @click="lamppost">智慧灯杆系统</div>
            <!-- <div class="index_center_top_img01">
                <img src="../assets/login/icon_18.png" alt="">
                <p>地理信息系统</p>
            </div> -->
            <!-- <div class="index_center_top_img02">
                <img src="../assets/login/icon_18.png" alt="">
                <p>道路照明系统</p>
            </div> -->
            <!-- <div class="index_center_top_img04" @click="usermanage">
                <img src="../assets/login/icon_18.png" alt="">
                <p>系统管理</p>
            </div>
            <div class="index_center_top_img03" @click="lamppost">
                <img src="../assets/login/icon_18.png" alt="">
                <p>智慧灯杆系统</p>
            </div> -->
        </div>
        <div class="index_center_bottom">
            
            <!-- <div class="index_center_top_img05">
                <img src="../assets/login/icon_18.png" alt="">
                <p>项目管理</p>
            </div> -->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  methods:{
    // 退出登录
    dropout(){
        this.$router.push({'path':'/'})
    },
    //点击右上角图像
    imagemanage(){
        $('#MyModal').modal('show')
    },
    //智慧灯杆系统
    lamppost(){
        this.$router.push({'path':'/lamppost'})
    },
    //用户管理系统(用户中心)
    usermanage(){
        this.$router.push({'path':'/usercenter'})
    },
  },
}
</script>
<style scoped>
/* /StreetLamp */
.index{width: 100%;height: 100%;background: url('../assets/bg2.jpg') no-repeat;background-size: 100% 100%;}
.index_top{width: 100%;position: relative;height: 115px;}
.index_top_left{padding:20px 25px;border: 2px solid white;border-radius: 10px;position: absolute;top:20px;left: 100px;display: flex;justify-content: center;align-items: center;}
.index_top_left>i{color: white;font-size: 36px;margin-top:-10px;margin-bottom: 10px;}
.index_top_left>p{color: white;font-size: 18px;position: absolute;bottom: 0;left: 24px;margin-bottom: 5px;}
.index_top_right{position: absolute;top:25px;right: 25px;}
.index_top_right{display: flex;flex-wrap: nowrap;}
.index_top_right_text{width: 100px;height: 100%;}
.index_top_right_text>p{color:white;font-size: 16px;}
.index_top_right_img>img{width:90px;height: 90px;border-radius: 50%;}
.index_center{margin: 40px auto;}
.index_center div{margin-right: 30px;margin-left:30px;cursor: pointer;}
.index_center div>img{transition: all 1S;-webkit-transition: all 1S;}
.index_center p{color: white;margin-top:10px;font-size: 16px}
.index_center_top{display: flex;justify-content: center;}
.index_center_top>div{width: 150px;height: 20px;background-repeat: no-repeat !important;background-position: center 25% !important;color: #FFF;text-align: center;font-size: 14px;opacity: 0.9;padding: 99px 5px 15px 10px;margin: 10px 10px 10px 10px;line-height: 5px;cursor: pointer;border: 2px solid transparent;}
.index_center_top>div:hover{border: 2px solid white;}
.index_center_top_usercentre{background: #2196F3 url('../assets/user.png');}
.index_center_top_lampost{background:#9C27B0 url('../assets/project.png'); }

.header_img{text-align: left;margin-left: 30px;}
.header_img>img{width: 80px;height: 80px;border-radius: 50%;}
.header_right{height: 40px;margin-left: 30px;margin-top: 40px;text-align: left;font-size: 13px;}
.header_right>button{position: absolute;top: 40px;right: 15px;}
.table_body>tr>td{padding-bottom: 15px;padding-top: 5px;}

</style>
