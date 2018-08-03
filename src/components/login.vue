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
      <button type="button" @click="login" class="btn btn-success">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      serverurl:localStorage.serverurl
    }
  },
  methods:{
    login(){
      var that = this;
      var user = $('#user').val()
      var password = $('#password').val()
      if(user==''||password==''){
        that.$message({
            message: '账号密码不能为空!',
            type: 'error'
        });
        return;
      }
      var data = {
          username:user,
          userPwd:password
      };
      $.ajax({
        type:'post',
        async:true,
        dataType:'json',
        url:that.serverurl+'/user/login',
        contentType:'application/json;charset=UTF-8',
        data:JSON.stringify(data),
        success:function(data){
          if(data.errorCode=='0'){
            sessionStorage.token = data.result.token
            that.$router.push({'path':'/index'})
          }else{
            that.errorCode(data.errorCode)
          }
        },
      })
      
    },
  },
  created(){
    var that = this
    window.onkeydown = function(e){
        if(e.keyCode==13){
          that.login()
        }
    }
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
.login_center>button{width: 65px;height: 30px;line-height: 1;margin-left: 225px;}
</style>
