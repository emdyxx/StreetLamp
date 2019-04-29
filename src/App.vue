<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // localStorage.serverurl = 'http://192.168.10.54:8080/SD-IOT-API'
    // localStorage.serverurl = 'http://192.168.10.46:8080/SD-IOT-API'
    localStorage.serverurl = 'http://192.168.10.54:8080/SD-IOT-API'
    // localStorage.serverurl = 'http://192.168.70.10:8071/SD-IOT-API'

    // $.ajax({
    //   type:'post',
    //   async:true,
    //   xhrFields:{withCredentials:true},
    //   url:'json/url.json',
    //   dataType:'json',
    //   success:function(data){
    //       localStorage.serverurl = data.url;
    //   }
    // })
    // $.ajax({
    //   type:'post',
    //   async:true,
    //   xhrFields:{withCredentials:true},
    //   url:'json/versionNumber.json',
    //   dataType:'json',
    //   success:function(data){
    //       localStorage.versionNumber = data.versionNumber;
    //   }
    // })
  },
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}
.el-tabs__content {
  height: 90%;
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
