<template>
  <div class="login">
    <span class="login_text">
      ky 城市照明智控云系统
    </span>
    <div class="login_center">
      <h4>用户登录</h4>
      <div class="form-group">
        <!-- <label for="name">名称</label> -->
        <input type="text" class="form-control" id="name" placeholder="用户名">
      </div>
      <div class="form-group">
        <!-- <label for="name">名称</label> -->
        <input type="text" class="form-control" id="name" placeholder="密码">
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
      
    }
  },
  methods:{
    login(){
      this.$router.push({'path':'/index'})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{width: 100%;height: 100%;background: url('../assets/login/bg1.jpg') no-repeat;display: flex;justify-content: center;align-items: center;}
.login_text{color: white;font-size: 35px;position: absolute;top: 20px;left: 40px;font-weight: bold;}
.login_center{width:320px;background: rgb(94, 149, 250);border-radius: 10px;box-shadow: 0px 10px 15px black;padding: 10px;} 
.login_center>h4{color: white;font-size: 18px;}
.login_center>button{width: 60%;margin-bottom: 20px;margin-left: 55px;}
</style>
