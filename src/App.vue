<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
	created(){
		// localStorage.serverurl = 'http://192.168.70.17:8071/SD-IOT-API'
		// localStorage.serverurl = 'http://192.168.10.9:8071/SD-IOT-API'
		// localStorage.serverurl = 'http://192.168.70.10:8071/SD-IOT-API'
		// localStorage.serverurl = 'http://192.168.10.95:8071/SD-IOT-API'
		// localStorage.serverurl = 'http://192.168.70.19:8071/SD-IOT-API'

		$.ajax({
			type:'get',
			async:true,
			xhrFields:{withCredentials:true},
			url:'json/url.json', 
			dataType:'json',
			success:function(data){
				if(data.url==''||data.url==undefined||data.url==null){
					var url = window.location.href
					url = url.split('/')
					localStorage.serverurl = url[0]+'//'+url[2]+'/SD-IOT-API';
					localStorage.serverurl2 = url[0]+'//'+url[2]+'/solin'
				}else{
					localStorage.serverurl = data.url;
				}  
			}
		})

		$.ajax({
			type:'get',
			async:true,
			xhrFields:{withCredentials:true},
			url:'json/versionNumber.json',
			dataType:'json',
			success:function(data){
				localStorage.versionNumber = data.versionNumber;
			}
		})
  },
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: "Microsoft YaHei","微软雅黑","PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB",Arial,sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}
.el-tabs__content {
  height: 93%;
  /* position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  top: 30px !important;
  bottom: 15px !important; */
}
.el-upload__input {
    display: none !important;
}
</style>
