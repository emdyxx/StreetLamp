<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
      sessionStorage.serverurl = 'http://192.168.10.89:8010/solin-cunstomer'
      // $.ajax({
      //   type:'post',
      //   async:true,
      //   xhrFields:{withCredentials:true},
      //   url:'json/url.json',
      //   dataType:'json',
      //   success:function(data){
      //     sessionStorage.serverurl = data.url;
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
