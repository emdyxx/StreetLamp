<template>
	<div class="OverallSituation">
		<header class="header">
			<div class="backtrack" @click="backtrack">
				<i class="iconfont icon-fanhuishangyiji1"></i>
				<span>返回</span>
			</div>
			<div class="header-left">
				<img src="../../assets/header-img.png" alt="">
			</div>
			<div class="header-center">
				<template v-for="item in menu">
					<template v-if="item.code=='managementUser'">
						<div @click="headercolor(1,item.id)" :key="item.id" :class="headercolorType=='1'?'header-center-color':''">
							<p class="iconfont icon-users"></p>
                    		{{item.menuName}}
						</div>
					</template>
					<template v-if="item.code=='managementOrg'">
						<div @click="headercolor(2,item.id)" :key="item.id" :class="headercolorType=='2'?'header-center-color':''">
							<p class="iconfont icon-xiangmu" ></p>
							{{item.menuName}}
						</div>
					</template>
					<template v-if="item.code=='managementProject'">
						<div @click="headercolor(3,item.id)" :key="item.id" :class="headercolorType=='3'?'header-center-color':''">
							<p class="iconfont icon-jigou" ></p>
							{{item.menuName}}
						</div>
					</template>
					<template v-if="item.code=='managementLog'">
						<div @click="headercolor(4,item.id)" :key="item.id" :class="headercolorType=='4'?'header-center-color':''">
							<p class="iconfont icon-shebeirizhi" ></p>
							{{item.menuName}}
						</div>
					</template>
				</template>
			</div>
			<!-- <div class="header-right">
				<i @click="backtrack" class="iconfont icon-guanbi"></i>
			</div> -->
		</header>
		<div class="footer">
			<router-view></router-view> 
		</div>
	</div>
</template>
<script>
export default {
	name: 'userCenter',
	data () {
		return {
			serverurl:localStorage.serverurl,
			headercolorType:'',
			menu:[],
		}
	},
	mounted(){
		
	},
	methods:{
		headercolor(val,id){
			this.headercolorType = val;
			sessionStorage.menuId2 = id
			sessionStorage.headercolorType = val
			if(val=='1'){
				this.$router.push({'path':'/managementUser'})
			}
			if(val=='2'){
				this.$router.push({'path':'/managementOrg'})
			}
			if(val=='3'){
				this.$router.push({'path':'/managementProject'})
			}
			if(val=='4'){
				this.$router.push({'path':'/managementLog'})
			}
		},
		backtrack(){
			this.$router.push({'path':'/index'})
			sessionStorage.removeItem('menuId');
			sessionStorage.removeItem('menuId2');
		},
		//请求权限
		Jurisdiction(){
			var that = this;
			$.ajax({
				type:'get',
				async:true,
				dataType:'json',
				url:that.serverurl+'/v1/manage/menu/'+sessionStorage.menuId,
				contentType:'application/json;charset=UTF-8',
				data:{},
				success:function(data){
					if(data.errorCode==0){
						that.menu = data.result.menus
						if(sessionStorage.menuId2==''||sessionStorage.menuId2==undefined){
							sessionStorage.menuId2 = data.result.menus[0].id
						}
						if(sessionStorage.menuId2=='4'){
							that.headercolorType = '1'
							that.$router.push({'path':'/managementUser'})
						}
						if(sessionStorage.menuId2=='5'){
							that.headercolorType = '2'
							that.$router.push({'path':'/managementOrg'})
						}
						if(sessionStorage.menuId2=='6'){
							that.headercolorType = '3'
							that.$router.push({'path':'/managementProject'})
						}
						if(sessionStorage.menuId2=='7'){
							that.headercolorType = '4'
							that.$router.push({'path':'/managementLog'})
						}
					}else{
						that.errorCode(data)
					}
				},
			})
		},
	},
	created(){
		var that = this
		that.Jurisdiction()
	},
}
</script>
<style scoped>

</style>
