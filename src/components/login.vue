<template>
  <div class="login">
		<div class="login_left">
			<!-- <img src="../assets/img/logo.png" alt=""> -->
		</div>
		<div class="login_right">
			<div>
				<img :src = serverurl2 alt="">
				<label for="user" style="margin-top:100px;">
					<img src="../assets/img/username.png" alt="" class="image">
					<input type="text" v-model="username" id="user" autocomplete="new-password" placeholder="账号">
				</label>
				<label for="password" style="margin-top:30px;">
					<img src="../assets/img/password.png" alt="" class="image">
					<input type="password" v-model="password" id="password" autocomplete="new-password" placeholder="密码">
				</label>
				<el-checkbox v-model="checked">记住密码</el-checkbox>
				<el-button type="primary" @click="login" :loading="loading">登录</el-button>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			serverurl:'',
			serverurl2:'',
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
			that.serverurl2 = localStorage.serverurl2 + '/img/icon01.png'
		},50)
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
			if(e.keyCode==13){
				that.login()
			}
		}
		that.serverurl = localStorage.serverurl
	},
	beforeDestroy(){
		window.onkeydown = function(e){
			if(e.keyCode==13){
				
			}
		}
	},
}
</script>
<style scoped>
input{background:none;outline:none;}

.login{width:100%;height:100%;display: flex;}
.login_left{width: 60%;background:url('../assets/img/beijing.jpg');background-size: 100% 100%; background-repeat: no-repeat;}
.login_right{width: 40%;background: white;padding: 0 5% 0 5%;display: flex;align-items: center;}
.login_right>div{width: 100%;text-align: center;}

.login_right label{width: 100%;display: flex;border: 1px solid #e4e8ee;height: 60px;}
.login_right label>img{height: 21px;margin: 20px 10px 15px 15px;}

.login_right label>input{margin-left: 5px;padding-left:15px;border: none;font-size: 16px;border-left: 1px solid #e4e8ee;height: 40px;margin-top: 10px;}
.login_right label:nth-of-type(3){border: none;height: 30px;margin:15px 0 0px 0;padding: 0;color: #9d9d9d;}
.login_right button{width: 100%;height: 48px;font-size: 20px;}

input:-webkit-autofill{-webkit-box-shadow: 0 0 0px 1000px white inset;}
</style>
