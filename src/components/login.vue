<template>
  <div class="login">
		<div class="login_left">
			<img src="../assets/img/logo.png" alt="">
		</div>
		<div class="login_right">
			<img src="../assets/img/solin.png" alt="">
			<p>登录</p>
			<label for="user">
				<img src="../assets/img/username.png" alt="">
				<input type="text" v-model="username" id="user" placeholder="账号">
			</label>
			<label for="password" style="margin-top:65px;">
				<img style="padding-left:4px;" src="../assets/img/password.png" alt="">
				<input type="password" v-model="password" id="password" placeholder="密码">
			</label>
			<el-checkbox v-model="checked">记住密码</el-checkbox>
			<el-button type="primary" @click="login" :loading="loading">登录</el-button>
		</div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
		serverurl:'',
		loading: false,
		checked:false,
		username:'',
		password:'',
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
		if(this.username==''||this.password==''){
			that.$message({
				message: '账号密码不能为空!',
				type: 'error'
			});
			return;
		}

		that.loading = true
		var data = {
			username:this.username,
			userPwd:''
		};
		if(this.password.length>=32){
			data.userPwd = this.password
		}else{
			data.userPwd = md5(this.password)
		}
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
					if(that.checked==true){
						localStorage.checked = true
						localStorage.username = $('#user').val()
						if(localStorage.password==''||localStorage.password==undefined||localStorage.password==null){
							localStorage.password = md5(that.password)
						}else{
							if(that.password.length>30){
								localStorage.password = that.password
							}else{
								localStorage.password = md5(that.password)
							}
						}
					}else{
						localStorage.removeItem('username');
						localStorage.removeItem('password');
						localStorage.checked = false
					}
					sessionStorage.token = data.result.token
					localStorage.messageNumber = 0
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
		if(localStorage.checked=='true'){
			this.username = localStorage.username
			this.password = localStorage.password
			this.checked = true
		}
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
<style scoped>
input{background:none;outline:none;}

.login{width:100%;height:100%;display: flex;}
.login_left{width: 60%;background-image:url('../assets/img/beijing.jpg');background-size: 100% 100%;background-repeat: no-repeat;display: flex;justify-content: center;align-items: center;}
.login_right{width: 40%;background: white;padding: 170px 5% 0 5%;}
.login_right>p{padding: 34px 0 50px 0;margin:0;font-size: 24px;font-weight: 600;color: #666666;}



.login_right>label{width: 100%;display: flex;padding: 0 0 0 0;border-bottom: 1px solid #e4e4e4;}
.login_right>label>img{padding-bottom: 10px;width: 21px;}
.login_right>label>input{margin-left: 25px;border: none;font-size: 16px;}
.login_right>label:nth-of-type(3){border: none;margin:10px 0 36px 0;padding: 0;color: #9d9d9d;}
.login_right>button{width: 100%;height: 48px;font-size: 20px;}
</style>
