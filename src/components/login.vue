<template>
  <div class="login">
    <span class="login_text">
      SOLIN  智慧城市物联系统
    </span>
    <div class="login_center">
      <div class="login_center_top">
        <i class="iconfont icon-zhanghaoguanli"></i>
      </div>
      <div class="form-group" style="margin-top: 15px;">
        <label for="name">
          <i class="iconfont icon-zhanghao" style="font-size:16px;width:25px;left: 7px;top:4px;"></i>
          <input type="text" class="form-control" id="user" placeholder="账号">
        </label>
      </div>
      <div class="form-group">
        <label for="name">
          <i class="iconfont icon-mima" style="font-size:18px;width:27px;left: 5px;top:4px;"></i>
          <input type="password" class="form-control" id="password" placeholder="密码">
        </label>
      </div>
      <el-button type="success" @click="login" size='small' :loading="loading">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      serverurl:'',
      loading: false
    }
  },
  mounted(){
    var that = this;
    setTimeout(function(){
      that.serverurl = localStorage.serverurl
    },1000)
  },
  methods:{
    login(){
      var that = this;
      var theUA = window.navigator.userAgent.toLowerCase();
      if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
          var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
          if (ieVersion < 10) {
              that.$message({
                  message: '如果您的使用的是360,搜狗,QQ等双核浏览器，请在最顶部切换到极速模式访问!',
                  type: 'error'
              });
              return
          }
      }
      var user = $('#user').val()
      var password = md5($('#password').val())
      if(user==''||password==''){
        that.$message({
            message: '账号密码不能为空!',
            type: 'error'
        });
        return;
      }
      that.loading = true
      var data = {
          username:user,
          userPwd:password
      };
      $.ajax({
        type:'post',
        async:true,
        dataType:'json',
        url:that.serverurl+'/v1/manage/token',
        contentType:'application/json;charset=UTF-8',
        data:JSON.stringify(data),
        success:function(data){
          that.loading = false
          if(data.errorCode=='0'){
            sessionStorage.token = data.result.token
            // that.$router.push({'path':'/program'})
            that.$router.push({'path':'/index'})
          }else{
            that.errorCode(data)
          }
        },
      })
    },
  },
  created(){
    var that = this
    sessionStorage.clear() 
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion < 10) {
            that.$message({
                message: '如果您的使用的是360、搜狗、QQ等双核浏览器，请在最顶部切换到极速模式访问!',
                type: 'error'
            });
            return
        }
    }
    window.onkeydown = function(e){
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
            var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
            if (ieVersion < 10) {
                that.$message({
                    message: '如果您的使用的是360、搜狗、QQ等双核浏览器，请在最顶部切换到极速模式访问!',
                    type: 'error'
                });
                return
            }
        }
        if(e.keyCode==13){
          that.login()
        }
    }
    that.serverurl = localStorage.serverurl
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*  */
.login{width: 100%;height: 100%;background: url('../assets/bg2.jpg') no-repeat;background-size: 100% 100%;display: flex;justify-content: center;align-items: center;}
.login_text{color: white;font-size: 35px;position: absolute;top: 20px;left: 40px;font-weight: bold;}
.login_center{width:360px;background: rgb(94, 149, 250);border-radius: 10px;box-shadow: 0px 10px 15px black;padding: 10px;} 
.login_center_top{width: 100%;padding: 20px 0 0 0;text-align: center;}
.login_center_top>i{font-size: 80px;color: white;width: 96px;height: 96px;display: inline-block;}
.form-group{text-align: center;}
.form-group>label{position: relative;}
.form-group i{position: absolute;height:22px;color:#abadb3;border-right: 1px solid #abadb3;}
.form-group input{width: 245px;height: 28px;border-radius: 8px;padding-left: 35px;}
.login_center>button{margin-left: 235px;}
</style>
